"use client"

import { createContext, useContext } from 'react'
import { User } from 'firebase/auth'


// Core types
export interface TernSecureState {
  user: User | null;
  isLoaded: boolean
  error: Error | null;
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

