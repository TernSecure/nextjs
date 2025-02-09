import { type NextRequest, NextResponse } from 'next/server';
import type { UserInfo } from './types'

export const runtime = "edge"

interface Auth {
  user: UserInfo | null
  sessionId : string | null
  protect: () => Promise<void>
}

type MiddlewareCallback = (
  auth: Auth,
  request: NextRequest
) => Promise<void>


/**
 * Create a route matcher function for public paths
 */
export function createRouteMatcher(patterns: string[]) {
  return (request: NextRequest): boolean => {
    const { pathname } = request.nextUrl
    return patterns.some((pattern) => {
      // Convert route pattern to regex
      const regexPattern = new RegExp(`^${pattern.replace(/\*/g, ".*").replace(/$$(.*)$$/, "(?:$1)?")}$`)
      return regexPattern.test(pathname)
    })
  }
}


/**
 * Middleware factory that handles authentication and custom logic
 * @param customHandler Optional function for additional custom logic
 */

export function ternSecureMiddleware(callback: MiddlewareCallback) {
  return async function middleware(request: NextRequest) {
    try {

      const hasCookies = request.cookies.has('_session_cookie') || request.cookies.has('_session_token')

      const auth: Auth = {
        user: null,
        sessionId: null,
        protect: async () => {
          if (!hasCookies) {
            const currentPath = request.nextUrl.pathname
            if (currentPath !== '/sign-in') {
              const redirectUrl = new URL('/sign-in', request.url)
              redirectUrl.searchParams.set('redirect', currentPath)
              throw new Error("UNAUTHENTICATED")
            }
          }
        },
      }

    //if (!callback) {
    //    return NextResponse.next()
    //  }

    if (callback){
      try {
        await callback(auth, request)
      } catch (error) {
        // Handle authentication errors
        if (error instanceof Error && error.message === "UNAUTHENTICATED") {
          const redirectUrl = new URL("/sign-in", request.url)
          redirectUrl.searchParams.set("redirect", request.nextUrl.pathname)
          return NextResponse.redirect(redirectUrl)
        }
        // Re-throw other errors
        throw error
      }
    }

      // Continue to the next middleware or route handler
      const response = NextResponse.next()

      // Clean up response
      response.headers.delete("x-middleware-next")

      return response
    } catch (error) {
      console.error("Middleware error:", error)
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }
}