"use client"

import { useCallback } from 'react'
import { useTernSecure } from '../TernSecureCtx'
import { User } from 'firebase/auth'
import { TernSecureUser } from '../TernSecureCtx'

export function useAuth() {
  const {
    userId,
    isLoaded,
    error,
    isValid,
    token,
    checkTokenValidity,
    signOut
  } = useTernSecure('useAuth')

  const user: User | null = TernSecureUser()

  const refreshToken = useCallback(async () => {
    await checkTokenValidity()
  }, [checkTokenValidity])

  return {
    user,
    userId,
    isLoaded,
    error,
    isAuthenticated: isValid,
    token,
    refreshToken,
    signOut
  }
}
