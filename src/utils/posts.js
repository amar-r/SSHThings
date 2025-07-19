import matter from 'gray-matter'

// Import all markdown files from the posts directory
const postModules = import.meta.glob('/posts/*.md', { 
  eager: true,
  as: 'raw'
})

// Parse all markdown files and extract frontmatter + content
const parsePosts = () => {
  const posts = []
  
  for (const path in postModules) {
    const content = postModules[path]
    const slug = path.replace('/posts/', '').replace('.md', '')
    
    // Parse the markdown content
    const { data, content: markdownContent } = matter(content)
    const readTime = calculateReadTime(markdownContent)
    
    posts.push({
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content: markdownContent,
      tags: data.tags || [],
      readTime,
      image: data.image || null
    })
  }
  
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

// Get all posts
export const posts = parsePosts()

export const getPostBySlug = (slug) => {
  return posts.find(post => post.slug === slug)
}

export const getAllPosts = () => {
  return posts
}

export const getPostsByTag = (tag) => {
  return posts.filter(post => post.tags.includes(tag))
}

// Function to calculate read time (rough estimate)
export const calculateReadTime = (content) => {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
} 