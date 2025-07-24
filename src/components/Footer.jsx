import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-console-gray-light bg-console-bg mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-console-gray-dim text-sm font-mono">
            © 2024 sshthings.com
          </div>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="console-link text-sm font-mono"
            >
              github
            </a>
            <Link to="/about" className="console-link text-sm font-mono">
              about
            </Link>
            <Link to="/blog" className="console-link text-sm font-mono">
              blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 