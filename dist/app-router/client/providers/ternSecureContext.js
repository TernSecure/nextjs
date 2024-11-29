'use client';
import { createContext, useContext } from 'react';
const createTernSecureContext = () => {
    const initialState = {
        firebase: {
            initialized: false,
            error: null
        },
        auth: {
            user: null,
            loading: true,
            error: null,
            isSignedIn: false
        }
    };
    return createContext([initialState, () => { }]);
};
// Create context instance only when imported on client
const TernSecureContext = createTernSecureContext();
const useTernSecure = (hookname) => {
    const context = useContext(TernSecureContext);
    if (!context) {
        throw new Error(`${hookname} must be used within TernSecureProvider`);
    }
    return context;
};
// Export initial state for reuse
export const initialState = {
    firebase: {
        initialized: false,
        error: null
    },
    auth: {
        user: null,
        loading: true,
        error: null,
        isSignedIn: false
    }
};
export { TernSecureContext, useTernSecure };
//# sourceMappingURL=ternSecureContext.js.map