import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose prose-lg max-w-none px-4 py-8">
      <ReactMarkdown
        remarkPlugins={[]}
        rehypePlugins={[]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                style={tomorrow}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  backgroundColor: '#161B22',
                  border: '1px solid #30363D',
                  borderRadius: '0.5rem',
                  color: '#7EE787',
                  fontFamily: 'JetBrains Mono, Fira Code, monospace',
                  fontSize: '14px',
                  padding: '1rem',
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          h1: ({ children }) => (
            <h1 className="prose-h1">
              <span className="text-console-accent">$</span> {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="prose-h2">
              <span className="text-console-accent">&gt;</span> {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="prose-h3">
              <span className="text-console-accent">&gt;&gt;</span> {children}
            </h3>
          ),
          p: ({ children }) => {
            // Check if this paragraph contains our loading bar text
            const text = String(children)
            if (text.includes('Loading migration content...')) {
              return (
                <div className="my-6">
                  <div className="loading-bar"></div>
                  <div className="loading-text">Loading migration content...</div>
                </div>
              )
            }
            return <p className="prose-p">{children}</p>
          },
          ul: ({ children }) => (
            <ul className="prose-ul">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="prose-ol">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="prose-li">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="prose-blockquote">{children}</blockquote>
          ),
          a: ({ href, children }) => (
            <a href={href} className="prose-a">{children}</a>
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className="prose-img" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="prose-table">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="prose-th">{children}</th>
          ),
          td: ({ children }) => (
            <td className="prose-td">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer 