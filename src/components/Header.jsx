import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="console-header">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-lg font-bold text-console-green hover:text-console-green-dim transition-colors duration-200 font-mono">
              <span className="text-console-accent">$</span> sshthings
            </Link>
          </div>
          
          <nav className="flex space-x-6">
            <Link
              to="/"
              className={`text-sm font-mono transition-all duration-200 ${
                isActive('/') 
                  ? 'console-nav-active' 
                  : 'console-nav-link'
              }`}
            >
              home
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-mono transition-all duration-200 ${
                isActive('/blog') 
                  ? 'console-nav-active' 
                  : 'console-nav-link'
              }`}
            >
              blog
            </Link>
            <Link
              to="/about"
              className={`text-sm font-mono transition-all duration-200 ${
                isActive('/about') 
                  ? 'console-nav-active' 
                  : 'console-nav-link'
              }`}
            >
              about
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 