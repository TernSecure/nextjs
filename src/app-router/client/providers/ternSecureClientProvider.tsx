'use client'

import React, { useState } from 'react'
import { initialState, TernSecureContext } from './ternSecureContext'
import { TernSecureState } from '../../../types'


interface TernSecureClientProps {
  children: React.ReactNode
}

export function TernSecureClientProvider({ children }: TernSecureClientProps) {
  const stateAndUpdater = useState<TernSecureState>(initialState)

  return (
    <TernSecureContext.Provider value={stateAndUpdater}>
      {children}
    </TernSecureContext.Provider>
  )
}