'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import HeaderAnimation from '@/components/animations/HeaderAnimation'
import { ModalContext, ModalType } from '@/context/ModalContext'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { HomeResponse } from '@/types/home'
import { Skeleton } from '@/components/ui/skeleton'

const Hero = () => {
  const { openModal } = useContext(ModalContext)

  const { data, isLoading } = useQuery<HomeResponse>({
    queryKey: ['home'],
    queryFn: async () => {
      const res = await axios.get('/api/home')
      return res.data
    },
  })

  if (isLoading) {
    return (
      <section className="relative flex min-h-[100vh] flex-col items-center justify-start overflow-hidden pt-32 pb-48 lg:min-h-screen lg:pt-40">
        <div className="relative z-30 flex w-full max-w-[1200px] flex-col items-center px-4 text-center">
          <Skeleton className="mb-8 h-10 w-64 rounded-full" />
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

  const heroData = data?.data?.hero

  return (
    <section className="relative flex min-h-[100vh] flex-col items-center justify-start overflow-hidden pt-32 pb-48 lg:min-h-screen lg:pt-40">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0 h-full w-full brightness-120 md:brightness-100">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${heroData?.hero_image?.url}`}
          alt={heroData?.hero_image?.alternativeText || 'Hero Background Image'}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-30 flex w-full max-w-[1200px] flex-col items-center px-4 text-center">
        {/* Eyebrow */}
        {heroData?.show_pre_header && (
          <div className="border-cst-neutral-03 mb-8 inline-flex items-center gap-3 rounded-full border p-1.5 pr-6 text-sm font-medium">
            <span className="bg-cst-secondary rounded-full px-3 py-1 text-xs font-bold tracking-wider text-black uppercase backdrop-blur-sm">
              New
            </span>
            <span className="text-left text-slate-600">
              {heroData?.pre_header || 'The legal standard for your board.'}
            </span>
          </div>
        )}

        <HeaderAnimation
          text={heroData?.title || 'Modern People Fast \n Software For German \n Businesses'}
          delay={50}
          animateBy="words"
          wordStyles={{ German: 'text-[#760948] font-medium' }}
          direction="bottom"
          className="max-w-4xl justify-center text-4xl leading-none font-light tracking-[-0.05em] text-[#111113] md:text-7xl lg:text-[85px]"
        />

        {/* P */}
        <p className="mt-6 max-w-[600px] text-base leading-relaxed font-medium text-[#242429] md:text-xl">
          {heroData?.sub_heading ||
            'Present hassle of maintaining mountains of excel sheets full of billions of data is tiring, we help solve that very easily.'}
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            variant="primary"
            size="lg"
            withDot
            onClick={() => openModal(ModalType.FORM, null)}
          >
            {heroData?.cta_label || 'Talk to an Expert'}
          </Button>
        </div>
      </div>

      {/* Floating Dashboard Interface & Icons */}
      <div className="z-20 w-full max-w-[1000px] translate-y-[20%] px-8">
        {heroData?.graphics.map((graphic, idx) => (
          <div
            key={graphic.id}
            className={`absolute z-30 hidden transition-transform hover:scale-105 lg:block ${
              idx === 0
                ? '-top-16 -left-12 -rotate-[15deg]'
                : idx === 1
                  ? 'top-[20%] -left-20 rotate-6'
                  : idx === 2
                    ? 'top-[60%] -left-16 -rotate-6'
                    : idx === 3
                      ? '-top-12 -right-8 rotate-[15deg]'
                      : idx === 4
                        ? 'top-[30%] -right-16 -rotate-12'
                        : 'top-[70%] -right-10 rotate-6'
            }`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${graphic.url}`}
              alt={graphic.alternativeText || `Graphic ${idx + 1}`}
              width={110}
              height={110}
              className="object-contain drop-shadow-2xl"
            />
          </div>
        ))}

        {/* Dashboard Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] border-2 border-slate-100 bg-white shadow-[0_40px_100px_rgba(0,0,0,0.15)] ring-4 ring-white">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${heroData?.dashboard.url}`}
            blurDataURL={`${process.env.NEXT_PUBLIC_STRAPI_URL}${heroData?.dashboard.formats.thumbnail.url}`}
            alt={
              heroData?.graphics.find((graphic) => graphic.name === 'image 1.webp')
                ?.alternativeText || 'Dashboard Interface'
            }
            width={100}
            height={100}
            className="h-auto w-full object-top"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
