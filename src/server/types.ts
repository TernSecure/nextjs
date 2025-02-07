export interface UserInfo {
    uid: string
    email: string | null
    emailVerified?: boolean
    authTime?: number
    disabled?: boolean
  }
  
  
  export interface SessionResult {
    isAuthenticated: boolean
    user: UserInfo | null
    error?: string
  }