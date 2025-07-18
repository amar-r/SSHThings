import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

const BlogCard = ({ post }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        {post.image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-3">
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(post.date), 'MMM dd, yyyy')}
            </time>
            {post.readTime && (
              <>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {post.readTime} min read
                </span>
              </>
            )}
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
            {post.title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-primary-600 dark:text-primary-400 font-medium text-sm hover:underline">
              Read more →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default BlogCard 