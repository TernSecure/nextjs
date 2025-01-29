"use client"

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { ternSecureAuth } from '../utils/client-init'
import { onAuthStateChanged, User } from "firebase/auth"
import { TernSecureCtx, TernSecureCtxValue } from './TernSecureCtx'
import { type TernSecureState } from '../types'
import { useRouter } from 'next/navigation'

interface TernSecureClientProviderProps {
  children: React.ReactNode;
  onUserChanged?: (user: User | null) => Promise<void>;
  loginPath?: string;
  loadingComponent?: React.ReactNode;
}

export function TernSecureClientProvider({ 
  children, 
  loginPath = '/sign-in',
  loadingComponent
}: TernSecureClientProviderProps) {
  const auth = useMemo(() => ternSecureAuth, []);
  const router = useRouter();
  const [authState, setAuthState] = useState<TernSecureState>(() => ({
    userId: null,
    isLoaded: false,
    error: null,
    isValid: false,
    isVerified: false,
    isAuthenticated: false,
    token: null,
    email: null,
  }));

  const handleSignOut = useCallback(async (error?: Error) => {
    await auth.signOut();
    setAuthState({
      isLoaded: true,
      userId: null,
      error: error || null,
      isValid: false,
      token: null,
      email: null,
      isVerified: false,
      isAuthenticated: false,
    });
    router.push(loginPath);
  }, [auth, router, loginPath]);

  const setEmail = useCallback((email: string) => {
    setAuthState((prev) => ({
      ...prev,
      email,
    }))
  }, [])

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        const isValid = !!user.uid;
        const isVerified = user.emailVerified;
        setAuthState({
          isLoaded: true,
          userId: user.uid,
          isValid,
          isVerified,
          isAuthenticated: isValid && isVerified,
          token: user.getIdToken(),
          error: null,
          email: user.email,
        })
      } else {
        setAuthState({
          isLoaded: true,
          userId: null,
          isValid: false,
          isVerified: false,
          isAuthenticated: false,
          token: null,
          error: new Error('User is not authenticated'),
          email: null,
        })
        if (!window.location.pathname.includes("/sign-up")) {
          router.push(loginPath)
        }
      }
    }, (error) => {
      handleSignOut(error instanceof Error ? error : new Error('Authentication error occurred'));
    })
    
    return () => unsubscribe()
  }, [auth, handleSignOut, router, loginPath])

  const contextValue: TernSecureCtxValue = useMemo(() => ({
    ...authState,
    signOut: handleSignOut,
    setEmail
  }), [authState, auth, handleSignOut, setEmail]);

  if (!authState.isLoaded) {
    return (
      <TernSecureCtx.Provider value={contextValue}>
        {loadingComponent || (
          <div aria-live="polite" aria-busy="true">
            <span className="sr-only">Loading authentication state...</span>
          </div>
        )}
      </TernSecureCtx.Provider>
    );
  }

  return (
      <TernSecureCtx.Provider value={contextValue}>
       {children}
      </TernSecureCtx.Provider>
  )
}