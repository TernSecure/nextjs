import { type UserCredential } from 'firebase/auth';
export interface SignInCredentials {
    email: string;
    password: string;
}
export declare function signInWithEmail({ email, password }: SignInCredentials): Promise<UserCredential>;
