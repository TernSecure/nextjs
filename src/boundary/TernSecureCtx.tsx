"use client"

import { createContext, useContext } from 'react'

// Core types
export interface TernSecureState {
  userId: string | null
  isLoaded: boolean
  error: Error | null;
  isSignedIn: boolean
}

export type TernSecureCtxValue = TernSecureState


export const TernSecureCtx = createContext<TernSecureCtxValue | null>(null)

// Set display name for better debugging
TernSecureCtx.displayName = 'TernSecureCtx'

export const useTernSecure = (hookName: string) => {
  const context = useContext(TernSecureCtx)
  
  if (!context) {
    throw new Error(
      `${hookName} must be used within TernSecureProvider`
    )
  }

  return context
}

