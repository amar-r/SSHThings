import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import BlogCard from '../components/BlogCard'
import { getAllPosts } from '../utils/posts'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts()
        setPosts(allPosts)
        setFilteredPosts(allPosts)
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  useEffect(() => {
    let filtered = posts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      )
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post =>
        post.tags && post.tags.includes(selectedTag)
      )
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, selectedTag])

  // Get all unique tags
  const allTags = [...new Set(posts.flatMap(post => post.tags || []))]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Blog - DOIT</title>
        <meta name="description" content="Read about homelab projects, automation experiments, and technical insights on the DOIT blog." />
        <meta property="og:title" content="Blog - DOIT" />
        <meta property="og:description" content="Read about homelab projects, automation experiments, and technical insights on the DOIT blog." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amardoesthings.com/blog" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Blog
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Thoughts, tutorials, and insights from my journey in technology, 
                homelab projects, and automation experiments.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                    selectedTag === ''
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                      selectedTag === tag
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm || selectedTag 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Check back soon for new posts!'
                  }
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Blog 