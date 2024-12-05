'use client'

import React from 'react'
import { useState } from 'react'
import { signInWithEmail } from '../app-router/client/actions'
import { styles } from '../utils/create-styles'
import { useRouter } from 'next/navigation'

export interface SignInProps {
  onError?: (error: Error) => void
  className?: string
  style?: React.CSSProperties
  customStyles?: {
    container?: string
    header?: string
    title?: string
    formWrapper?: string
    formContainer?: string
    form?: string
    input?: string
    button?: string
    errorText?: string
    label?: string
  }
}

export function SignIn({ 
  onError, 
  className,
  style,
  customStyles = {}
}: SignInProps) {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await signInWithEmail(email, password)
      if (user.success == true) {
        router.push('/')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in'
      setError(errorMessage)
      onError?.(err instanceof Error ? err : new Error('Failed to sign in'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${styles.container} ${customStyles.container || ''}`} style={style}>
      <div className={`${styles.header} ${customStyles.header || ''}`}>
        <h2 className={`${styles.title} ${customStyles.title || ''}`}>
          Sign in to your account
        </h2>
      </div>
      
      <div className={`${styles.formWrapper} ${customStyles.formWrapper || ''}`}>
        <div className={`${styles.formContainer} ${customStyles.formContainer || ''}`}>
          <form 
            onSubmit={handleSubmit} 
            className={`${styles.form} ${customStyles.form || ''} ${className}`}
            role="form"
            aria-label="Sign in form"
          >
            {error && (
              <div 
                className={`${styles.error} ${customStyles.errorText || ''}`}
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className={`${styles.label} ${customStyles.label || ''}`}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.input} ${customStyles.input || ''}`}
                disabled={loading}
                aria-required="true"
                aria-invalid={!!error}
              />
            </div>
            <div>
              <label htmlFor="password" className={`${styles.label} ${customStyles.label || ''}`}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.input} ${customStyles.input || ''}`}
                disabled={loading}
                aria-required="true"
                aria-invalid={!!error}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className={`${styles.button} ${customStyles.button || ''}`}
              data-testid="sign-in-submit"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

