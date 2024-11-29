import { TernSecureAuth } from './index';
import { signInWithEmailAndPassword } from 'firebase/auth';
export async function signInWithEmail({ email, password }) {
    const auth = TernSecureAuth();
    return signInWithEmailAndPassword(auth, email, password);
}
//# sourceMappingURL=auth.js.map