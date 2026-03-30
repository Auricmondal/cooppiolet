'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import FadeContent from '@/components/animations/FadeContent'
import { ImageData } from '@/types/home'

export type ThemeType = 'teal' | 'purple' | 'burgundy' | 'light-pink' | 'forest'

export interface ProductFeatureData {
  tagLabel: string
  title: string
  description: string
  type: string
  theme: ThemeType
  alignment: 'right' | 'left'
  details: {
    title: string
    description: string
  }[]
  productImage: ImageData
}

export const ProductFeatureBlock = ({
  data,
  index,
  theme,
}: {
  data: ProductFeatureData
  index: number
  theme: ThemeType
}) => {
  const [activeDetailIndex, setActiveDetailIndex] = useState(0)

  return (
    <div
      className={`flex w-full flex-col md:gap-20 ${data.alignment === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}
    >
      {/* Interactive Accordion List */}
      <div className="flex w-full max-w-[550px] flex-1 flex-col justify-center">
        <div className="flex w-full flex-col gap-3">
          {data.details.map((detail, idx) => {
            const isActive = activeDetailIndex === idx

            let activeClass = ''
            let inactiveClass = ''

            // Respecting exact custom classes user set manually for earlier instances
            if (theme === 'teal') {
              activeClass = 'bg-cst-secondary/10 text-white'
              inactiveClass = ' text-white hover:bg-white/10 '
            } else if (theme === 'purple') {
              activeClass = 'bg-cst-neutral-02/10 text-[#111113]'
              inactiveClass = 'text-slate-700 hover:bg-cst-neutral-02'
            } else if (theme === 'light-pink') {
              activeClass = 'bg-white/10 text-slate-900'
              inactiveClass = 'bg-transparent text-slate-600 hover:bg-black/5 '
            } else if (theme === 'forest') {
              activeClass = 'bg-cst-green/10 text-white'
              inactiveClass = 'text-white hover:bg-white/10 '
            } else {
              activeClass = 'bg-cst-primary/30 text-white '
              inactiveClass = 'text-white hover:bg-white/10 '
            }

            const containerPadding = 'px-6 py-5'

            return (
              <FadeContent key={idx} blur delay={400 + idx * 50} duration={600}>
                <Button
                  variant="ghost"
                  onClick={() => setActiveDetailIndex(idx)}
                  className={`group flex h-auto w-full flex-col items-start rounded-2xl text-left whitespace-normal transition-all duration-300 ease-in-out hover:bg-transparent ${containerPadding} ${
                    isActive ? activeClass : inactiveClass
                  }`}
                >
                  <div className="flex w-full items-center justify-start gap-4">
                    {/* Icon Dot coloring per theme */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isActive
                          ? theme === 'burgundy' || theme === 'forest'
                            ? 'bg-[#7e0848] text-white shadow-none'
                            : theme === 'teal'
                              ? 'bg-[#10a8a7] text-white shadow-none'
                              : 'bg-cst-green text-white shadow-none'
                          : theme === 'light-pink' || theme === 'purple'
                            ? 'border border-black/20 bg-transparent text-black/40' // Light theme inactive dot
                            : 'bg-white/30 text-white' // Dark themes inactive dot
                      }`}
                    >
                      {isActive ? (
                        <Check size={16} strokeWidth={2.5} />
                      ) : (
                        <span className="text-xs font-semibold">{idx + 1}</span>
                      )}
                    </div>

                    <span
                      className={`text-[19px] font-semibold tracking-tight ${isActive ? (theme === 'teal' ? 'text-white' : 'text-slate-900') : ''} ${theme == 'burgundy' || theme === 'forest' ? 'text-white' : ''}`}
                    >
                      {detail.title}
                    </span>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${isActive ? 'mt-4 max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p
                      className={`pl-12 text-[16px] leading-relaxed font-normal ${isActive ? (theme === 'teal' ? 'text-white/70' : 'text-slate-600') : ''} ${theme == 'burgundy' || theme === 'forest' ? 'text-white/70' : ''}`}
                    >
                      {detail.description}
                    </p>
                  </div>
                </Button>
              </FadeContent>
            )
          })}
        </div>
      </div>

      {/* Image Container */}
      <div
        className={`relative w-full flex-1 ${data.alignment === 'left' ? 'pl-0 lg:pr-16' : 'pr-0 lg:pl-16'} mt-10 lg:mt-0`}
      >
        <FadeContent blur delay={300} duration={800} className="relative w-full">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[500px] overflow-hidden rounded-[24px] bg-transparent shadow-2xl ring-1 ring-white/10 lg:mx-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.productImage.url}`}
              alt={data.productImage.alternativeText || 'Product Feature Image'}
              fill
              priority
              className="object-cover"
            />
          </div>
        </FadeContent>
      </div>
    </div>
  )
}
