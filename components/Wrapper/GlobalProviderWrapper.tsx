import { CookieProvider } from '@/context/CookieContext'
import ModalProvider from '@/context/ModalContext'
import { Method, strapiRequest } from '@/lib/api'
import React from 'react'

const GlobalProviderWrapper: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  return (
    <ModalProvider>
      <CookieProvider>{children}</CookieProvider>
    </ModalProvider>
  )
}

export default GlobalProviderWrapper
