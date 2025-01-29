'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { Button, type ButtonProps } from './ui/button'
import { ternSecureAuth } from '../utils/client-init'
import { clearSessionCookie } from '../app-router/server/sessionTernSecure'
import { cn } from '../lib/utils'

type SignOutCustomProps = {
  children?: React.ReactNode
  onError?: (error: Error) => void
  onSignOutSuccess?: () => void
  className?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}

type SignOutProps = Omit<ButtonProps, 'onClick'> & SignOutCustomProps

export function SignOutButton({ 
  children = 'Sign out', 
  onError,
  onSignOutSuccess,
  className,
  variant = 'outline',
  size = 'default',
  ...buttonProps 
}: SignOutProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      // Sign out from Firebase
      await signOut(ternSecureAuth)
    
      await clearSessionCookie()
      
      // Call success callback if provided
      onSignOutSuccess?.()
      
      // Redirect to sign-in page
      router.push('/sign-in') //todo: singout and include a redirect URl
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

