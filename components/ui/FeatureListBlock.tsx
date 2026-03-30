'use client'

import Image from 'next/image'
import * as LucideIcons from 'lucide-react'
import FadeContent from '@/components/animations/FadeContent'
import { cn } from '@/lib/utils'
import { ComingSoonItem, ImageData, SecurityItem } from '@/types/home'

interface FeatureListBlockProps {
  data: {
    tagLabel: string
    title: string
    description: string
    alignment: 'right' | 'left' | 'center'
    theme: string
    productImage: ImageData
    coming_soon?: ComingSoonItem[]
    security?: SecurityItem[]
  }
}

export const FeatureListBlock = ({ data }: FeatureListBlockProps) => {
  const footerBadges =
    data.security?.flatMap((item) =>
      item.is_badge_section && (item as any).bages ? (item as any).bages : []
    ) || []

  return (
    <div className="mt-16 w-full">
      {/* ✅ Coming Soon Section */}
      {data.coming_soon && data.coming_soon.length > 0 && (
        <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.coming_soon.map((item, idx) => (
            <FadeContent key={idx} blur delay={200 + idx * 100} duration={700}>
              <section
                className={cn(
                  'group relative overflow-hidden rounded-3xl border border-white/30 bg-white/25 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/35 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)]',
                  idx === 2 && 'border-dashed border-slate-300/70 bg-white/18'
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-80" />
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-sky-400/10 blur-3xl transition-all duration-500 group-hover:bg-sky-400/20" />
                <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-emerald-400/10 blur-3xl transition-all duration-500 group-hover:bg-emerald-400/20" />

                <div className="relative z-10 flex items-start gap-4">
                  <div className="bg-cst-green flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl backdrop-blur-xl">
                    {item.icon?.url ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.icon.url}`}
                        alt={item.icon.alternativeText || item.label}
                        width={item.icon.width}
                        height={item.icon.height}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <LucideIcons.Zap size={22} strokeWidth={1.6} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="from-cst-primary to-cst-primary-light mb-2 inline-flex items-center rounded-full bg-gradient-to-br px-4 py-2 text-white">
                      Coming soon
                    </div>

                    <h4 className="text-base leading-snug font-semibold tracking-tight text-slate-900">
                      {item.label}
                    </h4>

                    <p className="text-cst-neutral-14/60 mt-2 text-sm leading-relaxed font-normal">
                      {item.icon?.alternativeText || 'Feature details will be available soon.'}
                    </p>
                  </div>
                </div>
              </section>
            </FadeContent>
          ))}
        </div>
      )}

      {/* Existing Layout */}
      {data.security && data.security.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2">
          {/* Image Block */}
          <FadeContent blur delay={300} duration={800} className="md:col-span-7 md:row-span-2">
            <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-[3rem] border border-black/3 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <div className="absolute -right-12 -bottom-12 h-[120%] w-[120%] transition-transform duration-700 hover:scale-105">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.productImage.url}`}
                  alt={data.productImage.alternativeText || data.tagLabel}
                  fill
                  priority
                  className="rounded-tl-4xl object-top-left"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-white/10 to-transparent"></div>
            </div>
          </FadeContent>

          {/* Text Block */}
          <FadeContent blur delay={400} duration={800} className="md:col-span-5 md:row-span-1">
            <div className="flex h-full flex-col justify-center rounded-xl border border-black/3 bg-white/40 p-10 shadow-[0_4px_20px_rgb(0,0,0,0.01)] backdrop-blur-xl">
              <h3 className="mb-4 font-serif text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
                {data.title}
              </h3>
              <p className="font-sans text-lg leading-relaxed font-normal text-slate-600">
                {data.description}
              </p>
            </div>
          </FadeContent>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-5 md:row-span-1">
            {data.security?.map((item, idx) => {
              if (item.is_badge_section) return null

              const IconComponent = (item as any).icon
                ? (LucideIcons as any)[(item as any).icon]
                : LucideIcons.Zap

              return (
                <FadeContent key={idx} blur delay={500 + idx * 100} duration={600}>
                  <div
                    className={cn(
                      'group flex h-full flex-col rounded-2xl p-6 transition-all duration-500',
                      idx === 2
                        ? 'border-2 border-dashed border-slate-300'
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
      )}

      {/* Badges */}
      {footerBadges.length > 0 && (
        <FadeContent
          blur
          delay={800}
          duration={1000}
          className="mt-12 flex flex-wrap items-center justify-center gap-12 border-t border-black/3 pt-12"
        >
          {footerBadges.map((badge, bIdx) => (
            <div
              key={bIdx}
              className="group relative flex h-32 w-32 items-center justify-center transition-all"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${badge.url}`}
                alt={badge.alternativeText || badge.name || 'Badge'}
                width={badge.width}
                height={badge.height}
                className="h-32 w-32 rounded-full object-cover transition-all duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </FadeContent>
      )}
    </div>
  )
}
