import { useTernSecure } from '../TernSecureCtx'

export function useAuth() {
  const authState = useTernSecure('useAuth')

  return {
    userId: authState.userId,
    isLoaded: authState.isLoaded,
    error: authState.error,
    isSignedIn: authState.isSignedIn
  }
}

