'use client'
import React from 'react'
import Modal from './Modal'
import { ModalType } from '@/context/ModalContext'
import { NewsletterContent } from '@/types/newsletter'
import { Input } from '@/components/ui/Input'

const NewsletterClient = ({ content }: { content: NewsletterContent }) => {
  return (
    <Modal
      type={ModalType.COOKIE}
      isBlocking={true}
      position="center"
      Image={content?.banner}
      header={{
        title: content?.title || 'Cookie Settings',
        description: content?.sub_heading,
        close: true,
        closeAction: () => {},
      }}
      footer={{
        primaryBtn: {
          label: content?.button_label || 'Accept',
          onClick: () => {},
        },
      }}
    >
      <label htmlFor="email">
        <span className="sr-only">Email address</span>
        <Input type="email" label="Email Address" placeholder={'john.doe@example.com'} />
      </label>
    </Modal>
  )
}

export default NewsletterClient
