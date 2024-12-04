import { TernSecureAuth } from '../../utils/client-init'
import { signInWithEmailAndPassword } from 'firebase/auth'

//export interface SignInCredentials {
  //email: string
  //password: string
//}

export async function signInWithEmail(email: string, password: string){
  const auth = TernSecureAuth()
  const UserCredential = await signInWithEmailAndPassword(auth, email, password)
  return UserCredential.user
} 