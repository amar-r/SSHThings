import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const RetroLanding = () => {
  const [bootState, setBootState] = useState('idle') // idle, booting, crashed, ready
  const [bootLines, setBootLines] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [showCommands, setShowCommands] = useState(false)

  const bootSequence = [
    'SSHTHINGS OS v1.0.0',
    'Initializing system...',
    'Loading kernel modules...',
    'Mounting filesystems...',
    'Starting network services...',
    'Loading user interface...',
    'ERROR: Kernel panic - not syncing: Out of memory',
    'Kernel panic - not syncing: Out of memory',
    'CPU: 0 PID: 1 Comm: swapper/0 Not tainted 5.15.0',
    'Hardware name: QEMU Standard PC (i440FX + PIIX, 1996)',
    'Call Trace:',
    ' dump_stack+0x7a/0x9c',
    ' panic+0x1a4/0x1c0',
    ' out_of_memory+0x4a9/0x4e0',
    ' __alloc_pages_slowpath.constprop.0+0x1a1/0x1b0',
    ' __alloc_pages_nodemask+0x2d1/0x2e0',
    ' alloc_pages_current+0x8a/0xa0',
    ' __page_cache_alloc+0x1a/0x20',
    ' filemap_fault+0x1a4/0x1c0',
    ' ext4_filemap_fault+0x1a/0x20',
    ' __do_fault+0x1a/0x20',
    ' do_fault+0x1a4/0x1c0',
    ' handle_mm_fault+0x1a4/0x1c0',
    ' do_page_fault+0x1a4/0x1c0',
    ' page_fault+0x1a/0x20',
    '',
    '*** System halted ***',
    '',
    'Press any key to continue...'
  ]

  const handleInsertDisk = () => {
    setBootState('booting')
    setBootLines([])
    setCurrentLine(0)
  }

  useEffect(() => {
    if (bootState === 'booting' && currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setBootLines(prev => [...prev, bootSequence[currentLine]])
        setCurrentLine(prev => prev + 1)
      }, 800)

      return () => clearTimeout(timer)
    } else if (bootState === 'booting' && currentLine >= bootSequence.length) {
      setTimeout(() => setBootState('crashed'), 1000)
    }
  }, [bootState, currentLine, bootSequence])

  const handleKeyPress = () => {
    if (bootState === 'crashed') {
      setBootState('ready')
      setShowCommands(true)
    }
  }

  useEffect(() => {
    if (bootState === 'crashed') {
      const handleKeyDown = () => handleKeyPress()
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('click', handleKeyPress)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('click', handleKeyPress)
      }
    }
  }, [bootState])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* CRT Monitor */}
      <div className="relative">
        {/* Monitor Frame */}
        <div className="bg-zinc-800 rounded-lg p-8 shadow-2xl border-2 border-zinc-700">
          {/* Screen */}
          <div className="bg-black rounded-md p-6 w-96 h-80 relative overflow-hidden retro-crt retro-scan-lines">
            {/* CRT Scan Lines Effect */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="h-px bg-green-400 animate-pulse"
                  style={{ top: `${i * 5}%` }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 h-full">
              {bootState === 'idle' && (
                <div className="text-green-400 font-mono text-sm h-full flex flex-col items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-2xl mb-8 retro-text-glow">💾</div>
                    <div className="text-lg retro-text-glow">INSERT DISK TO BOOT</div>
                    <button
                      onClick={handleInsertDisk}
                      className="bg-green-400 text-black px-6 py-2 rounded font-bold hover:bg-green-300 transition-colors retro-button-glow"
                    >
                      INSERT DISK
                    </button>
                  </div>
                </div>
              )}

              {bootState === 'booting' && (
                <div className="text-green-400 font-mono text-sm h-full">
                  {bootLines.map((line, index) => (
                    <div key={index} className="mb-1">
                      {line}
                    </div>
                  ))}
                  <span className="animate-pulse">_</span>
                </div>
              )}

              {bootState === 'crashed' && (
                <div className="text-red-400 font-mono text-sm h-full retro-crash">
                  <div className="mb-4">
                    {bootLines.map((line, index) => (
                      <div key={index} className={`mb-1 ${line.includes('ERROR') || line.includes('Kernel panic') || line.includes('*** System halted ***') ? 'retro-error-text font-bold' : ''}`}>
                        {line}
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-8">
                    <div className="text-yellow-400 animate-pulse">Press any key to continue...</div>
                  </div>
                </div>
              )}

              {bootState === 'ready' && (
                <div className="text-green-400 font-mono text-sm h-full">
                  <div className="mb-4">
                    {bootLines.map((line, index) => (
                      <div key={index} className="mb-1">
                        {line}
                      </div>
                    ))}
                  </div>
                  
                  {showCommands && (
                    <div className="space-y-2">
                      <div className="text-yellow-400">Available commands:</div>
                      <div className="space-y-1">
                        <Link to="/Amar_Rathore_Resume.pdf" target="_blank" className="block hover:text-white transition-colors">
                          &gt; resume
                        </Link>
                        <Link to="/about" className="block hover:text-white transition-colors">
                          &gt; about
                        </Link>
                        <Link to="/blog" className="block hover:text-white transition-colors">
                          &gt; archive
                        </Link>
                        <a href="https://github.com/amar-r" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                          &gt; github
                        </a>
                        <a href="mailto:contact@sshthings.com" className="block hover:text-white transition-colors">
                          &gt; contact
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Keyboard */}
        <div className="mt-8 bg-zinc-700 rounded-lg p-4 shadow-lg">
          <div className="grid grid-cols-10 gap-1">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 bg-zinc-600 rounded-sm border border-zinc-500"
              />
            ))}
          </div>
        </div>

        {/* Floppy Drive */}
        <div className="absolute -top-4 -right-4 bg-zinc-600 rounded-lg p-2 shadow-lg">
          <div className="w-8 h-6 bg-zinc-800 rounded border border-zinc-500 flex items-center justify-center">
            <div className="w-4 h-2 bg-zinc-700 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RetroLanding
