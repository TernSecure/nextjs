'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { signInWithEmail, signInWithRedirectGoogle, signInWithMicrosoft } from '../app-router/client/actions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Alert, AlertDescription } from "./ui/alert"
import { Separator } from "./ui/separator"
import { cn } from "../lib/utils"
import { Loader2 } from 'lucide-react'
import { getRedirectResult } from 'firebase/auth'
import { ternSecureAuth } from '../utils/client-init'
import { createSessionCookie } from '../app-router/server/sessionTernSecure'
import { AuthBackground } from './background'
import { getValidRedirectUrl } from '../utils/construct'

const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;


export interface SignInProps {
  redirectUrl?: string
  onError?: (error: Error) => void
  onSuccess?: () => void
  className?: string
  customStyles?: {
    card?: string
    input?: string
    button?: string
    label?: string
    separator?: string
    title?: string
    description?: string
    socialButton?: string
  }
}

export function SignIn({
  redirectUrl,
  onError,
  onSuccess,
  className,
  customStyles = {}
}: SignInProps) {
  const [loading, setLoading] = useState(false)
  const [checkingRedirect, setCheckingRedirect] = useState(true)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const searchParams = useSearchParams()
  const isRedirectSignIn = searchParams.get('signInRedirect') === 'true'


  const handleRedirectResult = useCallback(async () => {
    if (!isRedirectSignIn) return false
    setCheckingRedirect(true)
    try {
      console.log('Checking redirect result...');
      console.log('Current hostname:', window.location.hostname);
      console.log('Auth domain hostname:', authDomain);

    const isOnAuth = authDomain && 
    window.location.hostname === authDomain.replace(/https?:\/\//, '');
    console.log('Is on  AuthDomain:', isOnAuth);


      const result = await getRedirectResult(ternSecureAuth)
      console.log('Redirect result:', result);
      if (result) {
        const idToken = await result.user.getIdToken()
        const sessionResult = await createSessionCookie(idToken)
        if (!sessionResult.success) {
          throw new Error('Failed to create session')
        }
        const storedRedirectUrl = sessionStorage.getItem('auth_return_url')
        sessionStorage.removeItem('auth_redirect_url') 
        onSuccess?.()
        window.location.href = storedRedirectUrl || getValidRedirectUrl(redirectUrl, searchParams)
        return true
      }
      setCheckingRedirect(false)
    } catch (err) {
      console.error('Redirect result error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed'
      setError(errorMessage)
      onError?.(err instanceof Error ? err : new Error(errorMessage))
      sessionStorage.removeItem('auth_redirect_url')
      return false
    }
  }, [isRedirectSignIn, redirectUrl, searchParams, onSuccess, onError])

 ///const REDIRECT_TIMEOUT = 5000;

  useEffect(() => {
    //let timeoutId: NodeJS.Timeout;

    if (isRedirectSignIn) {
      handleRedirectResult();

      /*timeoutId = setTimeout(() => {
        console.warn('Redirect check timed out');
      setCheckingRedirect(false);
      setError('Sign in took too long. Please try again.');
        
    }, REDIRECT_TIMEOUT);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }*/
    };
  }, [handleRedirectResult, isRedirectSignIn])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await signInWithEmail(email, password)
      if (user.success) {
        onSuccess?.()
        window.location.href = getValidRedirectUrl(redirectUrl, searchParams)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in'
      setError(errorMessage)
      onError?.(err instanceof Error ? err : new Error('Failed to sign in'))
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignIn = async (provider: 'google' | 'microsoft') => {
    setLoading(true)
    try {

      const validRedirectUrl = getValidRedirectUrl(redirectUrl, searchParams)
      sessionStorage.setItem('auth_redirect_url', validRedirectUrl)

      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.set('signInRedirect', 'true')
      window.history.replaceState({}, '', currentUrl.toString())

      const result = provider === 'google' ? await signInWithRedirectGoogle() : await signInWithMicrosoft()
      if (!result.success) {
        throw new Error(result.error)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to sign in with ${provider}`
      setError(errorMessage)
      onError?.(err instanceof Error ? err : new Error(`Failed to sign in with ${provider}`))
      setLoading(false)
      sessionStorage.removeItem('auth_redirect_url')
    }
  }

  if (checkingRedirect && isRedirectSignIn) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex items-center justify-center">
      <AuthBackground />
    <Card className={cn("w-full max-w-md mx-auto mt-8", className, customStyles.card)}>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className={cn("font-bold", customStyles.title)}>Sign in to TernSecure</CardTitle>
        <CardDescription className={cn("text-muted-foreground", customStyles.description)}>
          Please sign in to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className={cn(customStyles.label)}>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className={cn(customStyles.input)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className={cn(customStyles.label)}>Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className={cn(customStyles.input)}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className={cn("w-full", customStyles.button)}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
        <div className="relative">
          <Separator className={cn(customStyles.separator)} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-background px-2 text-muted-foreground text-sm">Or continue with</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            disabled={loading} 
            onClick={() => handleSocialSignIn('google')} 
            className={cn("flex items-center justify-center", customStyles.socialButton)}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </Button>
          <Button 
            variant="outline" 
            disabled={loading} 
            onClick={() => handleSocialSignIn('microsoft')} 
            className={cn("flex items-center justify-center", customStyles.socialButton)}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
              <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
              <path fill="#f35325" d="M1 1h10v10H1z"/>
              <path fill="#81bc06" d="M12 1h10v10H12z"/>
              <path fill="#05a6f0" d="M1 12h10v10H1z"/>
              <path fill="#ffba08" d="M12 12h10v10H12z"/>
            </svg>
            Microsoft
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
          <a href="#" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
    </div>
  )
}

