import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ArrowLeftIcon, CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { getPostBySlug, getAllPosts } from '../utils/posts'

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true)
        const postData = await getPostBySlug(slug)
        if (postData) {
          setPost(postData)
        } else {
          setError('Post not found')
        }
      } catch (err) {
        console.error('Error loading post:', err)
        setError('Failed to load post')
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {error || 'Post not found'}
          </h1>
          <Link
            to="/blog"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - DOIT</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://amardoesthings.com/blog/${post.slug}`} />
        {post.image && <meta property="og:image" content={post.image} />}
        <meta property="article:published_time" content={post.date} />
        {post.tags && post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Helmet>

      <article className="min-h-screen bg-white dark:bg-gray-900">
        {/* Header */}
        <header className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to blog
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </div>
                {post.readTime && (
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {post.readTime} min read
                  </div>
                )}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full"
                    >
                      <TagIcon className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
              />
            )}
            
            <MarkdownRenderer content={post.content} />
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Written by Amar
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  Last updated: {format(new Date(post.date), 'MMMM dd, yyyy')}
                </p>
              </div>
              
              <Link
                to="/blog"
                className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to blog
              </Link>
            </div>
          </motion.div>
        </div>
      </article>
    </>
  )
}

export default BlogPost 