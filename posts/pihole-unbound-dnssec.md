---
title: "Leveling Up DNS Security: Pi-hole + Unbound + DNSSEC Adventures"
date: "2025-07-23"
excerpt: "My journey from basic Pi-hole ad blocking to a self-hosted recursive DNS resolver with DNSSEC validation. Plus the trust anchor issues that nearly broke everything and how automated backups saved my sanity."
tags: ["dns", "pi-hole", "unbound", "dnssec", "raspberry-pi", "security", "self-hosting"]
readTime: 8
---

# Leveling Up DNS Security: Pi-hole + Unbound + DNSSEC Adventures

## How I Accidentally Became a DNS Nerd

It started with a simple goal: get Pi-hole running to block ads on our home network. Mission accomplished, family happy, ads gone. But then I started reading about DNS privacy and realized I was still sending all our DNS queries to public resolvers like Google (8.8.8.8) or Cloudflare (1.1.1.1). 

Sure, these services are fast and reliable, but they also know exactly what websites everyone in my house visits. That felt weird once I thought about it. So I went down the rabbit hole of running my own recursive DNS resolver with **Unbound**, adding **DNSSEC** validation for security, and even automating Pi-hole config backups to GitHub because apparently I can't do anything simple anymore.

What I thought would be a weekend project turned into a deep dive into DNS internals, trust anchors, and why DNSSEC validation matters more than I initially realized. Here's how I accidentally learned way more about DNS than I expected.

## The Setup: Pi-hole + Unbound on Raspberry Pi

### My Hardware Reality
Running this on the same Raspberry Pi 4 that handles my other core services:
- **Raspberry Pi 4** - Still going strong after years of 24/7 operation
- **Raspberry Pi OS (Raspbian)** - Because it just works and has great ARM support
- **Pi-hole v5.18+** - Already running and blocking ads like a champ
- **Unbound v1.9+** - The new addition that made everything more interesting

### Why This Stack Makes Sense
- **Pi-hole** handles ad/tracker blocking and provides a nice web interface
- **Unbound** gives me full control over DNS resolution (no more third-party dependency)
- **DNSSEC** validates that DNS responses haven't been tampered with
- **Automated backups** because I learned my lesson about documentation the hard way

The beauty of this setup is that it's completely self-contained. My DNS queries never leave my network until they need to - Unbound talks directly to authoritative DNS servers, bypassing any intermediary that might be logging or filtering requests.

## Getting Unbound Running (The Easy Part)

### Installation and Basic Config
Getting Unbound installed was surprisingly straightforward:

```bash
sudo apt update
sudo apt install unbound
```

Then I created a Pi-hole-specific config file:

```bash
sudo nano /etc/unbound/unbound.conf.d/pi-hole.conf
```

The configuration that actually works:

```conf
server:
    interface: 127.0.0.1
    port: 5335
    do-ip4: yes
    do-udp: yes
    do-tcp: yes
    do-ip6: no
    prefer-ip6: no

    root-hints: "/var/lib/unbound/root.hints"
    harden-glue: yes
    harden-dnssec-stripped: yes
    use-caps-for-id: no
    edns-buffer-size: 1472
    prefetch: yes
    num-threads: 1
    so-rcvbuf: 1m

    private-address: 192.168.0.0/16
    private-address: 169.254.0.0/16
    private-address: 172.16.0.0/12
    private-address: 10.0.0.0/8
    private-address: fd00::/8
    private-address: fe80::/10

    auto-trust-anchor-file: "/var/lib/unbound/root.key"
```

The key settings here:
- **Port 5335**: Keeps Unbound separate from Pi-hole's DNS on port 53
- **Private address ranges**: Prevents DNS rebinding attacks
- **DNSSEC trust anchor**: The part that caused me the most trouble (more on that below)
- **Performance tuning**: Buffer sizes and prefetching for better response times

## The Great Trust Anchor Disaster

### When DNSSEC Validation Goes Wrong
Here's where things got interesting. After setting up Unbound, I started seeing this error in the logs:

```
trust anchor presented twice
```

This is the kind of error message that makes you question your life choices. DNSSEC validation wasn't working, and I had no idea why. Turns out, trust anchors are finicky beasts.

The problem was that I had a stale or duplicated `root.key` file. The solution required completely regenerating the trust anchor:

```bash
sudo systemctl stop unbound
sudo rm -f /var/lib/unbound/root.key
sudo unbound-anchor -a /var/lib/unbound/root.key
sudo chown unbound:unbound /var/lib/unbound/root.key
sudo chmod 644 /var/lib/unbound/root.key
sudo systemctl start unbound
```

### Testing DNSSEC (The Moment of Truth)
Once I got the trust anchor sorted, I could actually test DNSSEC validation:

```bash
# This should FAIL with SERVFAIL (invalid DNSSEC)
dig +dnssec +multi dnssec-failed.org @127.0.0.1 -p 5335

# This should SUCCEED with 'ad' flag (authenticated data)
dig +dnssec +multi sigok.verteiltesysteme.net @127.0.0.1 -p 5335
```

Seeing that first test fail with `SERVFAIL` was oddly satisfying - it meant DNSSEC validation was actually working and blocking invalid signatures. The second test showing the `ad` (Authenticated Data) flag confirmed that valid DNSSEC signatures were being properly validated.

### Connecting Pi-hole to Unbound
The final step was pointing Pi-hole to use Unbound instead of public DNS:
- Pi-hole web interface → **Settings > DNS**
- Uncheck all upstream DNS providers
- Add: `127.0.0.1#5335`
- Save and restart DNS

Or via command line:
```bash
pihole restartdns
```

