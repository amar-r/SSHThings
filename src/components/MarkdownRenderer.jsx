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
                  backgroundColor: '#1A1A1A',
                  border: '1px solid #90EE90',
                  color: '#90EE90',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontSize: '12px',
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
            <h1 className="text-lg font-bold text-dos-green mb-4 font-dos">&gt; {children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-bold text-dos-green mb-3 mt-6 font-dos">&gt;&gt; {children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-bold text-dos-green mb-2 mt-4 font-dos">&gt;&gt;&gt; {children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-dos-green mb-4 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-dos-green mb-2">&gt; {children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-dos-green pl-4 text-dos-green-dim mb-4">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-dos-green underline hover:text-dos-green-dim">
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className="border border-dos-green max-w-full h-auto my-4" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-dos-green">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-dos-green px-2 py-1 text-left bg-dos-gray-dark font-bold text-dos-green">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-dos-green px-2 py-1 text-left text-dos-green">
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