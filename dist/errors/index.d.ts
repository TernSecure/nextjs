export declare const ERRORS: {
    readonly SERVER_SIDE_INITIALIZATION: "TernSecure must be initialized on the client side";
    readonly NOT_INITIALIZED: "TernSecure services are not initialized. Call initializeTernSecure() first";
    readonly HOOK_CONTEXT: (hookName: string) => string;
};
export declare class TernSecureError extends Error {
    constructor(message: string);
}
