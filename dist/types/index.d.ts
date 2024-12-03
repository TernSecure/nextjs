import { TernSecureServerProvider } from './app-router/server/TernSecureServerProvider';
import type { TernSecureState } from './app-router/client/TernSecureProvider';
export { TernSecureAuth, TernSecureFirestore } from './utils/client-init';
export { loadFireConfig, validateConfig } from './utils/config';
export { signInWithEmail } from './app-router/server/auth';
export { useAuth } from './boundary/hooks/useAuth';
export { SignIn } from './components/sign-in';
export declare const TernSecureProvider: typeof TernSecureServerProvider;
export type { TernSecureState };
//# sourceMappingURL=index.d.ts.map