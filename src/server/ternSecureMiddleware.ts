import { type NextRequest, NextResponse } from 'next/server';
import type { UserInfo } from './types'
import { TernSecureError } from '../errors';



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
    return patterns.some(pattern => {
      // Convert route pattern to regex
      const regexPattern = new RegExp(
        `^${pattern.replace(/\*/g, '.*').replace(/\((.*)\)/, '(?:$1)?')}$`
      )
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
              throw new TernSecureError('UNAUTHENTICATED', redirectUrl.toString())
            } else {
              throw new Error('UNAUTHENTICATED')
            }
          }
        }
      }

      if (!callback) {
        return NextResponse.next()
      }



      try {
        await callback(auth, request)
        return NextResponse.next()
      } catch (error) {
        if (error instanceof Error && error.message === 'Unauthorized access') {
          console.log('middleware: Unauthorized access, redirecting to sign-in')
          return NextResponse.redirect(error.message)
        }
        throw error
      }

    } catch (error) {
      console.error("Middleware error:", {
        error:
          error instanceof Error
            ? {
                name: error.name,
                message: error.message,
                stack: error.stack,
              }
            : error,
        path: request.nextUrl.pathname,
      })

      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }
}