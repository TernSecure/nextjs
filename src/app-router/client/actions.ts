import { TernSecureAuth } from '../../utils/client-init'
import { signInWithEmailAndPassword, signInWithRedirect, getRedirectResult, GoogleAuthProvider, OAuthProvider, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { ERRORS } from '../../errors'

export interface SignInResponse {
  success: boolean;
  message?: string;
  error?: typeof ERRORS[keyof typeof ERRORS];
  user?: any;
}

export async function createUser(email: string, password: string) {
  const auth = TernSecureAuth()
  try {
    
    const actionCodeSettings = {
      url: `${window.location.origin}/sign-in`,
      handleCodeInApp: true
    };

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await sendEmailVerification(userCredential.user, actionCodeSettings)
    
    return { success: true, message: 'Account created successfully.', user: userCredential.user };

  } catch (error) {
    // Handle specific Firebase auth errors
    if (error instanceof Error) {
      switch (error.message) {
        case 'auth/too-many-requests':
          throw new Error('Too many attempts. Please try again later.');
        case 'auth/network-request-failed':
            throw new Error('Network disconnected. Please try again later.');
        case 'auth/email-already-in-use':
          throw new Error('Email is already registered.');
        case 'auth/invalid-email':
          throw new Error('Invalid email address.');
        case 'auth/operation-not-allowed':
          throw new Error('Email/password accounts are not enabled.');
        case 'auth/weak-password':
          throw new Error('Password is too weak.');
        default:
          throw new Error(error.message);
      }
    }
    throw new Error('Failed to create account');
  }
}


export async function signInWithEmail(email: string, password: string): Promise<SignInResponse> {
  const auth = TernSecureAuth()
  try {
  const UserCredential = await signInWithEmailAndPassword(auth, email, password)
  const user = UserCredential.user
  return { 
      success: true, 
      message: 'Authentication successful',
      user: UserCredential.user,
      error: !user.emailVerified ? ERRORS.REQUIRES_VERIFICATION : undefined
    };
  
} catch (error){
  const errorMessage = error instanceof Error ? error.message : 'Failed to sign in';
  throw new Error(errorMessage);
}
} 

export async function signInWithRedirectGoogle() {
  const auth = TernSecureAuth()
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
    login_hint: 'user@example.com',
    prompt: 'select_account'
  })

  try {
    await signInWithRedirect(auth, provider)
    return { success: true, message: 'Redirect initiated' }
  } catch (error) {
    console.error('Error during Google sign-in:', error)
    return { success: false, error: 'Failed to sign in with Google' }
  }
}


export async function signInWithMicrosoft() {
  const auth = TernSecureAuth()
  const provider = new OAuthProvider('microsoft.com')
  provider.setCustomParameters({
    prompt: 'consent'
  })

  try {
    await signInWithRedirect(auth, provider)
    return { success: true, message: 'Redirect initiated' }
  } catch (error) {
    console.error('Error during Google sign-in:', error)
    return { success: false, error: 'Failed to sign in with Google' }
  }
}


export async function handleAuthRedirectResult() {
  const auth = TernSecureAuth()
  try {
    const result = await getRedirectResult(auth)
    if (result) {
      const user = result.user
      return { success: true, user }
    } else {
      return { success: false, error: 'No redirect result' }
    }
  } catch (error: any) {
    console.error('Error handling auth redirect result:', error)
    return { success: false, error: error.message || 'Failed to handle auth redirect', code: error.code }
  }
}


export async function resendEmailVerification() {
  const auth = TernSecureAuth()
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user found. Please try signing up again.');
    }

    await user.reload();

    if (user.emailVerified) {
      return { 
        success: true, 
        message: 'Email is already verified. You can sign in.',
        isVerified: true 
      };
    }

    const actionCodeSettings = {
      url: `${window.location.origin}/sign-in`,
      handleCodeInApp: true,
    };

    await sendEmailVerification(user, actionCodeSettings);
    return { 
      success: true, 
      message: 'Verification email sent successfully.',
      isVerified: false
     };
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case 'auth/too-many-requests':
            throw new Error('Too many attempts. Please try again later.');
          case 'auth/network-request-failed':
              throw new Error('Network disconnected. Please try again later.');
          case 'auth/email-already-in-use':
            throw new Error('Email is already registered.');
          case 'auth/invalid-email':
            throw new Error('Invalid email address.');
          case 'auth/operation-not-allowed':
            throw new Error('Email/password accounts are not enabled.');
          case 'auth/weak-password':
            throw new Error('Password is too weak.');
          default:
            throw new Error(error.message);
        }
      }
      throw new Error('Failed to resend verification email.');
    }
}