import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      className="prose prose-lg max-w-none"
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              style={tomorrow}
              language={match[1]}
              PreTag="div"
              className="rounded-lg"
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
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-800 dark:text-gray-200">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-800 dark:text-gray-200">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="mb-4 pl-6 space-y-2">
            {children}
          </ul>
        ),
        li: ({ children }) => (
          <li className="text-gray-700 dark:text-gray-300">
            {children}
          </li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 py-2 rounded-r">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="rounded-lg shadow-md max-w-full h-auto mx-auto"
          />
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left bg-gray-100 dark:bg-gray-800 font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default MarkdownRenderer 