import { useTernSecure } from '../TernSecureCtx'

export function useAuth() {
  const authState = useTernSecure('useAuth')

  return {
    user: authState.user,
    isLoaded: authState.isLoaded,
    error: authState.error
  }
}

