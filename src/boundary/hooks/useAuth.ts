"use client"

import { getCurrentUser, useTernSecure } from '../TernSecureCtx'
import type { SignInResponse, TernSecureUser } from '../../types'


export function useAuth() {
  const {
    userId,
    isLoaded,
    error,
    isValid,
    isVerified,
    isAuthenticated,
    token,
    getAuthError,
    status,
    requiresVerification,
    signOut
  } = useTernSecure('useAuth')

  const user: TernSecureUser | null = getCurrentUser()
  const authResponse: SignInResponse = getAuthError()


  return {
    user,
    userId,
    isLoaded,
    error: authResponse.success ? null : authResponse,
    isValid,         // User is signed in
    isVerified,      // Email is verified
    isAuthenticated, // User is both signed in and verified
    token,
    status,
    requiresVerification,
    signOut
  }
}
