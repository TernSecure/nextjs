
//import { TernSecureServerProvider } from './app-router/server/TernSecureServerProvider'
//import type { TernSecureState } from './app-router/client/TernSecureProvider'
export { TernSecureAuth, TernSecureFirestore, ternSecureAuth } from './utils/client-init'
export { loadFireConfig, validateConfig } from './utils/config'
export { signInWithEmail } from './app-router/client/actions'
//export { useInternalContext } from './boundary/TernSecureCtx'
//export { TernSecureClientProvider } from './app-router/client/TernSecureProvider'
export { TernSecureProvider } from './app-router/client/TernSecureProvider'
export { useAuth } from './boundary/hooks/useAuth' 
export { useUser } from './boundary/hooks/useUser'
export { SignIn } from './components/sign-in'
export { SignOut } from './components/sign-out'

//export const TernSecureProvider = TernSecureServerProvider
//export type { TernSecureState }