'use server'

import { cookies } from 'next/headers';
import { adminTernSecureAuth as adminAuth } from '../../utils/admin-init';


export interface User {
    uid: string;
    email: string;
  }

export interface Session {
    user: User | null;
    token: string | null;
    error: Error | null;
}

export async function createSessionCookie(idToken: string) {
  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

      const cookieStore = await cookies();
      cookieStore.set('_session_cookie', sessionCookie, {
          maxAge: expiresIn,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
      });
      return { success: true, message: 'Session created' };
  } catch (error) {
      return { success: false, message: 'Failed to create session' };
  }
}



export async function getServerSessionCookie() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('_session_cookie')?.value;

  if (!sessionCookie) {
    throw new Error('No session cookie found')
  }
    
  try {
    const decondeClaims = await adminAuth.verifySessionCookie(sessionCookie)
    return {
      token: sessionCookie,
      userId: decondeClaims.uid
    }
  } catch (error) {
    console.error('Error verifying session:', error)
    throw new Error('Invalid Session')
  }
}


export async function getIdToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('_session_token')?.value;

  if (!token) {
    throw new Error('No session cookie found')
  }
    
  try {
    const decodedClaims = await adminAuth.verifyIdToken(token)
    return {
      token: token,
      userId: decodedClaims.uid
    }
  } catch (error) {
    console.error('Error verifying session:', error)
    throw new Error('Invalid Session')
  }
}

export async function setServerSession(token: string) {
    const cookieStore = await cookies();
    cookieStore.set('_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });
  }

  export async function verifyIDToken(token: string){
    try {
      const res = await adminAuth.verifyIdToken(token);
      if (res) {
        return { valid: true, uid: res.uid };
      } else {
        return { valid: false, error: 'Invalid token'};
      }
    } catch (error) {
      return {error: error, valid: false}
    }
  }

  export async function verifySessionCookie(session: string): Promise<{ valid: boolean; uid?: any; error?: any }>{
    try {
      const res = await adminAuth.verifySessionCookie(session);
      if (res) {
        return { valid: true, uid: res.uid };
      } else {
        return { valid: false, error: 'Invalid session'};
      }
    } catch (error) {
      return {error: error, valid: false}
    }
  }



/*
  export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value
  
    if (!sessionCookie) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 })
    }
  
    try {
      const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
      return NextResponse.json({ isAuthenticated: true, user: decodedClaims }, { status: 200 })
    } catch (error) {
      console.error('Error verifying session cookie:', error)
      return NextResponse.json({ isAuthenticated: false }, { status: 401 })
    }
  }

*/