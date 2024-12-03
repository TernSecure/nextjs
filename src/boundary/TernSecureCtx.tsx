'use client'

import { createContext, useContext} from 'react'

// Core types
export type TernSecureCtxValue = {
  _contextKey: Symbol
}

// Context with proper null handling
const INTERNAL_CONTEXT_KEY = Symbol('TERN_SECURE_CONTEXT')
const TernSecureContext = createContext<TernSecureCtxValue | null>(null)

// Set display name for better debugging
TernSecureContext.displayName = 'TernSecureContext'

export const useInternalContext = (hookname: string) => {

  const context = useContext(TernSecureContext)
  
  if (!context) {
    throw new Error(
      `${hookname} must be used within TernSecureProvider`
    )
  }

  return context
}

/**
 * Provider component for TernSecure
 * Must be used in client components only
 */
export function TernSecureCtxProvider({ children }: { children: React.ReactNode }) {
  return (
    <TernSecureContext.Provider value={{
      _contextKey: INTERNAL_CONTEXT_KEY 
    }}>
      {children}
    </TernSecureContext.Provider>
  )
}