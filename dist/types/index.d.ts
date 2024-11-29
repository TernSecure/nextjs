import type { ReactNode } from 'react';
import { User, Auth } from 'firebase/auth';
export interface TernSecureConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}
export interface TernSecureOptions {
    environment?: 'development' | 'production';
    region?: string;
}
export interface FirebaseState {
    initialized: boolean;
    error: Error | null;
}
export interface TernSecureState {
    firebase: FirebaseState;
    auth: AuthState;
}
export interface AuthState {
    user: User | null;
    loading: boolean;
    error: Error | null;
    isSignedIn: boolean;
}
export interface TernSecureContextValue {
    _contextKey: symbol;
    authState: AuthState;
    auth: Auth;
}
export interface TernSecureContextType {
    authState: AuthState;
}
export interface TernSecureProviderProps {
    children: ReactNode;
}
