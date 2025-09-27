'use client'

import { getDomainName, getEmail, getAtomPaymentConfig } from '@/lib/config'
import { useEffect } from 'react'

export default function HomePage() {
  const domainName = getDomainName()
  const email = getEmail()
  const atomConfig = getAtomPaymentConfig()

  useEffect(() => {
    // Load jQuery first (using HTTPS to avoid mixed content errors)
    const jqueryScript = document.createElement('script')
    jqueryScript.src = 'https://code.jquery.com/jquery-1.10.2.js'
    jqueryScript.onload = () => {
      console.log('jQuery loaded successfully')
      // Load Atom script after jQuery is loaded
      const atomScript = document.createElement('script')
      atomScript.src = 'https://www.atom.com/scripts/pay-with-atom.js'
      atomScript.onload = () => {
        console.log('Atom payment script loaded successfully')
      }
      atomScript.onerror = () => {
        console.error('Failed to load Atom payment script')
      }
      document.head.appendChild(atomScript)
    }
    jqueryScript.onerror = () => {
      console.error('Failed to load jQuery')
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
          className="pay-with-atom inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          data-domain-name={atomConfig.domainName}
          data-domain-price={atomConfig.domainPrice}
          data-token={atomConfig.token}
          data-installments={atomConfig.installments}
          data-down-payment={atomConfig.downPayment}
          data-host-name={atomConfig.hostName}
        >
          <span>Buy With</span>
          <img src="https://www.atom.com/assets/pay.png" alt="Atom Logo" className="h-6" />
        </button>
      </div>
    </main>
  )
}
