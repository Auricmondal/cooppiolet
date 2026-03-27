import ModalProvider from '@/context/ModalContext'
import React from 'react'

const ModalWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>
}

export default ModalWrapper
