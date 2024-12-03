'use client'

import React, { useState, useEffect } from 'react'
import { TernSecureAuth } from '../../utils/client-init'
import { onAuthStateChanged } from "firebase/auth"
import { useInternalContext, TernSecureCtxProvider } from '../../boundary/TernSecureCtx'

export type TernSecureState = {
  userId: string | null
  loading: boolean
  error: string | null
  isSignedIn: boolean
}

export const AuthStateContext = React.createContext<TernSecureState | null>(null)

interface TernSecureClientProps {
  children: React.ReactNode
  initialState: TernSecureState
}

const auth = TernSecureAuth();

export function TernSecureClientProvider({ 
  children,
  initialState
 }: TernSecureClientProps) {
  const [authState, setAuthState] = useState<TernSecureState>(initialState)
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({
          loading: false,
          isSignedIn: true,
          userId: user.uid,
          error: null
        })
      } else {
        setAuthState({
          loading: false,
          isSignedIn: false,
          userId: null,
          error: null
        })
      }
    })
    
    return () => unsubscribe()
  }, [])


  return (
    <TernSecureCtxProvider>
      <AuthStateContext.Provider value={authState}>
      {children}
      </AuthStateContext.Provider>
    </TernSecureCtxProvider>
  )
}