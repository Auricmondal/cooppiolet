'use client'
import React from 'react'
import FadeContent from '@/components/animations/FadeContent'
import HeaderAnimation from '@/components/animations/HeaderAnimation'
import { Button } from '@/components/ui/button'
import { ModalContext, ModalType } from '@/context/ModalContext'
import { useContext } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'
import type { AboutHero } from '@/types/about'

const AboutHero = () => {
  const { openModal } = useContext(ModalContext)

  const { data, isLoading } = useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const res = await axios.get('/api/about')
      return res.data
    },
  })

  if (isLoading) {
    return (
      <section className="relative flex min-h-[100vh] flex-col items-center justify-start overflow-hidden pt-32 pb-48 lg:min-h-screen lg:pt-40">
        <div className="relative z-30 flex w-full max-w-[1200px] flex-col items-center px-4 text-center">
          <Skeleton className="mb-6 h-32 w-full max-w-4xl" />
          <Skeleton className="mb-10 h-12 w-full max-w-xl" />
          <Skeleton className="h-14 w-44 rounded-full" />
        </div>
        <div className="z-20 mt-20 w-full max-w-[1000px] px-8">
          <Skeleton className="aspect-[16/9] w-full rounded-[2rem]" />
        </div>
      </section>
    )
  }

  const heroData: AboutHero = data?.data.Hero

  return (
    <section className="relative w-full overflow-hidden bg-[#FBF9F6] pt-40 pb-20">
      {/* Subtle noise texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="relative z-10 mx-auto max-w-[2000px] px-6">
        {/* Two-column Hero: Text left, Visual right */}
        <div className="flex flex-col items-center justify-center gap-12 md:items-start lg:flex-row lg:gap-24">
          {/* LEFT: Text Content */}
          <div className="flex flex-col items-center pb-16 md:items-start lg:pb-0">
            <div className="mb-10">
              <HeaderAnimation
                text={heroData.Title}
                delay={40}
                animateBy="words"
                direction="bottom"
                className="justify-center font-serif text-[3.5rem] leading-[0.95] font-normal tracking-[-0.04em] text-[#1A1A1A] md:justify-normal md:text-[5rem] lg:text-[90px]"
              />
            </div>

            <FadeContent blur delay={450} duration={800}>
              <div className="flex w-full flex-col gap-4 sm:flex-row">
                <Button
                  variant="primary"
                  size="lg"
                  className={'bg-cst-primary w-full py-8 sm:w-auto'}
                  onClick={() => openModal(ModalType.FORM, null)}
                >
                  {heroData.primary_btn}
                </Button>
                <a
                  href="https://coopgo.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-2 rounded-full border border-[#111113]/20 px-8 py-3 text-base font-medium text-[#111113]/70 transition-all duration-300 hover:border-[#111113]/40 hover:text-[#111113]"
                >
                  {heroData.secondary_btn}
                  <ArrowUpRight
                    size={16}
                    className="-translate-x-1 opacity-50 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </a>
              </div>
            </FadeContent>
          </div>

          <div className="relative h-full min-h-[600px] w-full">
            {/* Base Image */}
            <FadeContent
              blur
              delay={400}
              duration={1200}
              className="absolute top-[10%] right-[10%] h-[400px] w-[320px] overflow-hidden rounded-[2rem] shadow-2xl"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${heroData.images[1].url}`}
                alt={heroData.images[1].alternativeText || 'Hero Image'}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </FadeContent>

            {/* Overlapping Image rotated */}
            <FadeContent
              blur
              delay={600}
              duration={1200}
              className="absolute top-[40%] left-[5%] z-20 h-[300px] w-[380px] -rotate-3 overflow-hidden rounded-[2.5rem] border-[6px] border-[#FBF9F6] shadow-xl"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${heroData.images[0].url}`}
                alt={heroData.images[0].alternativeText || 'Dashboard'}
                width={100}
                height={100}
                className="h-full w-full object-cover object-left-top"
              />
            </FadeContent>

            {/* Floating primary color accent card */}
            <FadeContent
              blur
              delay={800}
              duration={1000}
              className="bg-cst-primary absolute top-[5%] left-[15%] z-10 flex h-32 w-32 rotate-6 flex-col items-center justify-center rounded-[1.5rem] text-white shadow-lg"
            >
              <p className="font-serif text-4xl font-normal">{heroData.artifact_percentage}</p>
              <p className="text-[10px] font-bold tracking-widest uppercase">
                {heroData.artifact_text}
              </p>
            </FadeContent>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
