'use client';
import { useEffect } from 'react';
import { TernSecureAuth } from '../app-router/client';
import { useTernSecure } from '../app-router/client/';
export function useAuth() {
    const [state, setState] = useTernSecure('useAuth');
    useEffect(() => {
        try {
            const auth = TernSecureAuth(); // This initializes Firebase
            setState(prev => ({
                ...prev,
                firebase: {
                    initialized: true,
                    error: null
                }
            }));
            const unsubscribe = auth.onAuthStateChanged((user) => {
                setState(prev => ({
                    ...prev,
                    auth: {
                        user,
                        loading: false,
                        error: null,
                        isSignedIn: !!user
                    }
                }));
            }, (error) => {
                setState(prev => ({
                    ...prev,
                    auth: {
                        user: null,
                        loading: false,
                        error,
                        isSignedIn: false
                    }
                }));
            });
            return () => unsubscribe();
        }
        catch (error) {
            setState(prev => ({
                ...prev,
                firebase: {
                    initialized: false,
                    error: error
                },
                auth: {
                    user: null,
                    loading: false,
                    error: error,
                    isSignedIn: false
                }
            }));
        }
    }, []); // Only run once on mount
    return state.auth;
}
//# sourceMappingURL=useAuth.js.map