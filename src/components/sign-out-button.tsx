'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { Button, type ButtonProps } from './ui/button'
import { ternSecureAuth } from '../utils/client-init'
import { clearSessionCookie } from '../app-router/server/sessionTernSecure'
import { cn } from '../lib/utils'

type SignOutCustomProps = {
  children?: React.ReactNode
  onError?: (error: Error) => void
  onSignOutSuccess?: () => void
  redirectPath?: string
  className?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}

type SignOutProps = Omit<ButtonProps, 'onClick'> & SignOutCustomProps

export function SignOutButton({ 
  children = 'Sign out', 
  onError,
  onSignOutSuccess,
  redirectPath,
  className,
  variant = 'outline',
  size = 'default',
  ...buttonProps 
}: SignOutProps) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const loginPath = process.env.NEXT_PUBLIC_LOGIN_PATH || '/sign-in'

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      // Sign out from Firebase
      await signOut(ternSecureAuth)
    
      await clearSessionCookie()
      
      // Call success callback if provided
      onSignOutSuccess?.()

      // Build the login URL with redirect
      const redirectUrl = redirectPath || pathname

      // Ensure we're not redirecting to the login page itself
      if (redirectUrl && !redirectUrl.startsWith(loginPath)) {
        // Use URLSearchParams to properly encode the parameters
        const searchParams = new URLSearchParams({
          redirect_url: redirectUrl
        }).toString()
        
        // Construct the full URL with encoded parameters
        const fullLoginPath = `${loginPath}?${searchParams}`
        
        // Use window.location for a full page navigation that preserves the query parameters
        window.location.href = fullLoginPath
      } else {
        // If no redirect or redirecting to login, just go to login
        window.location.href = loginPath
      }
    } catch (error) {
      console.error('Sign out error:', error)
      onError?.(error instanceof Error ? error : new Error('Failed to sign out'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSignOut}
      disabled={isLoading}
      className={cn("", className)}
      {...buttonProps}
    >
      {isLoading ? 'Signing out...' : children}
    </Button>
  )
}

