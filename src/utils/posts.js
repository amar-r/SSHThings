// Simplified blog system that works reliably
export const posts = [
  {
    slug: 'pihole-unbound-dnssec',
    title: 'Leveling Up DNS Security: Pi-hole + Unbound + DNSSEC Adventures',
    date: '2025-07-23',
    excerpt: 'How I went from basic Pi-hole ad blocking to running my own recursive DNS resolver with Unbound and DNSSEC validation—plus the lessons, pitfalls, and wins along the way.',
    content: `# Leveling Up DNS Security: Pi-hole + Unbound + DNSSEC Adventures

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

\`\`\`bash
sudo apt update
sudo apt install unbound
\`\`\`

---

## 2. Configuring Unbound for Pi-hole

I created the recommended config file:

\`\`\`bash
sudo nano /etc/unbound/unbound.conf.d/pi-hole.conf
\`\`\`

And pasted in the [official config](https://docs.pi-hole.net/guides/dns/unbound/#recommended-unbound-config):

\`\`\`conf
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
\`\`\`

**Note:**  
- The port \`5335\` keeps Unbound separate from Pi-hole's default port 53.
- The \`root-hints\` file should be present at \`/var/lib/unbound/root.hints\`. If not, download it:
  \`\`\`bash
  wget -O /var/lib/unbound/root.hints https://www.internic.net/domain/named.cache
  \`\`\`

---

## 3. Enabling and Starting Unbound

\`\`\`bash
sudo systemctl enable unbound
sudo systemctl restart unbound
\`\`\`

---

## 4. Pointing Pi-hole to Unbound

In the Pi-hole web interface:
- Go to **Settings > DNS**
- Uncheck all upstream DNS servers
- Add a custom upstream server:  
  \`127.0.0.1#5335\`
- Save and restart Pi-hole DNS:
  \`\`\`bash
  pihole restartdns
  \`\`\`

---

## 5. DNSSEC: Let Unbound Handle It

Unbound does DNSSEC validation by default with the config above. You **do not** need to enable DNSSEC in the Pi-hole web UI when using Unbound—let Unbound do the heavy lifting ([reference](https://docs.pi-hole.net/guides/dns/unbound/#dnssec-support)).

---

## 6. Testing the Setup

I always like to test things before declaring victory. Here's how I checked DNSSEC:

\`\`\`bash
# Should return SERVFAIL (invalid DNSSEC)
dig +dnssec +multi dnssec-failed.org @127.0.0.1 -p 5335

# Should return 'ad' flag (authenticated data)
dig +dnssec +multi sigok.verteiltesysteme.net @127.0.0.1 -p 5335
\`\`\`

And to check regular DNS resolution:

\`\`\`bash
dig pi-hole.net @127.0.0.1 -p 5335
\`\`\`

Or just use the Pi-hole web interface to see queries flowing through Unbound.

---

## 7. Troubleshooting (Trust Anchor Woes)

I hit the infamous \`trust anchor presented twice\` error at one point. If you see this, you may need to reset the root key:

\`\`\`bash
sudo systemctl stop unbound
sudo rm -f /var/lib/unbound/root.key
sudo unbound-anchor -a /var/lib/unbound/root.key
sudo chown unbound:unbound /var/lib/unbound/root.key
sudo chmod 644 /var/lib/unbound/root.key
sudo systemctl start unbound
\`\`\`

Other useful commands:

\`\`\`bash
sudo journalctl -u unbound   # Unbound logs
pihole -t                    # Pi-hole logs
\`\`\`

---

## 8. (Optional) Automating Pi-hole Backups

After breaking my config one too many times, I automated Pi-hole backups to a private GitHub repo. Here's a simple script:

\`\`\`bash
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

Add to cron for daily backups:
\`\`\`cron
0 3 * * * /opt/backup.sh >> /var/log/pihole_git_backup.log 2>&1
\`\`\`

---

## References

- [Pi-hole Official Documentation](https://docs.pi-hole.net/main/)
- [Unbound Recursive DNS Guide](https://docs.pi-hole.net/guides/dns/unbound/)
- [DNSSEC Support](https://docs.pi-hole.net/guides/dns/unbound/#dnssec-support)

---

*What started as a simple ad-blocking project turned into a deep dive into recursive resolvers, DNSSEC validation, and why trust anchors are finicky. Now, my DNS is private, validated, and under my control—and I can troubleshoot it when things go wrong.*`,
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

infrastructure/
├── monitoring/     # All the Prometheus/Grafana goodness
├── proxy/         # Future home for reverse proxy setup
├── core/          # Essential services that keep things running
└── applications/  # The fun stuff (media, home automation, etc.)

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
Let me confess something embarrassing. Before I discovered Makefiles, I had a handful of shell scripts with names like start_monitoring.sh, restart_media_stack.sh, and my personal favorite, fix_the_thing_that_broke_again.sh.

Each script was a unique snowflake of hardcoded paths, zero error handling, and inconsistent formatting. Want to restart the monitoring stack? Good luck remembering which of the 5 scripts does that, in what order, and whether you remembered to set the right environment variables first.

My family learned not to ask me to fix streaming issues during dinner because it usually involved me frantically running scripts, swearing at the terminal, and occasionally breaking more things than I fixed. There was the infamous DNS incident where I took down the entire internet while "just tweaking Pi-hole settings" during prime Netflix time. My wife still reminds me about that one.

### The Makefile Enlightenment
Then I discovered Makefiles, and my entire operational life changed. What used to be this chaotic mess became elegant solutions with dependencies, parallel execution, consistent formatting, and actual error handling. It was like discovering civilization after years of digital barbarism.

### The Unexpected Discipline
The Makefile didn't just organize my commands - it forced me into better operational practices without realizing it. Every change gets documented in code, deployments become repeatable, and I stopped breaking things because I forgot a step.

My family noticed the difference when "fix the streaming" went from a 30-minute debugging session to a simple make restart-media command. Turns out, proper operational practices benefit everyone in the household.

## What I Actually Learned

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

The system runs surprisingly well for something built by someone who once brought down production because I forgot a WHERE clause:

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