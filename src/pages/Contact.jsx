import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email',
      value: 'amar@amardoesthings.com',
      href: 'mailto:amar@amardoesthings.com'
    },
    {
      icon: MapPinIcon,
      title: 'Location',
      value: 'Remote / Worldwide',
      href: null
    },
    {
      icon: PhoneIcon,
      title: 'Availability',
      value: 'Open to opportunities',
      href: null
    }
  ]

  return (
    <>
      <Helmet>
        <title>Contact - DOIT</title>
        <meta name="description" content="Get in touch with Amar. I'm always open to discussing new opportunities, collaborations, or just chatting about technology." />
        <meta property="og:title" content="Contact - DOIT" />
        <meta property="og:description" content="Get in touch with Amar. I'm always open to discussing new opportunities, collaborations, or just chatting about technology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amardoesthings.com/contact" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Contact
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                I'm always open to discussing new opportunities, collaborations, 
                or just chatting about technology. Feel free to reach out!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {info.title}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Connect on Social
                </h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    aria-label="Twitter"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Send a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <p className="text-green-800 dark:text-green-200">
                        Thank you for your message! I'll get back to you soon.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact 