import { cookies } from "next/headers"
import { verifyFirebaseToken } from "./jwt"
import type { NextRequest } from "next/server"

export interface UserInfo {
  uid: string
  email: string | null
  emailVerified?: boolean
  authTime?: number
  disabled?: boolean
}


export interface SessionResult {
  isAuthenticated: boolean
  user: UserInfo | null
  error?: string
}

export async function verifySession(request: NextRequest): Promise<SessionResult> {
  try {
    const cookieStore = await cookies()

    // First try session cookie
    const sessionCookie = cookieStore.get("_session_cookie")?.value
    if (sessionCookie) {
      const result = await verifyFirebaseToken(sessionCookie, true)
      if (result.valid) {
        return {
          isAuthenticated: true,
          user: {
            uid: result.uid ?? '',
            email: result.email || null,
            emailVerified: result.emailVerified ?? false,
            disabled: false,
          },
        }
      }
      console.log("Session cookie verification failed:", result.error)
    }

    // Then try ID token
    const idToken = cookieStore.get("_session_token")?.value
    if (idToken) {
      const result = await verifyFirebaseToken(idToken, false)
      if (result.valid) {
        return {
          isAuthenticated: true,
          user: {
            uid: result.uid ?? '',
            email: result.email || null,
            emailVerified: result.emailVerified ?? false,
            disabled: false,
          },
        }
      }
      console.log("ID token verification failed:", result.error)
    }

    return {
      isAuthenticated: false,
      user: null,
      error: "No valid session found",
    }
  } catch (error) {
    console.error("Session verification error:", error)
    return {
      isAuthenticated: false,
      user: null,
      error: error instanceof Error ? error.message : "Session verification failed",
    }
  }
}