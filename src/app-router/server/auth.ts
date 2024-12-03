import { TernSecureAuth } from '../../utils/client-init'
import { signInWithEmailAndPassword, type UserCredential } from 'firebase/auth'

export interface SignInCredentials {
  email: string
  password: string
}

export async function signInWithEmail({ 
  email, 
  password 
}: SignInCredentials): Promise<UserCredential> {
  const auth = TernSecureAuth()
  return signInWithEmailAndPassword(auth, email, password)
} 