'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { ternSecureAuth } from '../utils/client-init'
import { clearSessionCookie } from '../app-router/server/sessionTernSecure'
import { cn } from '../lib/utils'
import Link from 'next/link'

interface SignOutLinkProps {
  children?: React.ReactNode
  onError?: (error: Error) => void
  onSignOutSuccess?: () => void
  className?: string
  activeClassName?: string
  disabled?: boolean
}

export function SignOut({
  children = 'Sign out',
  onError,
  onSignOutSuccess,
  className,
  activeClassName,
  disabled = false,
}: SignOutLinkProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (disabled || isLoading) return

    setIsLoading(true)
    try {
      await signOut(ternSecureAuth)
      await clearSessionCookie()
      onSignOutSuccess?.()
      router.push('/sign-in')
    } catch (error) {
      console.error('Sign out error:', error)
      onError?.(error instanceof Error ? error : new Error('Failed to sign out'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Link
      href="#"
      onClick={handleSignOut}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary',
        disabled && 'pointer-events-none opacity-50',
        isLoading && 'pointer-events-none',
        className,
        isLoading && activeClassName
      )}
      aria-disabled={disabled || isLoading}
    >
      {isLoading ? 'Signing out...' : children}
    </Link>
  )
}