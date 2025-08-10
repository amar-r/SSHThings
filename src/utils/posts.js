// Dynamic blog system that automatically loads posts from the posts/ directory
// Excludes posts in the posts/upcoming/ folder

// For now, let's use a simpler approach that works with the current setup
// We'll manually manage the posts array but make it easy to add/remove posts

export const posts = [
  {
    slug: 'why-you-should-use-cloudflare-pages',
    title: 'Why You Should Use Cloudflare',
    date: '2025-08-09',
    excerpt: 'Switching to Cloudflare was one of the best things I did for my portfolio site.',
    content: `> I initially titled this post "Why you should use Cloudflare pages" but then at the end realized it's more "Why you should use Cloudflare". I'm 100% positive I'm not even going to be scratching the surface with what Cloudflare can provide. But this is what I've learned over a short period of time. I hope to learn more and implement more.

## TL;DR

* Needed a free, privacy-friendly way to host a portfolio.
* Chose Cloudflare Pages—simple Git deploys, SSL by default, and zero cost for my needs.

## The Journey

I really want to exemplify my skillset, to standout in today's job market. I figured having a personal site would help. So began my journey to finding the perfect domain name and how to host it.

Circa 2018, I had a technical blog around SCCM/MECM. I hosted it on AWS under their free tier. The thing about AWS and it's free tier (at that time) is that it lasted for a year and then you had to start paying for the resources. Me being extra frugal decided that maybe I don't need a blog anymore so I decided to shut it down. Sorry to everyone who expected more content, I kinda ghosted everyone. Fast forward to today, I can't really go back down the AWS free tier route anymore. I honestly didn't even bother looking to see if it changed. I did some digging, talked to friends, and used AI to find some solutions; in came GitHub Pages, Netlify, and Vercel.

### Netlify

I actually had never heard of Netlify. My consultant (AI) told me about it and I just went with it. I was excited to have something back up and running for the public to see. Netlify was cool, it allowed me to use a custom domain (Amar-r.com) and GitOps for free. Which means, anytime I posted a new commit to my main branch a new deployment was kicked off in Netlify and updated my page. It handled SSL and a few other security functionalities out of the box with minimal clicks. It was nice to use. I could use a private repo, which was a nice feature. Mabye one day I'll go back and investigate further. Feel free to check it out at [Netlify.com](https://www.netlify.com/).

### GitHub Pages

I actually have this blog posted on [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), because variety is good. When I thought about it, I was like why not use GitHub Pages and more importantly [GitHub Actions](https://github.com/features/actions). Once you get the hang of it, it's pretty cool. All your source code is in one place so why not have the site hosted in the same spot. Creating the deploy.yml file was pretty straightforward and kinda a breath of fresh air after using Jenkins and groovy since ~2020 🤮. GitHub Pages does NOT allow you to have private repos unless you want to pay for it.

### Cloudflare Pages

I migrated my domain from Namecheap over to Cloudflare for...reasons. I like the features Cloudflare provides for domains, like unique visitors, metrics on Geolocation for visitors, and a slew of security options all available for $free.99. 

I've always been a big propoent of security and privacy. I don't like my data or information to be out there for people to find. When I created my portfoio page, I decided to provide more information than I typically would. I had my entire resume posted on my site, which included the city and state of my current residence, my email, and my phone number. Yes, you read that correctly. I put my resume with my personal phone number on a publically facing website.

This is when I started to really like [Cloudflare Pages](https://pages.cloudflare.com/) and a feature within Cloudflare itself, called [Cloudflare Zero Trust](https://developers.cloudflare.com/cloudflare-one/) one-time PIN (OTP). Before you say anything, you don't have to use Cloudflare Pages to utlilize the Cloudflare Zero Trust features, you only need your domain to be managed by Cloudflare. Btw, you can use private repos with Cloudflare Pages.

The OTP feature really came in handy for me because I was able to have my resume posted on my site but with a little extra security. In order for someone to view my resume, they have to enter their email and then enter a PIN which was sent to them via Cloudflare. Much better solution than just having it readily available. Yes, I know it's still easy for someone to view my entire resume. I'm most likely going to setup Cloudflare's feature where I get an email to approve requests people put in to gain access, which is timelocked to a specific time.

Please go checkout what they have to offer from a securitiy standpoint. There are other features I implemented like HSTS to force browsers to communicate with my site strictly over HTTPS.`,
    tags: ['security', 'privacy', 'AI', 'self-promotion'],
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

// Helper function to get upcoming posts (for admin purposes)
export const getUpcomingPosts = () => {
  // This would scan the upcoming folder when we implement full dynamic loading
  return []
} 