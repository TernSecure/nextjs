//import { TernSecureServerProvider } from './app-router/server/TernSecureServerProvider'
//import type { TernSecureState } from './app-router/client/TernSecureProvider'
export { TernSecureAuth, TernSecureFirestore } from './utils/client-init'
export { loadFireConfig, validateConfig } from './utils/config'
export { signInWithEmail } from './app-router/client/auth'
//export { useInternalContext } from './boundary/TernSecureCtx'
//export { TernSecureClientProvider } from './app-router/client/TernSecureProvider'
export { TernSecureProvider } from './app-router/client/TernSecureProvider'
export { useAuth } from './boundary/hooks/useAuth' 
export { SignIn } from './components/sign-in'

//export const TernSecureProvider = TernSecureServerProvider
//export type { TernSecureState }