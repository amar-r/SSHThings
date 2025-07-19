import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved === null) {
      // No saved preference, use system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return JSON.parse(saved)
  })

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      console.log('System theme changed:', e.matches ? 'dark' : 'light')
      // Only update if user hasn't manually set a preference
      const saved = localStorage.getItem('darkMode')
      console.log('Saved preference:', saved)
      if (saved === null) {
        console.log('Updating to system preference')
        setDarkMode(e.matches)
      }
    }

    // Test the current system preference
    console.log('Current system preference:', mediaQuery.matches ? 'dark' : 'light')
    console.log('Current localStorage:', localStorage.getItem('darkMode'))

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Function to reset to system preference (called from Header)
  const resetToSystemPreference = () => {
    localStorage.removeItem('darkMode')
    // Immediately set to current system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(systemPrefersDark)
    console.log('Reset to system preference - localStorage cleared, set to:', systemPrefersDark ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} onResetToSystem={resetToSystemPreference} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App 