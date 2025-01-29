export const ERRORS = {
    SERVER_SIDE_INITIALIZATION: 'TernSecure must be initialized on the client side',
    REQUIRES_VERIFICATION: 'AUTH_REQUIRES_VERIFICATION',
    NOT_INITIALIZED: 'TernSecure services are not initialized. Call initializeTernSecure() first',
    HOOK_CONTEXT: (hookName: string) => `${hookName} must be used within TernSecureProvider`,
  } as const;
  
  export class TernSecureError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'TernSecureError';
    }
  }