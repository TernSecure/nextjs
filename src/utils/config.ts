import { TernSecureConfig, ConfigValidationResult } from '../types'

/**
 * Loads Firebase configuration from environment variables
 * @returns {TernSecureConfig} Firebase configuration object
 */
export const loadFireConfig = (): TernSecureConfig => ({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || undefined,
})

/**
 * Validates Firebase configuration
 * @param {TernSecureConfig} config - Firebase configuration object
 * @throws {Error} If required configuration values are missing
 * @returns {TernSecureConfig} Validated configuration object
 */
export const validateConfig = (config: TernSecureConfig): ConfigValidationResult => {
  const requiredFields: (keyof TernSecureConfig)[] = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ]

  const errors: string[] = []
  
  requiredFields.forEach(field => {
    if (!config[field]) {
      errors.push(`Missing required field: NEXT_PUBLIC_FIREBASE_${String(field).toUpperCase()}`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
    config
  }
}

/**
 * Initializes configuration with validation
 * @throws {Error} If configuration is invalid
 */
export const initializeConfig = (): TernSecureConfig => {
  const config = loadFireConfig()
  const validationResult = validateConfig(config)

  if (!validationResult.isValid) {
    throw new Error(
      `Firebase configuration validation failed:\n${validationResult.errors.join('\n')}`
    )
  }

  return config
}