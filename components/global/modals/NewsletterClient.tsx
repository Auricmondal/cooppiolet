'use client'
import React, { useState, useEffect, useContext } from 'react'
import Modal from './Modal'
import { ModalType } from '@/context/ModalContext'
import { NewsletterContent } from '@/types/newsletter'
import { Input } from '@/components/ui/Input'
import { useUserTracking } from '@/context/CookieContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { LanguageContext } from '@/context/LanguageContext'
import { Skeleton } from '@/components/ui/skeleton'

// ✅ Validation schema
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email'),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

const NewsletterClient = ({ content }: { content: NewsletterContent }) => {
  const { isInitialized, isSubscribed, setSubscriptionStatus, anonymousId } = useUserTracking()

  const [isOpen, setIsOpen] = useState(false)
  const [hasDismissed, setHasDismissed] = useState(false)

  const { lang } = useContext(LanguageContext)

  const { data, isLoading } = useQuery({
    queryKey: ['newsletter', lang.code],
    initialData: lang.code === 'en' ? content : undefined,
    queryFn: async () => {
      const res = await axios.get(`/api/newsletter?lang=${lang.code}`)
      return res.data
    },
  })

  // ⏱️ Delay open
  useEffect(() => {
    if (!isInitialized || isSubscribed || hasDismissed) return

    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [isInitialized, isSubscribed, hasDismissed])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  })

  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: async (data: NewsletterFormData) => {
      const payload = {
        data: {
          email: data.email,
          anonymous_id: anonymousId,
        },
      }

      return await axios.post(`/api/newsletter`, payload)
    },
    onSuccess: () => {
      toast.success('Subscribed successfully! 🎉')
      reset()
      setSubscriptionStatus(true)
      setIsOpen(false)
    },
    onError: (err: any) => {
      // Fixed path: Next.js returns { error: "..." }, so we just target .error
      const errorMessage = err?.response?.data?.error || err?.message || ''

      const isDuplicate =
        typeof errorMessage === 'string' &&
        (errorMessage.toLowerCase().includes('unique') ||
          errorMessage.toLowerCase().includes('already'))

      if (isDuplicate) {
        toast.success('You are already subscribed! 🎉')

        setSubscriptionStatus(true)
        setIsOpen(false)
        return
      }

      toast.error(errorMessage || 'Subscription failed')
    },
  })

  const onSubmit = (data: NewsletterFormData) => {
    subscribe(data)
  }

  // Show skeleton while loading
  if (isLoading) {
    return (
      <Modal
        type={ModalType.NEWSLETTER}
        isBlocking={true}
        position="center"
        header={{
          title: 'Loading...',
          description: 'Please wait while we load the newsletter content.',
        }}
        footer={{
          primaryBtn: {
            label: 'Loading...',
            onClick: () => {},
          },
        }}
      >
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </Modal>
    )
  }

  if (!isOpen || isSubscribed || hasDismissed) return null

  return (
    <Modal
      type={ModalType.NEWSLETTER}
      isBlocking={true}
      position="center"
      Image={data?.banner}
      header={{
        title: data?.title || 'Subscribe',
        description: data?.sub_heading,
        close: true,
        closeAction: () => {
          setIsOpen(false)
          setHasDismissed(true)
        },
      }}
      footer={{
        primaryBtn: {
          label: isPending ? 'Subscribing...' : data?.button_label || 'Subscribe',
          onClick: handleSubmit(onSubmit),
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <Input
          type="email"
          label="Email Address"
          placeholder="john.doe@example.com"
          {...register('email')}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </form>
    </Modal>
  )
}

export default NewsletterClient
