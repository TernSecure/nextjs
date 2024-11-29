'use client'

import React, { createContext, useContext } from 'react'
import { TernSecureState } from '../../../types'

const createTernSecureContext = () => {
  const initialState: TernSecureState = {
    firebase: {
      initialized: false,
      error: null
    },
    auth: {
      user: null,
      loading: true,
      error: null,
      isSignedIn: false
    }
  }
  
  return createContext<[TernSecureState, React.Dispatch<React.SetStateAction<TernSecureState>>]>([initialState, () => {}])
}

// Create context instance only when imported on client
const TernSecureContext = createTernSecureContext()

const useTernSecure = (hookname?: string) => {
  const context = useContext(TernSecureContext)
  if (!context) {
    throw new Error(
      `${hookname} must be used within TernSecureProvider`)
  }
  return context
}

// Export initial state for reuse
export const initialState: TernSecureState = {
  firebase: {
    initialized: false,
    error: null
  },
  auth: {
    user: null,
    loading: true,
    error: null,
    isSignedIn: false
  }
}

export {
  TernSecureContext,
  useTernSecure
}