import matter from 'gray-matter'

// This would typically be imported from a build-time process
// For now, we'll simulate the posts data
const postsData = [
  {
    slug: 'first-post',
    title: 'Welcome to DOIT - My First Blog Post',
    date: '2024-01-15',
    excerpt: 'An introduction to my personal blog where I\'ll be sharing homelab projects, automation experiments, and technical insights.',
    content: `# Welcome to DOIT - My First Blog Post

Hello and welcome to **DOIT** - Docs Of Interesting Things! This is my personal blog where I'll be sharing my journey through technology, homelab projects, and automation experiments.

## What to Expect

This blog will cover a variety of topics including:

- **Homelab Projects**: Server setups, networking configurations, and infrastructure management
- **Automation**: Scripts, tools, and workflows that make life easier
- **Technical Insights**: Lessons learned from real-world projects and experiments
- **Tutorials**: Step-by-step guides for common tasks and setups

## Why "DOIT"?

The name "DOIT" stands for **Docs Of Interesting Things**. It's a simple reminder that documentation is crucial in technology, and that sharing knowledge helps everyone grow.

## My Approach

I believe in:
- **Learning in Public**: Sharing both successes and failures
- **Practical Examples**: Real code and configurations you can use
- **Clear Documentation**: Step-by-step guides that actually work
- **Community**: Engaging with others who share similar interests

## Getting Started

If you're new here, I recommend starting with:
1. The [About](/about) page to learn more about me
2. The [Blog](/blog) section to explore existing posts
3. The [Contact](/contact) page if you want to connect

## What's Next?

I have several posts planned covering:
- My homelab setup and architecture
- Automation workflows for daily tasks
- Infrastructure as Code examples
- Monitoring and logging solutions

Stay tuned for more content, and feel free to reach out if you have questions or suggestions!

---

*This is just the beginning. Let's build something interesting together.*`,
    tags: ['introduction', 'blog', 'homelab'],
    readTime: 3,
    image: null
  }
]

export const getAllPosts = async () => {
  // In a real implementation, this would load markdown files
  // For now, we'll return the simulated data
  return postsData.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const getPostBySlug = async (slug) => {
  const posts = await getAllPosts()
  return posts.find(post => post.slug === slug)
}

export const getPostsByTag = async (tag) => {
  const posts = await getAllPosts()
  return posts.filter(post => post.tags && post.tags.includes(tag))
}

// Function to parse markdown content with frontmatter
export const parseMarkdown = (markdownContent) => {
  const { data, content } = matter(markdownContent)
  
  return {
    frontmatter: data,
    content: content
  }
}

// Function to calculate read time (rough estimate)
export const calculateReadTime = (content) => {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
} 