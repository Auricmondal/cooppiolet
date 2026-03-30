'use client'
import React from 'react'
import FadeContent from '@/components/animations/FadeContent'
import HeaderAnimation from '@/components/animations/HeaderAnimation'
import { Shield, BookOpen, Layers, Users } from 'lucide-react'
import Image from 'next/image'
import { H2 } from '../global/Typography'
import { Skeleton } from '../ui/skeleton'
import { LanguageContext } from '@/context/LanguageContext'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { OurStand, Quote, AboutResponse } from '@/types/about'

const ValuesSection = ({ initialData }: { initialData?: AboutResponse }) => {
  const { lang } = useContext(LanguageContext)

  const { data, isLoading } = useQuery<AboutResponse>({
    queryKey: ['about', lang.code],
    initialData: lang.code === 'en' ? initialData : undefined,
    queryFn: async () => {
      const res = await axios.get(`/api/about?lang=${lang.code}`)
      return res.data
    },
  })

  if (isLoading) {
    return (
      <section className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden pt-32 pb-48 lg:min-h-screen lg:pt-40">
        <div className="relative z-30 flex w-full max-w-[1200px] flex-col items-center px-4 text-center">
          <Skeleton className="mb-6 h-32 w-full max-w-4xl" />
          <Skeleton className="mb-10 h-12 w-full max-w-xl" />
          <Skeleton className="h-14 w-44 rounded-full" />
        </div>
      </section>
    )
  }

  const ourStand: OurStand | undefined = data?.data.our_stand
  const quote: Quote | undefined = data?.data.quote

  if (!ourStand || !quote) return null

  return (
    <section className="w-full bg-[#FFFFFF]">
      <div className="mx-auto mb-24 max-w-[2000px] px-6">
        {/* Heading */}
        <div className="my-24">
          <H2>
            <HeaderAnimation
              text={ourStand.title}
              delay={40}
              animateBy="words"
              direction="bottom"
              className="justify-start font-serif text-4xl leading-[1.05] font-normal tracking-tight text-[#111113] md:text-5xl lg:text-[5.5rem]"
            />
          </H2>
          <FadeContent blur delay={400} duration={800}>
            <p className="max-w-2xl text-[1.15rem] leading-[1.7] text-[#4A4A4A]">
              {ourStand.description}
            </p>
          </FadeContent>
        </div>

        <div className="relative flex flex-col gap-2 pb-[10vh] lg:block">
          {ourStand.card.map((val, i) => {
            return (
              <div
                key={i}
                className="bg-cst-primary lg:bg-cst-primary/80 relative top-auto flex flex-col overflow-hidden rounded-md backdrop-blur-md lg:sticky lg:top-(--sticky-top) lg:flex-row"
                style={
                  {
                    '--sticky-top': `calc(100px )`,
                    marginBottom: i === ourStand.card.length - 1 ? '0' : '2rem',
                    zIndex: 10 + i,
                  } as React.CSSProperties
                }
              >
                {/* Left Column: Image (40%) */}
                {/* Added: lg:h-auto to ensure it stretches with the flex row instead of collapsing */}
                <div className="relative h-[250px] w-full shrink-0 overflow-hidden md:h-[350px] lg:h-auto lg:w-[40%]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${val.image.url}`}
                    alt={val.image.alternativeText || 'Our Stand Image'}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover brightness-50 grayscale"
                  />
                </div>

                <div className="flex w-full flex-col justify-center p-8 md:p-12 lg:w-[60%] lg:p-20">
                  <h3 className="mb-8 font-serif text-3xl leading-[1.1] font-normal text-white md:text-[2.2rem] lg:text-[3rem]">
                    {val.title}
                  </h3>

                  <div className="flex flex-col gap-4">
                    {val.description.map((para: any, j) => (
                      <p
                        key={j}
                        className="text-[1rem] leading-[1.6] text-white/80 md:text-[1.1rem]"
                      >
                        {para.children[0].text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        {/* Centered philosophical statement */}
        <FadeContent blur delay={300} duration={1000}>
          {/* 1. Added a relative wrapper to contain the absolute image */}
          <div className="relative flex w-full items-center justify-center overflow-hidden rounded-md py-12 md:py-24">
            {/* 2. Updated Next.js Image to use 'fill' for background usage */}
            <Image
              src="/assets/bg.jpg"
              alt="CTA Background"
              fill
              className="z-0 object-cover object-center brightness-50"
            />

            {/* 3. Added 'relative' so 'z-10' actually works */}
            <div className="relative z-10 mx-4 rounded-md bg-[#f4f4f4] px-8 py-16 text-center backdrop-blur-sm md:px-12 md:py-24">
              <p className="text-cst-primary mx-auto max-w-4xl font-serif text-[1.75rem] leading-snug font-normal md:text-[2.2rem] lg:text-[3rem]">
                &ldquo;{quote.quote}&rdquo;
              </p>
              <p className="text-cst-primary/80 mt-8 text-sm md:mt-12 md:text-[11px]">
                {quote.tag}
              </p>
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  )
}

export default ValuesSection
