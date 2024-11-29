'use client';
import React, { useState } from 'react';
import { initialState, TernSecureContext } from './ternSecureContext';
export function TernSecureClientProvider({ children }) {
    const stateAndUpdater = useState(initialState);
    return (React.createElement(TernSecureContext.Provider, { value: stateAndUpdater }, children));
}
//# sourceMappingURL=ternSecureClientProvider.js.map