---
title: "In The Beginning... HomeLab Edition"
date: "2025-07-21"
excerpt: "What started as me tinkering with a Raspberry Pi Camera module for a secure and private baby cam turning into a full fledged home security system and full home automation. Come join me in this journey to see what all I have done."
tags: ["homelab", "self-hosting", "monitoring", "automation", "family-tech", "infrastructure"]
readTime: 7
---

# In The Beginning... HomeLab Edition

## Introduction

I remember it all as if it were yesterday. It was the beginning of COVID and around when my first child was born. I was already working from home and was entering my parental leave. Between changing poopy diapers and taking naps whenever I could, I got the itch to do something during my free time. With my wife was returning to work I wanted to provide her a privacy focused and secure way of watching our child while at the office. In came the PiHole/PiVPN combo and and a tiny little camera module that would be attached to a Raspberry Pi Zero. Using MotionEyeOS, I sucessfully setup a local and secure baby camera. #TheBeginning

My paternatily leave was over, I was excited to tell some folks at work what I had done with the custom baby monitor. Then it happened, a buddy of mine told me about HomeAssistant. Talk about gateway drug. As if I wasn't already sleep deprived. Now I have something else keeping me up at night. At some late hour I'm having a conversation with myself "Which zibgee/z-wave device should I buy?" while browsing the Amazon search results looking for an excuse to add one more automation to HomeAssistant.

Fast forward to 2025, almost every door in my house has a door sensor that's connected to some z-wave light switch via a HomeAssistant automation. I decided to upgrade my networking by getting a pfSense device, because I thought "Why not get something super complicated to force myself to get more comfortable with networking?". In addition to that, what was once my gaming rig has now turned into the host running Ubuntu that's housing 25+ Docker containers.

## The Internet Isn't Working

The one saying nobody wants to hear while working on **`enhancing`** their home network, especially not from their spouse! As usual, I pick the worst time to start messing with my setup; right when my wife is streaming her favorite shows. I decided, hey why not try freeing up a Rasbperry Pi by replacing PiHole and PiVPN with the Wireguard and pfBlocker pfSense packages.

I started off on a positive outcome, I had wireguard sucesfully configured and tested. Next I installed pfBlocker and allegedlly set it up properly. Now I need to test how the ad blocking works with the new setup. So I modify the DNS settings by removing the PiHole IP and replacing it with a combination of AdGuard, Quad9, and Cloudflare IPs.

Then I hear those dreaded words "the internet isn't working"... oh nooo! I franticly start checking all my configurations. I finally see the mistake, the new DNS configurations weren't propogated fully across the devices at home. They were all still pointing to PiHole which was now turned off and stored in that one box thas has all those wires which I'll definitely use one day.

I also learned that pfBlocker wasn't for me so I reverted back to PiHole which has the nice GUI and allow/block lists because who wants to go in and keep adding/removing DNSBL lists and looking at those dreaded logs in pfSense console.

## All About Containers

This is where things started to get a little wild. I have 25+ containers running. I like the idea of being able to essentially have a system fully setup with a click of a button. Let's take my HomeAssistant (HA) setup, I had it running on a dedicated Raspberry Pi (RBPi). I have z-wave and zigbee hooked up to it and it's hardwired to my switch. If anything were to happen to that RBPi it would be such a pain to setup the whole system. Sure I have backups of my HA instance. I just didn't want to deal with SD cards going bad, etc. Maybe I'm just making excuses at this point. I just liked having the ability to bring down and container and back up on the fly and everything **just works**.

Here is my current layout.
```
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
```

You can see the entire setup on my [GitHub](https://github.com/amar-r/HomeFleet/tree/main).

## What's Next

In future posts, I'll start diving deeper into some of my containerized solutions. Why I decided to pick them and the issues I ran along the way.

---

*What started as me tinkering with a Raspberry Pi Camera module for a secure and private baby cam turning into a full fledged home security system and full home automation. Come join me in this journey to see what all I have done.* 