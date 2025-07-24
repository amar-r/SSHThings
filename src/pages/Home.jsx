import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import BlogCard from '../components/BlogCard'
import { getAllPosts } from '../utils/posts'

const Home = () => {
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <>
      <Helmet>
        <title>SSHTHINGS.COM - Personal Blog</title>
        <meta name="description" content="A personal blog about technology, homelab, and infrastructure experiments." />
      </Helmet>

      <div className="min-h-screen bg-dos-black">
        {/* Hero Section */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-dos-green mb-4 font-dos">
                WELCOME TO SSHTHINGS.COM
              </h1>
              <p className="text-dos-green mb-6 max-w-2xl mx-auto font-dos">
                A PERSONAL BLOG ABOUT TECHNOLOGY, HOMELAB EXPERIMENTS, AND INFRASTRUCTURE ADVENTURES.
              </p>
              <Link
                to="/blog"
                className="dos-button"
              >
                READ THE BLOG
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-bold text-dos-green mb-6 text-center font-dos">
              RECENT POSTS
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                to="/blog"
                className="dos-link font-dos"
              >
                VIEW ALL POSTS &gt;&gt;
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-8 px-4 border-t border-dos-green">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-lg font-bold text-dos-green mb-4 font-dos">
              ABOUT ME
            </h2>
            <p className="text-dos-green mb-6 max-w-2xl mx-auto font-dos">
              I'M PASSIONATE ABOUT TECHNOLOGY AND LOVE EXPERIMENTING WITH INFRASTRUCTURE, 
              AUTOMATION, AND SELF-HOSTING SOLUTIONS. THIS BLOG IS WHERE I SHARE MY 
              EXPERIENCES AND DISCOVERIES.
            </p>
            <Link
              to="/about"
              className="dos-link font-dos"
            >
              LEARN MORE ABOUT ME &gt;&gt;
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home 