// Simplified blog system that works reliably
export const posts = [
  {
    slug: 'pihole-unbound-dnssec',
    title: 'Leveling Up DNS Security: Pi-hole + Unbound + DNSSEC Adventures',
    date: '2025-07-23',
    excerpt: 'My journey from basic Pi-hole ad blocking to a self-hosted recursive DNS resolver with DNSSEC validation. Plus the trust anchor issues that nearly broke everything and how automated backups saved my sanity.',
    content: `# Leveling Up DNS Security: Pi-hole + Unbound + DNSSEC Adventures

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

\`\`\`bash
sudo apt update
sudo apt install unbound
\`\`\`

Then I created a Pi-hole-specific config file:

\`\`\`bash
sudo nano /etc/unbound/unbound.conf.d/pi-hole.conf
\`\`\`

The configuration that actually works:

\`\`\`conf
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
\`\`\`

The key settings here:
- **Port 5335**: Keeps Unbound separate from Pi-hole's DNS on port 53
- **Private address ranges**: Prevents DNS rebinding attacks
- **DNSSEC trust anchor**: The part that caused me the most trouble (more on that below)
- **Performance tuning**: Buffer sizes and prefetching for better response times

## The Great Trust Anchor Disaster

### When DNSSEC Validation Goes Wrong
Here's where things got interesting. After setting up Unbound, I started seeing this error in the logs:

\`\`\`
trust anchor presented twice
\`\`\`

This is the kind of error message that makes you question your life choices. DNSSEC validation wasn't working, and I had no idea why. Turns out, trust anchors are finicky beasts.

The problem was that I had a stale or duplicated \`root.key\` file. The solution required completely regenerating the trust anchor:

\`\`\`bash
sudo systemctl stop unbound
sudo rm -f /var/lib/unbound/root.key
sudo unbound-anchor -a /var/lib/unbound/root.key
sudo chown unbound:unbound /var/lib/unbound/root.key
sudo chmod 644 /var/lib/unbound/root.key
sudo systemctl start unbound
\`\`\`

### Testing DNSSEC (The Moment of Truth)
Once I got the trust anchor sorted, I could actually test DNSSEC validation:

\`\`\`bash
# This should FAIL with SERVFAIL (invalid DNSSEC)
dig +dnssec +multi dnssec-failed.org @127.0.0.1 -p 5335

# This should SUCCEED with 'ad' flag (authenticated data)
dig +dnssec +multi sigok.verteiltesysteme.net @127.0.0.1 -p 5335
\`\`\`

Seeing that first test fail with \`SERVFAIL\` was oddly satisfying - it meant DNSSEC validation was actually working and blocking invalid signatures. The second test showing the \`ad\` (Authenticated Data) flag confirmed that valid DNSSEC signatures were being properly validated.

### Connecting Pi-hole to Unbound
The final step was pointing Pi-hole to use Unbound instead of public DNS:
- Pi-hole web interface → **Settings > DNS**
- Uncheck all upstream DNS providers
- Add: \`127.0.0.1#5335\`
- Save and restart DNS

Or via command line:
\`\`\`bash
pihole restartdns
\`\`\`

Suddenly, all DNS queries were being resolved by my own recursive resolver with DNSSEC validation. No more third-party dependencies for DNS resolution.

## The Backup Automation Obsession

### Why I Automate Everything Now
After the great shell script disaster I mentioned in my homelab post, I've become religious about automating backups. Pi-hole configurations are surprisingly complex when you start customizing block lists, whitelist entries, and local DNS records.

I created a backup script that pushes Pi-hole configs to GitHub:

\`\`\`bash
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
  echo -e "*.db\\n*.log\\nconfig_backups/\\n*.pem\\ntls*" > .gitignore
  git add .gitignore
  git commit -m "Initial commit"
  git push -u origin main
fi

git add .
if ! git diff --cached --quiet; then
  git commit -m "Pi-hole backup on $(date '+%Y-%m-%d %H:%M:%S')"
  git push origin main
fi
\`\`\`

### The Cron Job That Saves My Sanity
Added to cron to run daily at 3 AM:
\`\`\`bash
crontab -e
\`\`\`

\`\`\`cron
0 3 * * * /opt/backup.sh >> /var/log/pihole_git_backup.log 2>&1
\`\`\`

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
The "trust anchor presented twice" error was a real pain. It happens when the DNSSEC root key gets corrupted or duplicated. The fix is always the same: delete it and regenerate with \`unbound-anchor\`, but figuring that out took way too long.

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
I'm eyeing DNS-over-TLS with \`stubby\` or \`cloudflared\` for encrypted upstream queries, and considering adding Grafana dashboards to monitor DNS query patterns. Because apparently I can't leave well enough alone.

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

*What started as "let me just add a bit more DNS privacy" turned into a deep dive into recursive resolvers, DNSSEC validation, and why trust anchors are finicky. Six months later, I'm running a fully self-contained DNS infrastructure that I actually understand - and can troubleshoot when things go wrong.*`,
    tags: ['dns', 'pi-hole', 'unbound', 'dnssec', 'raspberry-pi', 'security', 'self-hosting'],
    readTime: 8,
    image: null
  },
  {
    slug: 'homelab-journey',
    title: 'My Homelab Journey: From Baby Cam to 30+ Containers',
    date: '2025-07-21',
    excerpt: 'What started with basic COVID-era family needs grew into a comprehensive homelab with monitoring, automation, and infrastructure that just works. Here\'s how I accidentally learned DevOps along the way.',
    content: `# My Homelab Journey: From Baby Cam to 30+ Containers

## Introduction

It all started back in 2021 during COVID lockdown with practical family needs: a friend told me about Home Assistant for basic automation, a Raspberry Pi with a camera module as a baby monitor, Pi-hole for network ad blocking, and PiVPN so I could connect back home when away. Simple, focused solutions for real problems.

Fast forward three years, and I'm running pfSense because I wanted to learn networking, 30+ containers with comprehensive monitoring, and infrastructure that actually works reliably. What began as "let me just solve this one family problem" somehow snowballed into accidentally learning proper infrastructure practices.

The funny part? I learned more about production monitoring, networking, and operational practices from solving actual family problems than I did from years of reading DevOps blogs. Turns out, nothing teaches you proper observability quite like needing to debug why the baby cam went offline at 3 AM.

Here's the story of how practical family tech needs accidentally became my comprehensive homelab learning journey.

## The Setup That Got Out of Hand

### My Hardware Reality
What started as a Raspberry Pi with a camera module has grown into this AMD Ryzen 5 3600 setup handling my entire digital life:

- **AMD Ryzen 5 3600** (6-core/12-thread) - Upgraded from Pi when container count got serious
- **15GB DDR4** - Currently sitting at 73% utilization (containers are surprisingly hungry!)
- **NVMe SSD + 15TB external drives** - Fast Docker volumes, endless storage for family content
- **Ubuntu 22.04 LTS** - Because I wanted something stable that just works
- **pfSense router** - Ditched consumer gear to really understand networking
- **Upgraded network infrastructure** - Invested more in network quality than storage because buffering ruins everything

### How I Finally Got Organized
After months of containers scattered everywhere (and constantly forgetting what was running where), I learned to organize things properly:

\`\`\`
infrastructure/
├── monitoring/     # All the Prometheus/Grafana goodness
├── proxy/         # Future home for reverse proxy setup
├── core/          # Essential services that keep things running
└── applications/  # The fun stuff (media, home automation, etc.)
\`\`\`

This organization thing? Turns out there's actually a method to the madness that makes everything so much easier to manage!

## Where Things Got Interesting (And Addictive)

### My Accidental Monitoring Empire
It started with more practical questions: "Why did the baby cam go offline?" "Is the Pi-hole actually blocking ads?" "Did my VPN connection drop?" Those innocent troubleshooting needs led me down the rabbit hole of proper monitoring.

**Prometheus** became my new best friend - this thing collects metrics from everything. Container CPU usage, memory consumption, disk space, network traffic, even how many times my wife requests the same show. I've got it scraping 15+ services with proper retention policies because apparently I'm that person now.

**Grafana** is where I spend way too much time building dashboards. I've got beautiful visualizations showing container performance, application health, and yes, even our household energy consumption. There's something oddly satisfying about a perfectly organized dashboard at 2 AM.

**Smart alerting** saves my marriage by telling me when things break before my family does. Pushover notifications from pfSense and container upgrades, Home Assistant handling alerts from Frigate security cams and our home alarm system - I get pinged on my phone when disk space hits 85% or when someone's at the front door, which is infinitely better than hearing "the streaming thing is broken again" or "did you see that person outside?"

The crazy part? This monitoring and alerting setup follows solid infrastructure principles that actually work. Metric collection, time-series storage, multi-channel alerting (Pushover for infrastructure, Home Assistant for security), visual dashboards - I accidentally built a really robust homelab infrastructure.

### The Family-Focused Stack
What started as Home Assistant automation, Pi-hole ad blocking, and a baby cam has evolved into a full stack: Jellyfin for movie nights, Frigate security cameras, comprehensive home automation with alarm system integration, media automation pipeline, and pfSense network monitoring with Pushover alerts. The kids still think I'm a wizard, but now it's backed by proper containerization and reliable alerting.

The underlying architecture principles are solid - containerized services, proper network segmentation, service discovery, automated deployments. My family just happens to be my most demanding (and honest) user base.

## The Great Shell Script Disaster (And How Makefiles Saved Me)

### My Shameful Shell Script Collection
Let me confess something embarrassing. Before I discovered Makefiles, I had a handful of shell scripts with names like \`start_monitoring.sh\`, \`restart_media_stack.sh\`, and my personal favorite, \`fix_the_thing_that_broke_again.sh\`.

Each script was a unique snowflake of hardcoded paths, zero error handling, and inconsistent formatting. Want to restart the monitoring stack? Good luck remembering which of the 5 scripts does that, in what order, and whether you remembered to set the right environment variables first.

My family learned not to ask me to fix streaming issues during dinner because it usually involved me frantically running scripts, swearing at the terminal, and occasionally breaking more things than I fixed. There was the infamous DNS incident where I took down the entire internet while "just tweaking Pi-hole settings" during prime Netflix time. My wife still reminds me about that one.

### The Makefile Enlightenment
Then I discovered Makefiles, and my entire operational life changed. What used to be this chaotic mess:

\`\`\`bash
# Pray this works...
./scripts/stop_monitoring.sh
./scripts/backup_prometheus_data.sh  
./scripts/start_monitoring.sh
./scripts/verify_grafana.sh
# Now cross fingers and hope nothing broke
\`\`\`

Became this elegant solution:

\`\`\`makefile
restart-monitoring: stop-monitoring backup-prometheus start-monitoring verify-grafana
	@echo "Monitoring stack restarted successfully"

stop-monitoring:
	docker-compose -f monitoring/docker-compose.yml down

start-monitoring:
	docker-compose -f monitoring/docker-compose.yml up -d
\`\`\`

Suddenly I had dependencies, parallel execution, consistent formatting, and actual error handling. It was like discovering civilization after years of digital barbarism.

### The Unexpected Discipline
The Makefile didn't just organize my commands - it forced me into better operational practices without realizing it. Every change gets documented in code, deployments become repeatable, and I stopped breaking things because I forgot a step.

My family noticed the difference when "fix the streaming" went from a 30-minute debugging session to a simple \`make restart-media\` command. Turns out, proper operational practices benefit everyone in the household.

## What I Accidentally Learned Along the Way

### Learning Configuration Management the Right Way
I've been pretty careful about keeping secrets out of version control from the start, but I still ended up implementing proper configuration management practices. Environment separation, secrets management, version control for everything - even my home setup has dev/staging concepts because apparently I can't help myself.

### My Monitoring Obsession
What started as basic container monitoring turned into a full observability platform:
- **Multi-layered metrics** from host, container, and application levels
- **Multi-channel alerting** via Pushover and Home Assistant that pings my phone before my family complains
- **Dashboard design** that actually focuses on what matters
- **Service dependency tracking** so I understand what breaks what

The weird part? This is exactly how proper monitoring works, just pointed at my basement instead of a data center. I accidentally learned solid observability practices by trying to keep family movie nights running smoothly.

## Lessons Learned (The Hard Way)

### 1. Monitoring Saves Marriages (And Don't Test in Prod)
I learned this during a particularly embarrassing evening when I decided to "quickly adjust" some Pi-hole and pfBlocker settings while my wife was streaming Netflix. Spoiler alert: I broke DNS for the entire house mid-episode. Nothing teaches you the importance of proper monitoring quite like your spouse's face when her show stops buffering because you're "just testing something real quick." 

Turns out my family is my production environment, and there's no staging when it comes to home internet. Now when something's wrong, I know exactly what's wrong, where it's wrong, and how wrong it is before anyone else notices.

### 2. Boring Beats Clever Every Time
Those 5 unique shell scripts I lovingly crafted? Pure chaos. The boring, predictable Makefile approach actually works when you need it to work. Turns out consistency is more valuable than cleverness.

### 3. Version Control Everything
Once I started treating my infrastructure like code - version controlled, documented, reproducible - I could confidently make changes without fear. If something breaks, I can roll back. If something works, I know why.

### 4. Network Understanding Actually Matters
Moving from consumer router defaults to pfSense made troubleshooting so much easier. When something breaks, I can actually see what's happening on my network instead of just guessing. Plus, I actually understand my network now instead of just hoping it works.

### 5. Document Your 3 AM Fixes
That weird workaround you implemented during a late-night debugging session? Write it down. Future you (and your family) will thank you when the same issue pops up six months later.

## How It's Actually Working

The system runs surprisingly well for something built by someone who once brought down production because I forgot a \`WHERE\` clause:

- **Family happiness**: High - streaming just works, lights turn on when they should
- **Uptime**: Core services running 2+ months without me touching them
- **My stress levels**: Much lower - I know when things break before anyone complains
- **Resource usage**: 15GB of RAM running 30+ containers at 73% utilization
- **Learning**: More about production practices than any course could teach

Most importantly, I can confidently add new services, troubleshoot issues systematically, and actually sleep through the night knowing my monitoring will wake me up if needed.

## The Unexpected Benefits

What started as a simple family media server turned into the best hands-on learning experience I could have asked for. I've accidentally learned production monitoring, proper deployment practices, infrastructure automation, and operational discipline that directly applies to enterprise environments.

The best part? When I talk about my experience with Prometheus and Grafana, I can share real stories - like the time I debugged a memory leak at 3 AM using custom metrics, or how I set up alerting that actually works without being annoying.

**The Reality Check:**
- **Hardware investment**: ~$2,000 (but it's also my main desktop)
- **Software cost**: $0 (open source everything)
- **Time investment**: Countless hours, but mostly enjoyable rabbit holes
- **Family happiness**: High (reliable streaming is apparently non-negotiable)
- **Learning value**: More practical experience than any course

## Want to Try This Yourself?

Start simple. Deploy one service, add some basic monitoring, write a Makefile for deployment. Break things, fix them, document what you learned. 

Your family will appreciate the reliable services, and you might accidentally learn some valuable skills along the way. Plus, there's something deeply satisfying about infrastructure that just works.

---

*What started in 2021 with a Raspberry Pi baby cam and some basic home automation has evolved into a comprehensive homelab that runs my entire digital life. Three years later, the baby cam never goes offline, the network actually makes sense, and I accidentally learned proper infrastructure practices along the way.*`,
    tags: ['homelab', 'self-hosting', 'monitoring', 'automation', 'family-tech', 'infrastructure'],
    readTime: 7,
    image: null
  },
  {
    slug: 'first-post',
    title: 'Welcome to SSHthings - My First Blog Post',
    date: '2025-07-17',
    excerpt: 'An introduction to SSHthings (Self-Service Homelab) - my personal blog where I\'ll be sharing self-hosting projects, automation experiments, and infrastructure insights.',
    content: `# Welcome to SSHthings - My First Blog Post

Hello and welcome to **SSHthings** (Self-Service Homelab)! This is my personal blog where I'll be sharing my journey through self-hosting, infrastructure automation, and technology experiments.

## What to Expect

This blog will cover a variety of topics including:

- **Self-Hosting Projects**: Docker containers, Kubernetes clusters, and home server setups
- **Infrastructure Automation**: Terraform, Ansible, and CI/CD pipelines
- **Cloud Solutions**: AWS, Azure, and multi-cloud strategies
- **DevOps Practices**: Monitoring, logging, and security best practices
- **Technology Experiments**: New tools, frameworks, and methodologies

## My Background

I'm a Lead Systems Engineer with over 13 years of experience in cloud infrastructure, automation, and security. I've worked with various technologies and platforms, and I'm passionate about sharing knowledge and learning from the community.

## Why "SSHthings"?

The name "SSHthings" represents my focus on **self-hosting** and **infrastructure** projects. SSH stands for **Self-Service Homelab**, reflecting my approach to building and managing my own homelab infrastructure. SSH (Secure Shell) is also a fundamental tool for managing remote systems, and it symbolizes the technical foundation of the topics I'll be covering here.

## My Approach

I believe in:
- **Learning in Public**: Sharing both successes and failures
- **Practical Examples**: Real-world implementations and code snippets
- **Community Focus**: Engaging with others who share similar interests
- **Continuous Improvement**: Always exploring new technologies and approaches

Stay tuned for more content about self-hosting adventures, automation experiments, and infrastructure insights!`,
    tags: ['welcome', 'introduction', 'self-hosting'],
    readTime: 5,
    image: null
  }
]

export const getPostBySlug = (slug) => {
  return posts.find(post => post.slug === slug)
}

export const getAllPosts = () => {
  return posts
}

export const getPostsByTag = (tag) => {
  return posts.filter(post => post.tags.includes(tag))
} 