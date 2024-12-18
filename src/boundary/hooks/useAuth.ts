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
    token,
    signOut
  } = useTernSecure('useAuth')

  const user: User | null = TernSecureUser()

  return {
    user,
    userId,
    isLoaded,
    error,
    isAuthenticated: isValid,
    token,
    signOut
  }
}
