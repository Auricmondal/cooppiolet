'use client'
import React from 'react'
import Image from 'next/image'
import * as LucideIcons from 'lucide-react'
import FadeContent from '@/components/animations/FadeContent'
import { cn } from '@/lib/utils'

interface FeatureListBlockProps {
  data: {
    tagLabel: string
    title: string
    description: string
    alignment: 'right' | 'left' | 'center'
    theme: string
    productImage: string
    items: {
      title: string
      description?: string
      icon?: string
      variant?: 'default' | 'dashed' | 'large' | 'peeking'
    }[]
    footerBadges?: {
      src: string
      label: string
    }[]
  }
}

export const FeatureListBlock = ({ data }: FeatureListBlockProps) => {
  const isSecurity = data.theme === 'security-white'

  return (
    <div className="mt-16 w-full">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2">
        {/* Main Image Block (Asymmetric Bento Card) */}
        <FadeContent blur delay={300} duration={800} className="md:col-span-7 md:row-span-2">
          <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-[3rem] border border-black/3 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            {/* Peeking Mockup Style */}
            <div className="absolute -right-12 -bottom-12 h-[120%] w-[120%] transition-transform duration-700 hover:scale-105">
              <Image
                src={data.productImage}
                alt={data.tagLabel}
                fill
                priority
                className="rounded-tl-4xl object-top-left"
              />
            </div>

            {/* Overlay Gradient for depth */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-white/10 to-transparent"></div>
          </div>
        </FadeContent>

        {/* Feature Context / Text Block */}
        <FadeContent blur delay={400} duration={800} className="md:col-span-5 md:row-span-1">
          <div className="flex h-full flex-col justify-center rounded-[3rem] border border-black/3 bg-white/40 p-10 shadow-[0_4px_20px_rgb(0,0,0,0.01)] backdrop-blur-xl">
            <h3 className="mb-4 font-serif text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
              {data.title}
            </h3>
            <p className="font-sans text-lg leading-relaxed font-normal text-slate-600">
              {data.description}
            </p>
          </div>
        </FadeContent>

        {/* Dynamic Items Block (Bento Sub-Grid) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-5 md:row-span-1">
          {data.items.map((item, idx) => {
            const IconComponent = item.icon ? (LucideIcons as any)[item.icon] : LucideIcons.Zap

            return (
              <FadeContent key={idx} blur delay={500 + idx * 100} duration={600}>
                <div
                  className={cn(
                    'group flex h-full flex-col rounded-4xl p-6 transition-all duration-500',
                    item.variant === 'dashed'
                      ? 'border border-dashed border-slate-300 bg-transparent'
                      : 'border border-black/2 bg-white shadow-[0_4px_15px_rgb(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.04)]'
                  )}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/5 text-slate-800 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                    <IconComponent size={22} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-sans text-base leading-snug font-semibold tracking-tight text-slate-900">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="mt-2 font-sans text-[13px] leading-relaxed font-normal text-slate-500">
                      {item.description}
                    </p>
                  )}
                </div>
              </FadeContent>
            )
          })}
        </div>
      </div>

      {/* Trust Signals / Badges Footer */}
      {data.footerBadges && (
        <FadeContent
          blur
          delay={800}
          duration={1000}
          className="mt-12 flex flex-wrap items-center justify-center gap-12 border-t border-black/3 pt-12"
        >
          {data.footerBadges.map((badge, bIdx) => (
            <div
              key={bIdx}
              className="group relative flex h-24 w-24 items-center justify-center transition-all"
            >
              {/* Soft Glow behind badge */}
              <div className="absolute inset-0 -z-10 rounded-full bg-slate-400/5 blur-3xl transition-all group-hover:bg-emerald-400/10"></div>

              <div className="relative h-16 w-16">
                <Image
                  src={badge.src}
                  alt={badge.label}
                  fill
                  className="object-contain opacity-40 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>

              <span className="absolute -bottom-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase opacity-0 transition-opacity group-hover:opacity-100">
                {badge.label}
              </span>
            </div>
          ))}
        </FadeContent>
      )}
    </div>
  )
}
