import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-dos-green bg-dos-black mt-8">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-dos-green-dim text-sm font-dos">
            © 2024 SSHTHINGS.COM - ALL RIGHTS RESERVED
          </div>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dos-green-dim hover:text-dos-green text-sm font-dos"
            >
              GITHUB
            </a>
            <Link to="/about" className="text-dos-green-dim hover:text-dos-green text-sm font-dos">
              ABOUT
            </Link>
            <Link to="/blog" className="text-dos-green-dim hover:text-dos-green text-sm font-dos">
              BLOG
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 