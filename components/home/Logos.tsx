'use client'
import React from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { LanguageContext } from '@/context/LanguageContext'
import { useContext } from 'react'
import { HomeResponse } from '@/types/home'
import { Skeleton } from '@/components/ui/skeleton'

const Logos = ({ initialData }: { initialData?: HomeResponse }) => {
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
      <section className="w-full bg-[#EAF1F0] px-4 py-24 pb-12 md:py-32">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 text-center">
          <Skeleton className="h-6 w-48" />
          <div className="flex w-full flex-wrap items-center justify-center gap-12 md:gap-24">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-20 w-40" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  const partners = data?.data?.partners

  const logos =
    partners?.partner_images.map((img) => ({
      src: `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`,
      alt: img.alternativeText || img.name,
      height: img.height || 100,
      width: img.width || 100,
    })) || []

  return (
    <section className="w-full bg-[#EAF1F0] px-4 py-24 pb-12 md:py-32">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 text-center">
        <p className="text-sm font-semibold tracking-wide text-[#20202d]">{partners?.title}</p>

        <div className="flex w-full flex-wrap items-center justify-center gap-12 md:gap-24">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center transition-all duration-500 ease-in-out"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-[4vw] max-h-20 w-auto object-contain opacity-60 grayscale transition-all duration-500 ease-out group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Logos
