import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { EnvelopeIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'

const About = () => {
  // Obfuscated email to prevent bot harvesting
  const emailParts = ['contact', '@', 'sshthings', '.', 'com']
  const email = emailParts.join('')
  const mailtoLink = `mailto:${email}`

  const skills = [
    { category: 'Homelab Tech', items: ['Docker', 'Ubuntu', 'pfSense', 'Pi-hole', 'Self-hosted Services', 'Home Automation'] },
    { category: 'Personal Projects', items: ['Python', 'Bash', 'Automation Scripts', 'IoT Projects', 'Home Automation'] },
    { category: 'Learning & Experimenting', items: ['New Technologies', 'Open Source', 'DIY Projects', 'Random Automation'] },
  ]

  return (
    <>
      <Helmet>
        <title>About - SSHthings</title>
        <meta name="description" content="Learn more about Amar Rathore, Lead Systems Engineer with 13+ years of experience in AWS Cloud, Infrastructure Automation, and Security." />
        <meta property="og:title" content="About - SSHthings" />
        <meta property="og:description" content="Learn more about Amar Rathore, Lead Systems Engineer with 13+ years of experience in AWS Cloud, Infrastructure Automation, and Security." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sshthings.com/about" />
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
                About
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Personal projects, homelab experiments, and random things I'm building
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                <img 
                  src="/profile.jpg" 
                  alt="Amar Rathore" 
                  className="w-32 h-32 mx-auto mb-6 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Amar Rathore
                </h2>
                              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Homelab Enthusiast
              </p>
                
                <div className="space-y-3">
                  <a
                    href={mailtoLink}
                    className="flex items-center justify-center w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                    Get in Touch
                  </a>
                  <a
                    href="https://amar-r.com/Amar_Rathore_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors duration-200"
                  >
                    <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                    Download Resume
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  About Me
                </h3>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                                     <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                     This is my personal space for documenting projects, experiments, and random things I'm working on. 
                     It's completely separate from my professional work - just stuff I find interesting and want to share.
                   </p>
                   <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                     This blog, <span className="inline-flex items-baseline"><span className="font-bold text-primary-600 dark:text-primary-400">SSH</span><span className="font-normal text-primary-600 dark:text-primary-400">things</span></span> (Self-Service Homelab), serves as my digital garden where I document self-hosting projects, 
                     automation experiments, and whatever else catches my interest. It's a space for me to share knowledge,
                     learnings, and experiences from my journey in technology.
                   </p>
                   <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                     I maintain a personal homelab with 20+ Docker containers, pfSense for firewalling, 
                     and Pi-hole for DNS filtering. I'm also working on various automation projects and other random things. 
                     This is where I document all of that.
                   </p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Skills & Technologies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {skills.map((skillGroup, index) => (
                    <motion.div
                      key={skillGroup.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        {skillGroup.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mission */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Mission
                </h3>
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    My mission is to demystify complex technologies and make automation accessible to everyone. 
                    Through this blog, I aim to share practical knowledge, document my learning journey, 
                    and inspire others to explore the fascinating world of technology and infrastructure.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About 