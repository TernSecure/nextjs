import { jwtVerify, createRemoteJWKSet } from "jose"

// Firebase public key endpoints with simplified configuration for Edge
const JWKS_URLS = {
  session: new URL("https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"),
  token: new URL("https://identitytoolkit.googleapis.com/v1/sessionCookiePublicKeys")
}

// Simplified JWKS for Edge Runtime
const JWKS = {
    session: createRemoteJWKSet(new URL(JWKS_URLS.session), {
      cacheMaxAge: 3600000, // 1 hour
      timeoutDuration: 5000, // 5 seconds
      cooldownDuration: 30000, // 30 seconds between retries
    }),
    token: createRemoteJWKSet(new URL(JWKS_URLS.token), {
      cacheMaxAge: 3600000, // 1 hour
      timeoutDuration: 5000, // 5 seconds
      cooldownDuration: 30000, // 30 seconds between retries
    })
  }

export async function verifyFirebaseToken(token: string, isSessionCookie = false) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    if (!projectId) {
      throw new Error("Firebase Project ID is not configured")
    }

    const keySet = isSessionCookie ? JWKS.session : JWKS.token


    const { payload } = await jwtVerify(token, keySet, {
      issuer: isSessionCookie
        ? "https://session.firebase.google.com/" + projectId
        : "https://securetoken.google.com/" + projectId,
      audience: projectId,
      algorithms: ["RS256"],
    })

    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp <= now) {
      throw new Error("Token has expired")
    }

    if (payload.iat && payload.iat > now) {
      throw new Error("Token issued time is in the future")
    }

    if (!payload.sub) {
      throw new Error("Token subject is empty")
    }

    return {
      valid: true,
      uid: payload.sub,
      email: payload.email as string | undefined,
      emailVerified: payload.email_verified as boolean | undefined,
      authTime: payload.auth_time as number,
    }
  } catch (error) {
    console.error("Token verification error:", error)
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Invalid token",
    }
  }
}