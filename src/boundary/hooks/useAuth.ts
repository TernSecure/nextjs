"use client"

import { useTernSecure } from '../TernSecureCtx'
import {  User } from 'firebase/auth'
import { TernSecureUser } from '../TernSecureCtx'

export function useAuth() {
  const {
    userId,
    isLoaded,
    error,
    isValid,
    isVerified,
    isAuthenticated,
    token,
    signOut
  } = useTernSecure('useAuth')

  const user: User | null = TernSecureUser()

  const getAuthError = () => {
    if (error) return error
    if (isValid && !isVerified) {
      return new Error('Email verification required')
    }
    return null
  }

  return {
    user,
    userId,
    isLoaded,
    error: getAuthError(),
    isValid,         // User is signed in
    isVerified,      // Email is verified
    isAuthenticated, // User is both signed in and verified
    token,
    signOut
  }
}
