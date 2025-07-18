import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRightIcon, CodeBracketIcon, ServerIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'

const Home = () => {
  const features = [
    {
      icon: CodeBracketIcon,
      title: 'Infrastructure as Code',
      description: 'Terraform configurations, Kubernetes manifests, and infrastructure automation patterns.',
    },
    {
      icon: ServerIcon,
      title: 'Cloud Solutions',
      description: 'AWS architecture, containerization strategies, and cloud-native development practices.',
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'DevOps Automation',
      description: 'CI/CD pipelines, monitoring setups, and operational automation workflows.',
    },
  ]

  return (
    <>
      <Helmet>
        <title>DOIT - Docs Of Interesting Things</title>
        <meta name="description" content="Lead Systems Engineer Amar Rathore's blog sharing infrastructure automation, cloud solutions, and technical insights from 13+ years of experience." />
        <meta property="og:title" content="DOIT - Docs Of Interesting Things" />
        <meta property="og:description" content="Lead Systems Engineer Amar Rathore's blog sharing infrastructure automation, cloud solutions, and technical insights from 13+ years of experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amardoesthings.com" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6"
              >
                Hi, I'm{' '}
                <span className="text-primary-600 dark:text-primary-400">Amar</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
              >
                Lead Systems Engineer specializing in AWS Cloud, Infrastructure Automation, and Security
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
              >
                I've spent 13+ years building and automating infrastructure across Windows, Linux, and cloud environments. 
                I like working with Terraform, Docker, and Python to create secure, scalable systems in AWS and Azure.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  to="/blog"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Explore Blog
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors duration-200"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                What I Write About
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                From homelab adventures to automation experiments, here's what you'll find in my blog.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <feature.icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-600 dark:bg-primary-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Explore?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Dive into my latest posts and discover interesting projects, 
              automation tips, and technical insights.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors duration-200"
            >
              Start Reading
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home 