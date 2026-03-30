'use client'
import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import InteractiveTabs from '@/components/ui/InteractiveTabs'
import HeaderAnimation from '@/components/animations/HeaderAnimation'
import { useQuery } from '@tanstack/react-query'
import { LanguageContext } from '@/context/LanguageContext'
import { useContext } from 'react'
import axios from 'axios'
import { HomeResponse } from '@/types/home'
import { Skeleton } from '@/components/ui/skeleton'

const Solutions = ({ initialData }: { initialData?: HomeResponse }) => {
  const { lang } = useContext(LanguageContext)

  const { data, isLoading } = useQuery<HomeResponse>({
    queryKey: ['home', lang.code],
    initialData: lang.code === 'en' ? initialData : undefined,
    queryFn: async () => {
      const res = await axios.get(`/api/home?lang=${lang.code}`)
      return res.data
    },
  })

  const solutionsData = data?.data?.solutions

  // ✅ Memoized tabs (avoids recalculation on every render)
  const TABS = useMemo(() => {
    return (
      solutionsData?.solutions?.map((solution) => ({
        id: solution.id.toString(),
        title: solution.name,
        image: solution.solution_image
          ? {
              url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${solution.solution_image.url}`,
              alt: solution.solution_image.alternativeText || solution.name,
            }
          : null,
        icon: solution.icon
          ? {
              url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${solution.icon.url}`,
              width: solution.icon.width,
              height: solution.icon.height,
              alt: solution.icon.alternativeText || solution.name,
            }
          : null,

        solution_image: solution.solution_image
          ? {
              url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${solution.solution_image.url}`,
              alt: solution.solution_image.alternativeText || solution.name,
            }
          : null,

        is_coming_soon: solution.is_coming_soon,
        coming_soon_label: solution.coming_soon_label,
      })) || []
    )
  }, [solutionsData])

  // ✅ State (no dependency on async data)
  const [activeTab, setActiveTab] = useState<string | null>(null)

  // ✅ Derived state (no useEffect needed)
  const defaultTabId = TABS.length > 0 ? TABS[0].id : null
  const currentTab = activeTab ?? defaultTabId

  // ✅ Loading UI
  if (isLoading) {
    return (
      <section className="relative w-full overflow-hidden bg-[#EAF1F0] py-20">
        <div className="relative z-10 mx-auto flex max-w-[800px] flex-col items-center px-4 text-center">
          <Skeleton className="mb-6 h-8 w-32 rounded-full" />
          <Skeleton className="mb-6 h-16 w-full max-w-2xl" />
          <Skeleton className="mb-16 h-24 w-full max-w-3xl" />
        </div>
        <div className="mx-auto max-w-[1200px] px-4">
          <Skeleton className="h-[400px] w-full rounded-3xl" />
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#EAF1F0]">
      {/* Header */}
      <div className="relative z-10 mx-auto flex max-w-[800px] flex-col items-center px-4 pt-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#111113] px-4 py-1.5 text-sm font-medium text-white shadow-xl">
          <span className="bg-cst-secondary h-1.5 w-1.5 rounded-full"></span>
          {solutionsData?.tag_label || 'Solutions'}
        </div>

        <HeaderAnimation
          text={solutionsData?.title || 'Your business has it all, we are making it easier.'}
          delay={40}
          animateBy="words"
          direction="bottom"
          className="mb-6 max-w-3xl justify-center text-4xl leading-tight font-[500] tracking-[-0.03em] text-slate-900 md:text-5xl lg:text-[54px]"
        />

        <p className="mb-16 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
          {solutionsData?.description ||
            'With Cooppiolet, managing your cooperative is no longer a source of compliance anxiety.'}
        </p>
      </div>

      {/* Tabs Section */}
      <div className="relative mt-12 w-full pt-16 pb-32">
        {/* Background Images */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {TABS.map((tab) => {
            const isActive = currentTab === tab.id

            return (
              tab.solution_image && (
                <div
                  key={tab.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    isActive ? 'z-10 opacity-100' : 'z-0 opacity-0'
                  }`}
                >
                  <Image
                    src={tab.solution_image.url}
                    alt={tab.solution_image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              )
            )
          })}
        </div>

        {/* Tabs UI */}
        <div className="relative z-30 mx-auto max-w-[1200px] px-4">
          <InteractiveTabs
            tabs={TABS.filter((tab) => tab.solution_image).map((sectionTab) => ({
              id: sectionTab.id,
              title: sectionTab.title,
              icon: sectionTab.icon ? (
                <Image
                  src={sectionTab.icon.url}
                  alt={sectionTab.icon.alt}
                  width={sectionTab.icon.width}
                  height={sectionTab.icon.height}
                  className="h-8 w-8"
                />
              ) : null,
              image: sectionTab.image!.url,
              badge: sectionTab.is_coming_soon ? sectionTab.coming_soon_label : undefined,
            }))}
            activeTab={currentTab || ''}
            onTabHover={setActiveTab}
          />
        </div>
      </div>
    </section>
  )
}

export default Solutions
