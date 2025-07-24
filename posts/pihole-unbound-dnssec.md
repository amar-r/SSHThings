---
title: "Leveling Up DNS Security: Pi-hole + Unbound + DNSSEC Adventures"
date: "2025-07-23"
excerpt: "How I went from basic Pi-hole ad blocking to running my own recursive DNS resolver with Unbound and DNSSEC validation—plus the lessons, pitfalls, and wins along the way."
tags: ["dns", "pi-hole", "unbound", "dnssec", "raspberry-pi", "security", "self-hosting"]
readTime: 8
---

# Leveling Up DNS Security: Pi-hole + Unbound + DNSSEC Adventures

## Why I Wanted More Than Just Ad Blocking

Pi-hole is fantastic for blocking ads and trackers, but I realized that by default, it forwards DNS queries to public resolvers (like Google or Cloudflare). That means my DNS traffic—and my family's browsing habits—were still visible to third parties. I wanted more privacy and control, so I decided to run my own recursive resolver using [Unbound](https://docs.pi-hole.net/guides/dns/unbound/), and enable DNSSEC validation for extra security.

This post is my journey through the setup, the gotchas, and the satisfaction of seeing my DNS queries stay local and secure. If you want to follow along, I recommend checking the [official Pi-hole documentation](https://docs.pi-hole.net/main/) for the latest details.

---

## Prerequisites

- **Pi-hole** already installed ([official guide](https://docs.pi-hole.net/main/))
- **Unbound** (v1.9+ recommended)
- **Raspberry Pi OS** or any modern Linux distro

---

## 1. Installing Unbound

On my Pi-hole box (a Raspberry Pi 4 running Raspberry Pi OS), I installed Unbound:

```bash
sudo apt update
sudo apt install unbound
```

---

## 2. Configuring Unbound for Pi-hole

I created the recommended config file:

```bash
sudo nano /etc/unbound/unbound.conf.d/pi-hole.conf
```

And pasted in the [official config](https://docs.pi-hole.net/guides/dns/unbound/#recommended-unbound-config):

```conf
server:
    verbosity: 0
    interface: 127.0.0.1
    port: 5335
    do-ip4: yes
    do-udp: yes
    do-tcp: yes
    root-hints: "/var/lib/unbound/root.hints"
    harden-glue: yes
    harden-dnssec-stripped: yes
    use-caps-for-id: no
    edns-buffer-size: 1232
    prefetch: yes
    num-threads: 1
    so-rcvbuf: 1m
    cache-min-ttl: 3600
    cache-max-ttl: 86400
    rrset-roundrobin: yes
    minimal-responses: yes
    private-address: 192.168.0.0/16
    private-address: 169.254.0.0/16
    private-address: 172.16.0.0/12
    private-address: 10.0.0.0/8
    private-address: fd00::/8
    private-address: fe80::/10
```

**Note:**  
- The port `5335` keeps Unbound separate from Pi-hole’s default port 53.
- The `root-hints` file should be present at `/var/lib/unbound/root.hints`. If not, download it:
  ```bash
  wget -O /var/lib/unbound/root.hints https://www.internic.net/domain/named.cache
  ```

---

## 3. Enabling and Starting Unbound

```bash
sudo systemctl enable unbound
sudo systemctl restart unbound
```

---

## 4. Pointing Pi-hole to Unbound

In the Pi-hole web interface:
- Go to **Settings > DNS**
- Uncheck all upstream DNS servers
- Add a custom upstream server:  
  `127.0.0.1#5335`
- Save and restart Pi-hole DNS:
  ```bash
  pihole restartdns
  ```

---

## 5. DNSSEC: Let Unbound Handle It

Unbound does DNSSEC validation by default with the config above. You **do not** need to enable DNSSEC in the Pi-hole web UI when using Unbound—let Unbound do the heavy lifting ([reference](https://docs.pi-hole.net/guides/dns/unbound/#dnssec-support)).

---

## 6. Testing the Setup

I always like to test things before declaring victory. Here’s how I checked DNSSEC:

```bash
# Should return SERVFAIL (invalid DNSSEC)
dig +dnssec +multi dnssec-failed.org @127.0.0.1 -p 5335

# Should return 'ad' flag (authenticated data)
dig +dnssec +multi sigok.verteiltesysteme.net @127.0.0.1 -p 5335
```

And to check regular DNS resolution:

```bash
dig pi-hole.net @127.0.0.1 -p 5335
```

Or just use the Pi-hole web interface to see queries flowing through Unbound.

---

## 7. Troubleshooting (Trust Anchor Woes)

I hit the infamous `trust anchor presented twice` error at one point. If you see this, you may need to reset the root key:

```bash
sudo systemctl stop unbound
sudo rm -f /var/lib/unbound/root.key
sudo unbound-anchor -a /var/lib/unbound/root.key
sudo chown unbound:unbound /var/lib/unbound/root.key
sudo chmod 644 /var/lib/unbound/root.key
sudo systemctl start unbound
```

Other useful commands:

```bash
sudo journalctl -u unbound   # Unbound logs
pihole -t                    # Pi-hole logs
```

---

## 8. (Optional) Automating Pi-hole Backups

After breaking my config one too many times, I automated Pi-hole backups to a private GitHub repo. Here’s a simple script:

```bash
#!/bin/bash
set -e
BACKUP_DIR="/opt/pihole-git-backup"
REPO_URL="https://<TOKEN>@github.com/youruser/pihole-backups.git"

mkdir -p "$BACKUP_DIR"
cp /etc/pihole/* "$BACKUP_DIR/" 2>/dev/null || true
cp /etc/dnsmasq.d/* "$BACKUP_DIR/" 2>/dev/null || true

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

Add to cron for daily backups:
```cron
0 3 * * * /opt/backup.sh >> /var/log/pihole_git_backup.log 2>&1
```

---

## References

- [Pi-hole Official Documentation](https://docs.pi-hole.net/main/)
- [Unbound Recursive DNS Guide](https://docs.pi-hole.net/guides/dns/unbound/)
- [DNSSEC Support](https://docs.pi-hole.net/guides/dns/unbound/#dnssec-support)

---

*What started as a simple ad-blocking project turned into a deep dive into recursive resolvers, DNSSEC validation, and why trust anchors are finicky. Now, my DNS is private, validated, and under my control—and I can troubleshoot it when things go wrong.* 