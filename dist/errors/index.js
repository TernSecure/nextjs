export const ERRORS = {
    SERVER_SIDE_INITIALIZATION: 'TernSecure must be initialized on the client side',
    NOT_INITIALIZED: 'TernSecure services are not initialized. Call initializeTernSecure() first',
    HOOK_CONTEXT: (hookName) => `${hookName} must be used within TernSecureProvider`,
};
export class TernSecureError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TernSecureError';
    }
}
//# sourceMappingURL=index.js.map