import { Helmet } from 'react-helmet-async'

const About = () => {
  return (
    <>
      <Helmet>
        <title>ABOUT - SSHTHINGS.COM</title>
        <meta name="description" content="Learn more about me and my journey in technology." />
      </Helmet>

      <div className="min-h-screen bg-dos-black">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-dos-green mb-4 font-dos">
              ABOUT ME
            </h1>
            <p className="text-dos-green font-dos">
              A BRIEF INTRODUCTION TO WHO I AM AND WHAT I DO.
            </p>
          </div>

          <div className="prose prose-lg max-w-none font-dos">
            <p className="text-dos-green">
              HI THERE! I'M A TECHNOLOGY ENTHUSIAST WHO LOVES EXPERIMENTING WITH INFRASTRUCTURE, 
              AUTOMATION, AND SELF-HOSTING SOLUTIONS. THIS BLOG IS WHERE I SHARE MY EXPERIENCES, 
              DISCOVERIES, AND THE OCCASIONAL MISADVENTURES FROM MY HOMELAB JOURNEY.
            </p>

            <h2 className="text-base font-bold text-dos-green mb-3 mt-6">&gt;&gt; WHAT I DO</h2>
            <p className="text-dos-green">
              I WORK IN THE TECHNOLOGY INDUSTRY, FOCUSING ON INFRASTRUCTURE, AUTOMATION, AND 
              DEVOPS PRACTICES. MY INTERESTS INCLUDE:
            </p>
            <ul className="mb-3">
              <li className="text-dos-green">&gt; SELF-HOSTING AND HOMELAB PROJECTS</li>
              <li className="text-dos-green">&gt; INFRASTRUCTURE AUTOMATION</li>
              <li className="text-dos-green">&gt; CONTAINERIZATION AND ORCHESTRATION</li>
              <li className="text-dos-green">&gt; NETWORK SECURITY AND MONITORING</li>
              <li className="text-dos-green">&gt; OPEN SOURCE SOFTWARE</li>
            </ul>

            <h2 className="text-base font-bold text-dos-green mb-3 mt-6">&gt;&gt; THIS BLOG</h2>
            <p className="text-dos-green">
              SSHTHINGS STARTED AS A WAY TO DOCUMENT MY HOMELAB EXPERIMENTS AND SHARE WHAT I LEARN 
              ALONG THE WAY. I BELIEVE IN LEARNING BY DOING, AND THIS BLOG REFLECTS THAT APPROACH 
              - YOU'LL FIND POSTS ABOUT BOTH SUCCESSFUL PROJECTS AND THE LESSONS LEARNED FROM 
              THINGS THAT DIDN'T QUITE WORK OUT AS PLANNED.
            </p>

            <h2 className="text-base font-bold text-dos-green mb-3 mt-6">&gt;&gt; GET IN TOUCH</h2>
            <p className="text-dos-green">
              IF YOU HAVE QUESTIONS, SUGGESTIONS, OR JUST WANT TO CHAT ABOUT TECHNOLOGY, 
              FEEL FREE TO REACH OUT. I'M ALWAYS INTERESTED IN CONNECTING WITH FELLOW 
              TECHNOLOGY ENTHUSIASTS.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About 