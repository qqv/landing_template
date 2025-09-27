'use client'

import { getDomainName, getEmail } from '@/lib/config'
import { useEffect } from 'react'

export default function HomePage() {
  const domainName = getDomainName()
  const email = getEmail()

  useEffect(() => {
    // Load jQuery first
    const jqueryScript = document.createElement('script')
    jqueryScript.src = 'http://code.jquery.com/jquery-1.10.2.js'
    jqueryScript.onload = () => {
      // Load Atom script after jQuery is loaded
      const atomScript = document.createElement('script')
      atomScript.src = 'https://www.atom.com/scripts/pay-with-atom.js'
      document.head.appendChild(atomScript)
    }
    document.head.appendChild(jqueryScript)

    return () => {
      // Cleanup scripts when component unmounts
      const scripts = document.querySelectorAll('script[src*="jquery"], script[src*="atom.com"]')
      scripts.forEach(script => script.remove())
    }
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4 cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-2 hover:scale-105">
          {domainName}
        </h1>
        <p className="text-xl text-muted-foreground mb-6">{email}</p>
        
        <button 
          className="pay-with-atom inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          data-domain-name="now.ad"
          data-domain-price="2888"
          data-token="161f3b352da7fbce"
          data-installments=""
          data-down-payment=""
          data-host-name="https://www.atom.com"
        >
          <span>Buy With</span>
          <img src="https://www.atom.com/assets/pay.png" alt="Atom Logo" className="h-6" />
        </button>
      </div>
    </main>
  )
}
