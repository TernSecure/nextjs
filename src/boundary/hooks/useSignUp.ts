"use client"

import { useTernSecure } from '../TernSecureCtx'

export function useSignUp() {
  const {
    email,
    setEmail
  } = useTernSecure('useSignUp')

  return {
    email, 
    setEmail
  }
}
