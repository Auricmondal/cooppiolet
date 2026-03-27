'use client'
import Link from 'next/link'
import Modal from './Modal'
import { ModalType } from '@/context/ModalContext'
import React from 'react'
import { CookieClientProps } from '@/types/cookie'
import { useUserTracking } from '@/context/CookieContext'

const CookieClient = ({ content }: CookieClientProps) => {
  const { acceptCookies } = useUserTracking()
  return (
    <Modal
      type={ModalType.COOKIE}
      isBlocking={false}
      position="bottom-right"
      header={{
        title: content?.title || 'Cookie Settings',
        description:
          content?.description || 'We use cookies to personalize content and analyze traffic.',
      }}
      footer={{
        primaryBtn: {
          label: content?.accept_btn_label || 'Accept',
          onClick: acceptCookies,
        },
        secondaryBtn: {
          label: content?.reject_btn_label || 'Deny',
          onClick: () => {},
        },
      }}
    >
      <p className="inline-block text-[14px] leading-relaxed text-black/60">
        Read our{' '}
        {content?.links.map((link, index) => {
          const isLast = index === (content?.links?.length || 0) - 1
          const isSecondToLast = index === (content?.links?.length || 0) - 2

          return (
            <React.Fragment key={link.id}>
              <Link
                href={link.href}
                className="font-medium text-black underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
              {!isLast && (isSecondToLast ? ' and ' : ', ')}
            </React.Fragment>
          )
        })}
      </p>
    </Modal>
  )
}

export default CookieClient
