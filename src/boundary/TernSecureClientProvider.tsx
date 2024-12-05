"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { TernSecureAuth } from '../utils/client-init'
import { onAuthStateChanged } from "firebase/auth"
import { TernSecureCtx, TernSecureCtxValue, TernSecureState } from './TernSecureCtx'


export function TernSecureClientProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<TernSecureState>({
    user: null,
    isLoaded: false,
    error: null,
  })

useEffect(() => {
  const auth = TernSecureAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthState({
          isLoaded: true,
          user: auth.currentUser,
          error: null
        })
      } else {
        setAuthState({
          isLoaded: true,
          user: null,
          error: null
        })
        auth.signOut()
      }
    })
    
    return () => unsubscribe()
  }, [])

  const contextValue: TernSecureCtxValue = useMemo(() => ({
    ...authState
  }), [authState])

  if (!authState.isLoaded) {
    return (
      <TernSecureCtx.Provider value={contextValue}>
        <div>
          <span className="sr-only">Loading authentication state...</span>
        </div>
      </TernSecureCtx.Provider>
    )
  }

  return (
      <TernSecureCtx.Provider value={contextValue}>
       {children}
      </TernSecureCtx.Provider>
  )
}