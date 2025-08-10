import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-zinc-900">
      <div className="mx-auto max-w-screen-lg px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]">
          <span className="font-mono text-sm text-zinc-200">sshthings</span>
        </Link>
        
        <nav className="flex items-center gap-5 text-sm text-zinc-300">
          <Link
            to="/about"
            className={`font-mono transition-all duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${
              isActive('/about') 
                ? 'text-[var(--focus-ring)]' 
                : ''
            }`}
          >
            about
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header 