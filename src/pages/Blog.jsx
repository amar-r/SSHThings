import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import BlogCard from '../components/BlogCard'
import { getAllPosts } from '../utils/posts'

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  
  const allPosts = getAllPosts()
  const allTags = [...new Set(allPosts.flatMap(post => post.tags || []))]
  
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag))
    return matchesSearch && matchesTag
  })

  return (
    <>
      <Helmet>
        <title>BLOG - SSHTHINGS.COM</title>
        <meta name="description" content="Read about technology, homelab experiments, and infrastructure adventures." />
      </Helmet>

      <div className="min-h-screen bg-dos-black">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-dos-green mb-4 font-dos">
              BLOG
            </h1>
            <p className="text-dos-green font-dos">
              THOUGHTS, EXPERIMENTS, AND DISCOVERIES FROM MY TECHNOLOGY JOURNEY.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="SEARCH POSTS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="dos-input flex-1"
              />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="dos-input"
              >
                <option value="">ALL TAGS</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-dos-green-dim text-lg font-dos">
                NO POSTS FOUND MATCHING YOUR CRITERIA.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Blog 