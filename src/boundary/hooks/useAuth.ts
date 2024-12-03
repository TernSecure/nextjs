'use client'

import { useContext } from 'react'
import { useInternalContext } from '../../boundary/TernSecureCtx'
import { AuthStateContext, type TernSecureState } from '../../app-router/client/TernSecureProvider'

export function useAuth(): TernSecureState {
  // Verify we're within the provider boundary
  useInternalContext('useAuth')
  
  // Get the auth state from the AuthStateContext
  const authState = useContext(AuthStateContext)
  if (!authState) {
    throw new Error('Auth state not found')
  }


    return {
    userId: authState.userId,
    loading: authState.loading,
    error: authState.error,
    isSignedIn: authState.isSignedIn
  }
}