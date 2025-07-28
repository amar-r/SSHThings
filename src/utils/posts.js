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
    title: 'In The Beginning... HomeLab Edition',
    date: '2025-07-21',
    excerpt: 'What started as me tinkering with a Raspberry Pi Camera module for a secure and private baby cam turning into a full fledged home security system and full home automation. Come join me in this journey to see what all I have done.',
    content: `# In The Beginning... HomeLab Edition

## Introduction

I remember it all as if it were yesterday. It was the beginning of COVID and around when my first child was born. I was already working from home and was entering my parental leave. Between changing poopy diapers and taking naps whenever I could, I got the itch to do something during my free time. With my wife was returning to work I wanted to provide her a privacy focused and secure way of watching out child while at the office. In came the PiHole/PiVPN combo and and a tiny little camera module that would be attached to a Raspberry Pi Zero. Using MotionEyeOS, I sucessfully setup a local and secure baby camera. #TheBeginning

My paternatily leave was over, I was excited to tell some folks at work what I had done with the custom baby monitor. Then it happened, a buddy of mine told me about HomeAssistant. Talk about gateway drug. As if I wasn't already sleep deprived. Now I have something else keeping me up at night. At some late hour I'm having a conversation with myself "Which zibgee/z-wave device should I buy?" while browsing the Amazon search results looking for an excuse to add one more automation to HomeAssistant.

Fast forward to 2025, almost every door in my house has a door sensor that's connected to some z-wave light switch via a HomeAssistant automation. I decided to upgrade my networking by getting a pfSense device, because I thought "Why not get something super complicated to force myself to get more comfortable with networking?". In addition to that, what was once my gaming rig has now turned into the host running Ubuntu that's housing 25+ Docker containers.

## The Internet Isn't Working

The one saying nobody wants to hear while working on **\`enhancing\`** their home network, especially not from their spouse! As usual, I pick the worst time to start messing with my setup; right when my wife is streaming her favorite shows. I decided, hey why not try freeing up a Rasbperry Pi by replacing PiHole and PiVPN with the Wireguard and pfBlocker pfSense packages.

I started off on a positive outcome, I had wireguard sucesfully configured and tested. Next I installed pfBlocker and allegedlly set it up properly. Now I need to test how the ad blocking works with the new setup. So I modify the DNS settings by removing the PiHole IP and replacing it with a combination of AdGuard, Quad9, and Cloudflare IPs.

Then I hear those dreaded words "the internet isn't working"... oh nooo! I franticly start checking all my configurations. I finally see the mistake, the new DNS configurations weren't propogated fully across the devices at home. They were all still pointing to PiHole which was now turned off and stored in that one box thas has all those wires which I'll definitely use one day.

I also learned that pfBlocker wasn't for me so I reverted back to PiHole which has the nice GUI and allow/block lists because who wants to go in and keep adding/removing DNSBL lists and looking at those dreaded logs in pfSense console.

## All About Containers

This is where things started to get a little wild. I have 25+ containers running. I like the idea of being able to essentially have a system fully setup with a click of a button. Let's take my HomeAssistant (HA) setup, I had it running on a dedicated Raspberry Pi (RBPi). I have z-wave and zigbee hooked up to it and it's hardwired to my switch. If anything were to happen to that RBPi it would be such a pain to setup the whole system. Sure I have backups of my HA instance. I just didn't want to deal with SD cards going bad, etc. Maybe I'm just making excuses at this point. I just liked having the ability to bring down and container and back up on the fly and everything **just works**.

Here is my current layout.
\`\`\`
services/
├── core
│   ├── frigate
│   ├── homeassistant
│   ├── portainer
│   └── zwave
├── monitoring
│   ├── dozzle
│   └── speedtest
└── utilities
    ├── bookstack
    ├── changedetection
    ├── duplicati
    ├── heimdall
    ├── mosquitto
    └── watchtower
\`\`\`

You can see the entire setup on my [GitHub](https://github.com/amar-r/HomeFleet/tree/main).

## What's Next

In future posts, I'll start diving deeper into some of my containerized solutions. Why I decided to pick them and the issues I ran along the way.

---

*What started as me tinkering with a Raspberry Pi Camera module for a secure and private baby cam turning into a full fledged home security system and full home automation. Come join me in this journey to see what all I have done.*`,
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