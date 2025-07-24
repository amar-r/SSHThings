import { Link } from 'react-router-dom'

const BlogCard = ({ post }) => {
  return (
    <article className="console-card fade-in">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-console-green mb-3">
          <Link to={`/blog/${post.slug}`} className="hover:text-console-green-dim transition-colors duration-200">
            <span className="text-console-accent">$</span> {post.title}
          </Link>
        </h2>
        <p className="text-console-gray-dim text-xs font-mono">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </p>
      </div>
      
      <p className="text-console-green text-sm mb-4 font-sans leading-relaxed">
        {post.summary}
      </p>
      
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-console-bg-light text-console-green text-xs px-2 py-1 font-mono border border-console-gray-light rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

export default BlogCard 