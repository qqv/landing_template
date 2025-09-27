'use client'

import { getDomainName, getEmail, getAtomPaymentConfig } from '@/lib/config'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const domainName = getDomainName()
  const email = getEmail()
  const atomConfig = getAtomPaymentConfig()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let jqueryScript: HTMLScriptElement | null = null
    let atomScript: HTMLScriptElement | null = null

    // Load jQuery first (using HTTPS to avoid mixed content errors)
    jqueryScript = document.createElement('script')
    jqueryScript.src = 'https://code.jquery.com/jquery-1.10.2.js'
    jqueryScript.onload = () => {
      console.log('jQuery loaded successfully')
      // Load Atom script after jQuery is loaded
      atomScript = document.createElement('script')
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
      // Safely cleanup scripts when component unmounts
      try {
        if (jqueryScript && jqueryScript.parentNode) {
          jqueryScript.parentNode.removeChild(jqueryScript)
        }
      } catch (error) {
        console.warn('Failed to remove jQuery script:', error)
      }

      try {
        if (atomScript && atomScript.parentNode) {
          atomScript.parentNode.removeChild(atomScript)
        }
      } catch (error) {
        console.warn('Failed to remove Atom script:', error)
      }
    }
  }, [])

  const handleButtonClick = () => {
    setIsLoading(true)
    // Atom script will handle the actual payment, this is just for UI feedback
    // Reset loading state after a timeout if no redirect happens
    setTimeout(() => {
      if (!window.location.href.includes('checkout') && !window.location.href.includes('payment')) {
        setIsLoading(false)
      }
    }, 10000)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold text-foreground mb-4 cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-2 hover:scale-105">
          {domainName}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">{email}</p>
        
        <div className="flex justify-center">
          <button 
            onClick={handleButtonClick}
            disabled={isLoading}
            className="pay-with-atom inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl min-w-[160px]"
            data-domain-name={atomConfig.domainName}
            data-domain-price={atomConfig.domainPrice}
            data-token={atomConfig.token}
            data-installments={atomConfig.installments}
            data-down-payment={atomConfig.downPayment}
            data-host-name={atomConfig.hostName}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-white">Loading...</span>
              </>
            ) : (
              <>
                <span>Buy With</span>
                <img src="https://www.atom.com/assets/pay.png" alt="Atom Logo" className="h-6" />
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  )
}
