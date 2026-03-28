'use client'
import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { ModalType } from '@/context/ModalContext'
import { NewsletterContent } from '@/types/newsletter'
import { Input } from '@/components/ui/Input'
import { useUserTracking } from '@/context/CookieContext'

const NewsletterClient = ({ content }: { content: NewsletterContent }) => {
  const { isInitialized, isSubscribed } = useUserTracking()
  const [isOpen, setIsOpen] = useState(false)
  const [hasDismissed, setHasDismissed] = useState(false)

  useEffect(() => {
    if (!isInitialized || isSubscribed || hasDismissed) return

    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 20000)

    return () => clearTimeout(timer)
  }, [isInitialized, isSubscribed, hasDismissed])

  if (!isOpen || isSubscribed || hasDismissed) return null

  return (
    <Modal
      type={ModalType.NEWSLETTER}
      isBlocking={true}
      position="center"
      Image={content?.banner}
      header={{
        title: content?.title || 'Subscribe',
        description: content?.sub_heading,
        close: true,
        closeAction: () => {
          setIsOpen(false)
          setHasDismissed(true)
        },
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
