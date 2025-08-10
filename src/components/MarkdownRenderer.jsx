import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

const MarkdownRenderer = ({ content }) => {
  return (
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
        // Demote H1 to H2 to avoid duplicate titles
        h1: ({ children }) => (
          <h2>{children}</h2>
        ),
        h2: ({ children }) => (
          <h2>{children}</h2>
        ),
        h3: ({ children }) => (
          <h3>{children}</h3>
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
          return <p>{children}</p>
        },
        ul: ({ children }) => (
          <ul>{children}</ul>
        ),
        ol: ({ children }) => (
          <ol>{children}</ol>
        ),
        li: ({ children }) => (
          <li>{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote>{children}</blockquote>
        ),
        a: ({ href, children }) => (
          <a href={href}>{children}</a>
        ),
        img: ({ src, alt }) => (
          <img src={src} alt={alt} />
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto">
            <table>
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th>{children}</th>
        ),
        td: ({ children }) => (
          <td>{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default MarkdownRenderer 