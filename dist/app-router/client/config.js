export const loadFireConfig = () => ({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});
export const validateConfig = (config) => {
    Object.entries(config).forEach(([key, value]) => {
        if (!value) {
            throw new Error(`Missing environment variable: NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}`);
        }
    });
    return config;
};
//# sourceMappingURL=config.js.map