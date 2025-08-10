import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import RetroLanding from './pages/RetroLanding'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  return (
    <div className="min-h-screen bg-console-bg">
      {!isLandingPage && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<RetroLanding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isLandingPage && <Footer />}
    </div>
  )
}

export default App 