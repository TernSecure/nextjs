"use client"

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { ternSecureAuth } from '../utils/client-init'
import { User, onAuthStateChanged } from "firebase/auth"
import { TernSecureCtx, TernSecureState, TernSecureCtxValue } from './TernSecureCtx'
import { useRouter } from 'next/navigation'
import { verifyTernIdToken } from '../app-router/server/sessionTernSecure'

interface TernSecureClientProviderProps {
  children: React.ReactNode;
  onUserChanged?: (user: User | null) => Promise<void>;
  loginPath?: string;
}

export function TernSecureClientProvider({ 
  children, 
  onUserChanged,
  loginPath = '/sign-in'
}: TernSecureClientProviderProps) {
  const auth = useMemo(() => ternSecureAuth, []);
  const router = useRouter();

  const [authState, setAuthState] = useState<TernSecureState>(() => ({
    userId: null,
    isLoaded: false,
    error: null,
    isValid: false,
    token: null
  }));

  const handleSignOut = useCallback(async (error?: Error) => {
    await auth.signOut();
    setAuthState({
      isLoaded: true,
      userId: null,
      error: error || null,
      isValid: false,
      token: null
    });
    router.push(loginPath);
  }, [auth, router, loginPath]);

  const checkTokenValidity = useCallback(async (user: User | null) => {
    if (user) {
      try {
        const token = await user.getIdToken(true);
        const decodedToken = await verifyTernIdToken(token);
        const isValid = decodedToken.valid

        if(isValid) {
          return { isValid: true, token, userId: user.uid };
        }
      } catch (error) {
        console.error('Token validation error:', error);
        await handleSignOut(error instanceof Error ? error : new Error('Authentication token is invalid'));
        return { isValid: false, token: null, userId: null };
      }
    }
    return { isValid: false, token: null, userId: null };
  }, [handleSignOut]);

  const handleAuthStateChange = useCallback(async (user: User | null) => {
    const { isValid, token, userId } = await checkTokenValidity(user);
    
    setAuthState({
      isLoaded: true,
      userId,
      isValid,
      token,
      error: null
    });

    if (onUserChanged) {
      await onUserChanged(user);
    }

    if (!isValid) {
      router.push(loginPath);
    }
  }, [checkTokenValidity, onUserChanged, router, loginPath]);

  useEffect(() => {
    const unsubscribeAuthState = onAuthStateChanged(auth, handleAuthStateChange);
    
    // Initial check
    handleAuthStateChange(auth.currentUser);

    // Set up an interval to periodically check token validity
    const intervalId = setInterval(() => {
      handleAuthStateChange(auth.currentUser);
    }, 30000); // Check every 30 seconds

    return () => {
      unsubscribeAuthState();
      clearInterval(intervalId);
    };
  }, [auth, handleAuthStateChange]);

  const contextValue: TernSecureCtxValue = useMemo(() => ({
    ...authState,
    checkTokenValidity: () => handleAuthStateChange(auth.currentUser),
    signOut: handleSignOut,
  }), [authState, handleAuthStateChange, auth, handleSignOut]);

  return (
    <TernSecureCtx.Provider value={contextValue}>
      {children}
    </TernSecureCtx.Provider>
  );
}