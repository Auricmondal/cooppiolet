'use client'
import { useContext, useEffect, useState } from 'react'
import ContactModal from './ContactModal'
import Cookie from './Cookie'
import Newsletter from './Newsletter'
import { ModalContext, ModalType } from '@/context/ModalContext'

const Modal = () => {
  const { isModalOpen, closeModal, modalType, modalContent, openModal } = useContext(ModalContext)

  return (
    <div className="">
      {modalType === ModalType.FORM && <ContactModal />}
      {modalType === ModalType.COOKIE && <Cookie />}
      {modalType === ModalType.NEWSLETTER && <Newsletter />}
    </div>
  )
}

export default Modal
