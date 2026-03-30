'use client'
import Link from 'next/link'
import Modal from './Modal'
import { ModalType } from '@/context/ModalContext'
import React, { useContext } from 'react'
import { CookieClientProps } from '@/types/cookie'
import { useUserTracking } from '@/context/CookieContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import { LanguageContext } from '@/context/LanguageContext'

const CookieClient = ({ content }: CookieClientProps) => {
  const { isInitialized, hasRespondedToCookies, anonymousId, acceptCookies, denyCookies } =
    useUserTracking()

  const { lang } = useContext(LanguageContext)

  const { data, isLoading } = useQuery({
    queryKey: ['cookie', lang.code],
    initialData: lang.code === 'en' ? content : undefined,
    queryFn: async () => {
      const res = await axios.get(`/api/cookie?lang=${lang.code}`)
      return res.data
    },
  })

  const { mutate: trackCookieAcceptance } = useMutation({
    mutationFn: async () => {
      return await axios.post('/api/cookie', {
        data: {
          anonymous_id: anonymousId,
          accepted: true,
        },
      })
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  if (isLoading && !data) {
    return (
      <Modal
        type={ModalType.COOKIE}
        isBlocking={false}
        position="bottom-right"
        header={{
          title: 'Loading...',
          description: 'Please wait while we load the cookie settings.',
        }}
        footer={{
          primaryBtn: {
            label: 'Loading...',
            onClick: () => {},
          },
        }}
      >
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </Modal>
    )
  }

  if (!isInitialized || hasRespondedToCookies) return null

  return (
    <Modal
      type={ModalType.COOKIE}
      isBlocking={false}
      position="bottom-right"
      header={{
        title: data?.title || 'Cookie Settings',
        description:
          data?.description || 'We use cookies to personalize content and analyze traffic.',
      }}
      footer={{
        primaryBtn: {
          label: data?.accept_btn_label || 'Accept',
          onClick: () => {
            trackCookieAcceptance() // ✅ backend tracking
            acceptCookies() // ✅ local cookie
          },
        },
        secondaryBtn: {
          label: data?.reject_btn_label || 'Deny',
          onClick: denyCookies,
        },
      }}
    >
      <p className="inline-block text-[14px] leading-relaxed text-black/60">
        Read our{' '}
        {data?.links?.map((link: { id: string; href: string; label: string }, index: number) => {
          const isLast = index === (data?.links?.length || 0) - 1
          const isSecondToLast = index === (data?.links?.length || 0) - 2

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
