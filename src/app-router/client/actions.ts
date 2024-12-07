import { TernSecureAuth } from '../../utils/client-init'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { createSessionCookie } from '../server/sessionTernSecure'


export async function signInWithEmail(email: string, password: string){
  const auth = TernSecureAuth()
  try {
  const UserCredential = await signInWithEmailAndPassword(auth, email, password)
  const idToken = await UserCredential.user.getIdToken();

  const res = await createSessionCookie(idToken);

  if(res.success) {
    return { success: true, message: 'Connected.' };
  } else {
    throw new Error(res.message);
  }
} catch (error){
  const errorMessage = error instanceof Error ? error.message : 'Failed to sign in';
  throw new Error(errorMessage);
}
} 