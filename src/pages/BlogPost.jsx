import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { getPostBySlug } from '../utils/posts'

const BlogPost = () => {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-dos-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-dos-green mb-4 font-dos">POST NOT FOUND</h1>
          <p className="text-dos-green-dim mb-6 font-dos">THE POST YOU'RE LOOKING FOR DOESN'T EXIST.</p>
          <Link to="/blog" className="dos-link font-dos">
            &lt;&lt; BACK TO BLOG
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.title.toUpperCase()} - SSHTHINGS.COM</title>
        <meta name="description" content={post.summary} />
      </Helmet>

      <div className="min-h-screen bg-dos-black">
        <article className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <header className="mb-6">
            <Link to="/blog" className="dos-link mb-4 inline-block font-dos">
              &lt;&lt; BACK TO BLOG
            </Link>
            
            <h1 className="text-xl font-bold text-dos-green mb-4 font-dos">
              &gt; {post.title.toUpperCase()}
            </h1>
            
            <div className="flex items-center text-dos-green-dim mb-4 font-dos">
              <span className="text-xs">
                DATE: {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}
              </span>
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center ml-4">
                  <span className="text-xs mr-2">TAGS:</span>
                  <div className="flex gap-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-dos-gray-dark text-dos-green text-xs px-2 py-1 font-dos border border-dos-green"
                      >
                        {tag.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none font-dos">
            <MarkdownRenderer content={post.content} />
          </div>
        </article>
      </div>
    </>
  )
}

export default BlogPost 