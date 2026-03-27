'use client'
import { createContext, useState } from 'react'

export enum ModalType {
  FORM = 'form',
  NEWSLETTER = 'newsletter',
  COOKIE = 'cookie',
}

export const ModalContext = createContext({
  isModalOpen: false,
  modalContent: null as React.ReactNode,
  modalType: ModalType.FORM,
  openModal: (type: ModalType, content: React.ReactNode) => {},
  closeModal: () => {},
})

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode>(null)
  const [modalType, setModalType] = useState(ModalType.FORM)

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  const openModal = (type: ModalType, content: React.ReactNode) => {
    setModalType(type)
    setModalContent(content)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setModalContent(null)
      setModalType(ModalType.FORM)
    }, 500)
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalContent,
        modalType,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
