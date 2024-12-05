import React from "react"
import dynamic from "next/dynamic"

const TernSecureClientProvider = dynamic(
  () => import("../../boundary/TernSecureClientProvider").then(mod => mod.TernSecureClientProvider),
  { 
    ssr: false
   }
)

// Loading fallback component
/*function TernSecureLoadingFallback() {
  return (
    <div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}*/
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
export function TernSecureProvider({ children }: { children: React.ReactNode }) {
  return (
    <TernSecureClientProvider>
        {children}
    </TernSecureClientProvider>
  )
}