Suddenly, all DNS queries were being resolved by my own recursive resolver with DNSSEC validation. No more third-party dependencies for DNS resolution.

## The Backup Automation Obsession

### Why I Automate Everything Now
After the great shell script disaster I mentioned in my homelab post, I've become religious about automating backups. Pi-hole configurations are surprisingly complex when you start customizing block lists, whitelist entries, and local DNS records.

I created a backup script that pushes Pi-hole configs to GitHub:

```bash
#!/bin/bash
set -e
BACKUP_DIR="/opt/pihole-git-backup"
REPO_URL="https://<TOKEN>@github.com/youruser/pihole-backups.git"

mkdir -p "$BACKUP_DIR"

# Backup all the important Pi-hole configs
cp /etc/pihole/*.list "$BACKUP_DIR/" 2>/dev/null || true
cp /etc/pihole/pihole.toml "$BACKUP_DIR/" 2>/dev/null || true
cp /etc/pihole/dns*.conf "$BACKUP_DIR/" 2>/dev/null || true
cp /etc/pihole/versions "$BACKUP_DIR/" 2>/dev/null || true
cp /etc/pihole/migration_backup_v6/setupVars.conf "$BACKUP_DIR/" 2>/dev/null || true
cp /etc/dnsmasq.d/01-pihole.conf "$BACKUP_DIR/" 2>/dev/null || true

cd "$BACKUP_DIR"
if [ ! -d .git ]; then
  git init
  git remote add origin "$REPO_URL"
  git checkout -b main
  echo -e "*.db\n*.log\nconfig_backups/\n*.pem\ntls*" > .gitignore
  git add .gitignore
  git commit -m "Initial commit"
  git push -u origin main
fi

git add .
if ! git diff --cached --quiet; then
  git commit -m "Pi-hole backup on $(date '+%Y-%m-%d %H:%M:%S')"
  git push origin main
fi
```

### The Cron Job That Saves My Sanity
Added to cron to run daily at 3 AM:
```bash
crontab -e
```

```cron
0 3 * * * /opt/backup.sh >> /var/log/pihole_git_backup.log 2>&1
```

Now I sleep better knowing that if I accidentally break something while "just tweaking a few settings," I can easily roll back to a known good configuration.

## What I Actually Learned

### DNS Internals Are Fascinating
Running your own recursive resolver teaches you how DNS actually works. Instead of just sending queries to 8.8.8.8 and hoping for the best, Unbound starts at the root servers and follows the delegation chain to get authoritative answers.

Watching this in action with verbose logging enabled was like seeing the internet's phone book system in real time. It's surprisingly elegant once you understand the hierarchy.

### DNSSEC Is More Important Than I Thought
DNSSEC validation protects against DNS spoofing attacks where malicious actors try to redirect your traffic to fake websites. With DNSSEC enabled, if someone tries to poison your DNS responses, Unbound will reject the invalid signatures and protect you.

It's not perfect, and adoption isn't universal, but for domains that support it, DNSSEC provides real security benefits.

### Performance Actually Improved
Counter-intuitively, running my own recursive resolver improved DNS performance. Unbound caches responses locally and can answer repeat queries instantly. Plus, I'm not dependent on the latency to public DNS servers - everything happens locally until Unbound needs to refresh a record.

## The Problems I Fixed (And Created)

### Trust Anchor Issues
The "trust anchor presented twice" error was a real pain. It happens when the DNSSEC root key gets corrupted or duplicated. The fix is always the same: delete it and regenerate with `unbound-anchor`, but figuring that out took way too long.

### GitHub Backup Token Permissions
My backup script initially failed because my GitHub token didn't have proper repository write permissions. Had to generate a new token with the right scopes. Always check your token permissions first.

### Family WiFi Complaints During Testing
There was that evening when I was testing DNSSEC validation and accidentally broke DNS resolution for the entire network while my family was trying to stream. Nothing teaches you the importance of having a rollback plan quite like angry family members wondering why Netflix stopped working.

## How It's Actually Working

### The Numbers
After running this setup for several months:
- **DNS response times**: 20-30ms average (better than most public resolvers)
- **DNSSEC validation rate**: ~15% of queries (domains that actually support DNSSEC)
- **Uptime**: Rock solid - Unbound rarely needs attention once properly configured
- **Resource usage**: Minimal - barely noticeable on the Pi 4

### Family Satisfaction
The family doesn't notice any difference, which is exactly what you want from infrastructure. DNS still works, ads are still blocked, but now I have complete control over the resolution process and better security for domains that support DNSSEC.

### What's Next
I'm eyeing DNS-over-TLS with `stubby` or `cloudflared` for encrypted upstream queries, and considering adding Grafana dashboards to monitor DNS query patterns. Because apparently I can't leave well enough alone.

## Want to Try This Yourself?

Start with a basic Pi-hole setup if you don't already have one. Then add Unbound for recursive resolution. The DNSSEC validation is nice to have but isn't strictly necessary to get the privacy benefits of running your own resolver.

The backup automation might seem overkill, but trust me - the first time you accidentally break your carefully tuned Pi-hole configuration, you'll be grateful for version-controlled backups.

**Key Takeaways:**
- **Privacy improvement**: Your DNS queries stay local until they need to be resolved
- **Performance boost**: Local caching beats remote DNS servers
- **Security enhancement**: DNSSEC validation when available
- **Learning opportunity**: Understanding DNS internals is genuinely useful
- **Backup everything**: Because you will break something eventually

---

*What started as "let me just add a bit more DNS privacy" turned into a deep dive into recursive resolvers, DNSSEC validation, and why trust anchors are finicky. Six months later, I'm running a fully self-contained DNS infrastructure that I actually understand - and can troubleshoot when things go wrong.* 