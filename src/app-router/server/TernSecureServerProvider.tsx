import React from "react"
import { TernSecureClientProvider, TernSecureState } from "../client/TernSecureProvider"



// Loading fallback component
function TernSecureLoadingFallback() {
  return (
    <div 
      aria-label="Loading authentication" 
      role="status"
      className="tern-secure-loading"
    >
      <span className="sr-only">Loading authentication...</span>
    </div>
  )
}

interface TernSecureServerProviderProps {
  children: React.ReactNode
}

/**
 * Root Provider for TernSecure
 * Use this in your Next.js App Router root layout
 * Automatically handles client/server boundary and authentication state
 * 
 * @example
 * // app/layout.tsx
 * import { TernSecureProvider } from '@tern/secure'
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <TernSecureProvider>
 *           {children}
 *         </TernSecureProvider>
 *       </body>
 *     </html>
 *   )
 * }
 */
export async function TernSecureServerProvider({ 
  children 
}: TernSecureServerProviderProps) {
  const initialState: TernSecureState = {
    loading: true,
    isSignedIn: false,
    userId: null,
    error: null
  }

  return (
    <React.Suspense fallback={<TernSecureLoadingFallback />}>
       {/* Add use client directive */}
      <TernSecureClientProvider initialState={initialState}>
        {children}
      </TernSecureClientProvider>
    </React.Suspense>
  )
}

// Export types for internal use
export type { TernSecureServerProviderProps }