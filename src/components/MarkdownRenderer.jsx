import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
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
            <h1 className="text-2xl font-bold text-console-green mb-6 font-mono">
              <span className="text-console-accent">$</span> {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-console-green mb-4 mt-8 font-mono">
              <span className="text-console-accent">&gt;</span> {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold text-console-green mb-3 mt-6 font-mono">
              <span className="text-console-accent">&gt;&gt;</span> {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-console-green mb-5 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-console-green mb-2">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-console-accent pl-4 text-console-gray-dim mb-5 bg-console-bg-light rounded-r-md py-2">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-console-accent hover:text-console-green transition-colors duration-200">
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className="border border-console-gray-light rounded-lg max-w-full h-auto my-4 shadow-lg" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-5">
              <table className="min-w-full border border-console-gray-light rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-console-gray-light px-3 py-2 text-left bg-console-bg-light font-semibold text-console-green">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-console-gray-light px-3 py-2 text-left text-console-green">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer 