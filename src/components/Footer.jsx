import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-zinc-900">
      <div className="mx-auto max-w-screen-lg px-4 py-8 text-sm text-zinc-400 flex items-center justify-between">
        <p>© {new Date().getFullYear()} sshthings</p>
        <p className="hidden sm:block">quiet notes on infra and homelab</p>
      </div>
    </footer>
  )
}

export default Footer 