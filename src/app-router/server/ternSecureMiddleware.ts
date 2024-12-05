import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySessionCookie } from './sessionTernSecure'

const signIn = ['/sign-in']
const signUp = ['/sign-up']
const publicRoutes = [...signIn, ...signUp]


export async function ternSecureMiddleware(req: NextRequest) {
    const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname)

    //const token = req.cookies.get('_session_token')?.value
    const session = req.cookies.get('_session_cookie')?.value


  if (isPublicRoute) {
    return NextResponse.next();
  }

  if(session) {
    const {valid, uid} = await verifySessionCookie(session)

    if(!valid) {
        const response = NextResponse.redirect(new URL(signIn[0], req.url));
        response.cookies.delete('_session_cookie');
        return response;
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-uid', uid);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Allow all other requests (other subdomains)
  return NextResponse.next()
}
