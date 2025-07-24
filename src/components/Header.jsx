import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="dos-header">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-12">
          <div className="flex items-center">
            <Link to="/" className="text-lg font-bold text-dos-green hover:text-dos-green-dim">
              C:\SSHTHINGS&gt;_
            </Link>
          </div>
          
          <nav className="flex space-x-6">
            <Link
              to="/"
              className={`text-sm font-dos ${
                isActive('/') 
                  ? 'text-dos-green bg-dos-green text-dos-black px-2' 
                  : 'text-dos-green hover:text-dos-green-dim'
              }`}
            >
              HOME
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-dos ${
                isActive('/blog') 
                  ? 'text-dos-green bg-dos-green text-dos-black px-2' 
                  : 'text-dos-green hover:text-dos-green-dim'
              }`}
            >
              BLOG
            </Link>
            <Link
              to="/about"
              className={`text-sm font-dos ${
                isActive('/about') 
                  ? 'text-dos-green bg-dos-green text-dos-black px-2' 
                  : 'text-dos-green hover:text-dos-green-dim'
              }`}
            >
              ABOUT
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 