'use client'
import React from 'react'
import FadeContent from '@/components/animations/FadeContent'
import { Button } from '@/components/ui/button'
import { ModalContext, ModalType } from '@/context/ModalContext'
import { useContext } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { LanguageContext } from '@/context/LanguageContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { HomeResponse } from '@/types/home'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const AboutCTA = ({ initialData }: { initialData?: HomeResponse }) => {
  const { openModal } = useContext(ModalContext)

  const router = useRouter()

  const { lang } = useContext(LanguageContext)

  const { data, isLoading } = useQuery<HomeResponse>({
    queryKey: ['home', lang.code],
    initialData: lang.code === 'en' ? initialData : undefined,
    queryFn: async () => {
      const res = await axios.get(`/api/home?lang=${lang.code}`)
      return res.data
    },
  })

  if (isLoading) {
    return (
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center lg:min-h-[80vh] lg:py-[200px]">
        <div className="relative z-10 mx-auto w-full max-w-[1000px]">
          <Skeleton className="mx-auto mb-10 h-32 w-full max-w-4xl" />
          <Skeleton className="mx-auto mb-12 h-16 w-full max-w-2xl" />
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Skeleton className="h-16 w-44 rounded-full" />
            <Skeleton className="h-16 w-44 rounded-full" />
          </div>
        </div>
      </section>
    )
  }

  const ctaData = data?.data?.final_cta

  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center lg:min-h-[80vh] lg:py-[200px]">
      <Image
        src="/assets/bg.jpg"
        alt="CTA Background"
        fill
        className="absolute inset-0 z-0 h-full w-full bg-cover object-cover object-center brightness-50"
      />

      <div className="relative z-10 mx-auto max-w-[1000px]">
        <FadeContent blur delay={200} duration={1000}>
          <h2 className="mb-10 font-sans text-4xl leading-[0.95] font-extrabold tracking-[-0.05em] text-[#efefef] uppercase md:text-6xl lg:text-[6.5rem]">
            {ctaData?.title || 'Ready to modernize your cooperative?'}
          </h2>
        </FadeContent>

        <FadeContent blur delay={400} duration={1000}>
          <p className="mx-auto mb-12 max-w-2xl text-[1.1rem] leading-[1.6] text-[#d8d8d8] md:text-[1.25rem]">
            {ctaData?.sub_heading ||
              'Join the network of German cooperatives replacing paperwork with precision. Legally sound, technically robust, and genuinely simple to use.'}
          </p>
        </FadeContent>

        <FadeContent blur delay={500} duration={1000}>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push('https://calendly.com/coopgo/demo?month=2024-06')}
              className="bg-cst-neutral-05 text-cst-neutral-14 hover:bg-cst-primary-light/20 h-14 w-full px-10 text-[1rem] hover:text-white sm:h-16 sm:w-auto sm:text-[1.1rem]"
            >
              {ctaData?.cta_label || 'Demo anfragen'}
            </Button>
            <Link
              href="/#"
              onClick={() => openModal(ModalType.FORM, null)}
              className="group bg-cst-primary inline-flex h-14 w-full items-center justify-center gap-3 rounded-full px-10 text-[1rem] font-medium text-white transition-all hover:bg-black sm:h-16 sm:w-auto sm:text-[1.1rem]"
            >
              {ctaData?.secondary_cta || 'coopgo.de besuchen'}
              <ArrowUpRight
                size={18}
                className="opacity-50 transition-all group-hover:opacity-100"
              />
            </Link>
          </div>
        </FadeContent>

        <FadeContent blur delay={700} duration={1000}>
          <p className="mt-16 text-[0.8rem] font-medium tracking-widest text-[#111113]/30 uppercase">
            DSGVO-konform &bull; In Deutschland gehostet
          </p>
        </FadeContent>
      </div>
    </section>
  )
}

export default AboutCTA
