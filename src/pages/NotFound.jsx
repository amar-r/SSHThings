import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - PAGE NOT FOUND | SSHTHINGS.COM</title>
        <meta name="description" content="The page you're looking for doesn't exist. Let's get you back on track." />
      </Helmet>

      <div className="min-h-screen bg-dos-black flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          {/* 404 Number */}
          <div className="text-6xl font-bold text-dos-green mb-4 font-dos">
            404
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold text-dos-green mb-4 font-dos">
            PAGE NOT FOUND
          </h1>

          {/* Description */}
          <p className="text-dos-green mb-8 font-dos">
            OOPS! THE PAGE YOU'RE LOOKING FOR DOESN'T EXIST. 
            IT MIGHT HAVE BEEN MOVED, DELETED, OR YOU ENTERED THE WRONG URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/"
              className="dos-button"
            >
              GO HOME
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="dos-button"
            >
              GO BACK
            </button>
          </div>

          {/* Helpful Links */}
          <div className="border-t border-dos-green pt-6">
            <h3 className="text-base font-bold text-dos-green mb-4 font-dos">
              POPULAR PAGES
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/blog"
                className="dos-link font-dos"
              >
                BLOG
              </Link>
              <Link
                to="/about"
                className="dos-link font-dos"
              >
                ABOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound 