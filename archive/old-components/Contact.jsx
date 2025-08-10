import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'

const Contact = () => {
  // Obfuscated email to prevent bot harvesting
  const emailParts = ['contact', '@', 'sshthings', '.', 'com']
  const email = emailParts.join('')
  const mailtoLink = `mailto:${email}`

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email',
      value: email,
      href: mailtoLink
    },
    {
      icon: MapPinIcon,
      title: 'Location',
      value: 'Remote / United States',
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
        <title>Contact - SSHthings</title>
        <meta name="description" content="Get in touch with Amar. I'm always open to discussing new opportunities, collaborations, or just chatting about technology." />
        <meta property="og:title" content="Contact - SSHthings" />
        <meta property="og:description" content="Get in touch with Amar. I'm always open to discussing new opportunities, collaborations, or just chatting about technology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sshthings.com/contact" />
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
                    href="https://github.com/amar-r"
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
                    href="https://linkedin.com/in/amar-s-r"
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

                </div>
              </div>
            </motion.div>

            {/* Direct Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Get in Touch
                </h2>
                
                <div className="text-center space-y-6">
                  <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <EnvelopeIcon className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Email Me Directly
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      The easiest way to reach me is through email. I'm always open to discussing 
                      interesting projects, collaborations, or just chatting about technology.
                    </p>
                    <a
                      href={mailtoLink}
                      className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      <EnvelopeIcon className="h-4 w-4 mr-2" />
                      Send Email
                    </a>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p>I typically respond within 24-48 hours.</p>
                    <p>Feel free to reach out about:</p>
                    <ul className="mt-2 space-y-1 text-left max-w-md mx-auto">
                      <li>• Homelab projects and automation</li>
                      <li>• Interesting technical discussions</li>
                      <li>• Collaboration opportunities</li>
                      <li>• Random project ideas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact 