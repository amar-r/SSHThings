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

      <div className="min-h-screen bg-console-bg">
        <main>
          <article className="article">
            {/* Header */}
            <header className="mb-6">
              <Link to="/blog" className="text-sm text-zinc-400 hover:text-zinc-200 mb-4 inline-block">
                ← Back to blog
              </Link>
              
              <h1>{post.title}</h1>
              
              <div className="flex items-center text-zinc-500 text-sm mb-4">
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center ml-4">
                    <div className="flex gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded border border-zinc-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </header>

            {/* Content */}
            <div>
              <MarkdownRenderer content={post.content} />
            </div>
          </article>
        </main>
      </div>
    </>
  )
}

export default BlogPost 