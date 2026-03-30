import { CookieProvider } from '@/context/CookieContext'
import { LanguageProvider } from '@/context/LanguageContext'
import ModalProvider from '@/context/ModalContext'
import NavbarProvider from '@/context/NavbarContext'
import React from 'react'

const GlobalProviderWrapper: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  return (
    <LanguageProvider>
      <ModalProvider>
        <CookieProvider>
          <NavbarProvider>{children}</NavbarProvider>
        </CookieProvider>
      </ModalProvider>
    </LanguageProvider>
  )
}

export default GlobalProviderWrapper
