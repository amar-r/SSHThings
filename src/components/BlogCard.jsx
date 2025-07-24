import { Link } from 'react-router-dom'

const BlogCard = ({ post }) => {
  return (
    <article className="dos-card hover:border-dos-green-dim transition-colors">
      <div className="mb-3">
        <h2 className="text-base font-bold text-dos-green mb-2">
          <Link to={`/blog/${post.slug}`} className="hover:text-dos-green-dim">
            &gt; {post.title}
          </Link>
        </h2>
        <p className="text-dos-green-dim text-xs font-dos">
          DATE: {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}
        </p>
      </div>
      
      <p className="text-dos-green text-sm mb-3 font-dos leading-relaxed">
        {post.summary}
      </p>
      
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-dos-gray-dark text-dos-green text-xs px-2 py-1 font-dos border border-dos-green"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

export default BlogCard 