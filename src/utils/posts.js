import matter from 'gray-matter'

// Sample blog post data - in a real app, this would come from markdown files
export const posts = [
  {
    slug: 'first-post',
    title: 'Welcome to sshthings - My First Blog Post',
    date: '2024-01-15',
    excerpt: 'An introduction to my personal blog where I\'ll be sharing self-hosting projects, automation experiments, and infrastructure insights.',
    content: `# Welcome to sshthings - My First Blog Post

Hello and welcome to **sshthings**! This is my personal blog where I'll be sharing my journey through self-hosting, infrastructure automation, and technology experiments.

## What to Expect

This blog will cover a variety of topics including:

- **Self-Hosting Projects**: Docker containers, Kubernetes clusters, and home server setups
- **Infrastructure Automation**: Terraform, Ansible, and CI/CD pipelines
- **Cloud Solutions**: AWS, Azure, and multi-cloud strategies
- **DevOps Practices**: Monitoring, logging, and security best practices
- **Technology Experiments**: New tools, frameworks, and methodologies

## My Background

I'm a Lead Systems Engineer with over 13 years of experience in cloud infrastructure, automation, and security. I've worked with various technologies and platforms, and I'm passionate about sharing knowledge and learning from the community.

## Why "sshthings"?

The name "sshthings" represents my focus on **self-hosting** and **infrastructure** projects. SSH (Secure Shell) is a fundamental tool for managing remote systems, and it symbolizes the technical foundation of the topics I'll be covering here.

## My Approach

I believe in:
- **Learning in Public**: Sharing both successes and failures
- **Practical Examples**: Real-world implementations and code snippets
- **Community Focus**: Engaging with others who share similar interests
- **Continuous Improvement**: Always exploring new technologies and approaches

Stay tuned for more content about self-hosting adventures, automation experiments, and infrastructure insights!`,
    tags: ['welcome', 'introduction', 'self-hosting'],
    readTime: 5
  }
]

export const getPostBySlug = (slug) => {
  return posts.find(post => post.slug === slug)
}

export const getAllPosts = () => {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const getPostsByTag = (tag) => {
  return posts.filter(post => post.tags.includes(tag))
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