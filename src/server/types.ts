export interface UserInfo {
    uid: string
    email: string | null
    emailVerified?: boolean
    authTime?: number
    disabled?: boolean
  }
  
  
  export interface SessionResult {
    user: UserInfo | null
    token: string | null
    sessionId: string | null
    error?: string
  }