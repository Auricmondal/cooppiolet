'use client'
import React, { useEffect, useRef, useState } from 'react'
import FadeContent from '@/components/animations/FadeContent'
import HeaderAnimation from '@/components/animations/HeaderAnimation'

import Image from 'next/image'
import { Skeleton } from '../ui/skeleton'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { LanguageContext } from '@/context/LanguageContext'
import { Overview, OverviewCard, AboutResponse } from '@/types/about'
import { StrapiRichTextRenderer } from '../global/RichTextRenderer'
import { ImageData } from '@/types/home'

const ComplianceSection = ({ initialData }: { initialData?: AboutResponse }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const { lang } = React.useContext(LanguageContext)

  const { data, isLoading } = useQuery({
    queryKey: ['about', lang.code],
    initialData: lang.code === 'en' ? initialData : undefined,
    queryFn: async () => {
      const res = await axios.get(`/api/about?lang=${lang.code}`)
      return res.data
    },
  })

  if (isLoading) {
    return (
      <section className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden px-6 pt-32 pb-48 lg:min-h-screen lg:pt-40">
        <div className="relative z-30 flex w-full max-w-[1200px] flex-col items-center px-4">
          <Skeleton className="mb-6 h-32 w-full max-w-4xl" />
          <Skeleton className="mb-10 h-12 w-full max-w-xl" />
        </div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-cst-neutral-01/50 mb-6 w-full max-w-[800px] rounded-md border-[#111113]/10 p-6"
          >
            <Skeleton className="mb-4 h-2 w-1/8" />
            <Skeleton className="mb-4 h-8 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
          </div>
        ))}
      </section>
    )
  }

  const overview: Overview = data?.data.overview

  return (
    <section className="relative w-full overflow-clip py-24 lg:py-[250px]">
      <div className="absolute inset-0 -z-10 rotate-45 overflow-hidden blur-[250px]">
        <div className="bg-cst-primary absolute top-0 -right-30 h-200 w-200 rounded-full"></div>
        <div className="absolute top-50 -right-30 h-200 w-200 rounded-full bg-[#5A65FF]"></div>
        <div className="bg-cst-secondary absolute -right-50 bottom-0 h-200 w-200 rounded-full"></div>
      </div>
      <div className="absolute inset-0 -z-10 rotate-180 overflow-hidden blur-[250px]">
        <div className="bg-cst-primary absolute top-0 -right-30 h-200 w-200 rounded-full"></div>
        <div className="absolute top-50 -right-30 h-200 w-200 rounded-full bg-[#5A65FF]"></div>
        <div className="bg-cst-secondary absolute -right-50 bottom-0 h-200 w-200 rounded-full"></div>
      </div>
      <div className="mx-auto max-w-[2000px] px-6">
        <div className="relative grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-24">
          <div className="mb-16 self-start lg:sticky lg:top-[100px] lg:mb-0">
            <HeaderAnimation
              text={overview.title}
              className="font-sans text-5xl leading-[0.95] font-extrabold tracking-[-0.05em] text-[#111113] uppercase md:text-7xl lg:text-[7.5rem]"
            />

            <FadeContent blur delay={400} duration={800} className="mt-12 max-w-md">
              <p className="text-[1.1rem] leading-[1.6] text-[#4A4A4A]">{overview.description}</p>
            </FadeContent>
          </div>

          <div className="flex flex-col gap-4 pb-[30vh]">
            {overview.card.map((item: OverviewCard, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  data-index={i}
                  className={`group scroll-mt-[120px] overflow-hidden rounded-md border transition-all duration-500 ${
                    isOpen ? 'border-transparent shadow-sm' : 'border-[#111113]/10'
                  }`}
                  style={{
                    backgroundColor: isOpen ? '#E0E0E0' : '#FFFFFF',
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-start justify-between p-8 text-left transition-colors duration-500 md:p-12 lg:p-14"
                  >
                    <div className="flex flex-col gap-6">
                      <span
                        className={`${isOpen ? 'text-cst-neutral-04' : 'text-cst-neutral-02'} text-[4rem] -tracking-[10%]`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`font-sans text-2xl leading-tight tracking-tight md:text-3xl lg:text-4xl ${isOpen ? 'text-[#111113]' : 'text-[#1A1A1A]'}`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-8 pt-0 pb-12 md:px-12 md:pb-16 lg:px-14 lg:pb-20">
                        <div
                          className={`max-w-2xl md:pl-12 lg:pl-16 ${isOpen ? 'border-[#111113]/20' : 'border-cst-primary'}`}
                        >
                          {item.description.split('\n').map((paragraph, idx) => (
                            <p
                              key={idx}
                              className="mb-4 text-[1.05rem] leading-[1.7] text-[#4A4A4A]"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* BOTTOM: INDUSTRIAL TRUST BADGES (Light Theme) */}
        <div className="mt-32 border-t border-[#111113]/10 pt-16">
          <div className="mx-auto grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] items-center gap-8 md:max-w-[50vw]">
            {' '}
            {overview.badges.map((badge: ImageData, i) => (
              <Image
                key={i}
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${badge.url}`}
                alt={badge.alternativeText || 'Trust Badge'}
                width={200}
                height={80}
                className="h-30 w-30 rounded-full object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComplianceSection
