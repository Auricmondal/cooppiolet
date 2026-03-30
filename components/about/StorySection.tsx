'use client'

import FadeContent from '@/components/animations/FadeContent'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Skeleton } from '../ui/skeleton'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { StrapiRichTextRenderer } from '../global/RichTextRenderer'
import { AboutCooppiolet } from '@/types/about'

// Register ScrollTrigger for Next.js environments
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const StorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLHeadingElement>(null)
  const text2Ref = useRef<HTMLHeadingElement>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const res = await axios.get('/api/about')
      return res.data
    },
  })

  // Extract variables safely (with fallbacks just in case)
  const heroBanner1 = data?.data?.Hero?.banner_text_1 || 'Our Story'
  const heroBanner2 = data?.data?.Hero?.banner_text_2 || 'From lightweight to mission critical.'

  const aboutCoopgo = data?.data?.about_coopgo || []
  const aboutCooppiolet: AboutCooppiolet = data?.data?.about_cooppiolet || []
  const totalNodes = aboutCooppiolet?.about_details?.length || 0
  const halfIndex = Math.ceil(totalNodes / 2)
  const leftColumnNodes = aboutCooppiolet?.about_details?.slice(0, halfIndex) || []
  const rightColumnNodes = aboutCooppiolet?.about_details?.slice(halfIndex) || []

  // 1. ALL HOOKS MUST COME BEFORE EARLY RETURNS
  useEffect(() => {
    // 2. Do not run GSAP if we are still loading or if refs aren't attached yet
    if (isLoading || !text1Ref.current || !text2Ref.current) return

    const ctx = gsap.context(() => {
      const chars1 = text1Ref.current?.querySelectorAll('.char')
      const chars2 = text2Ref.current?.querySelectorAll('.char')

      if (!chars1 || !chars2) return

      // Create a timeline tied to the scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: '+=300%',
          scrub: 1,
          pin: true,
        },
      })

      // Step 1: Fill text 1 letter by letter
      tl.to(chars1, {
        color: '#000000',
        stagger: 0.1,
        duration: 2,
        ease: 'none',
      })
        // Step 2: Move text 1 up and fade out
        .to(
          text1Ref.current,
          {
            y: -40,
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
          },
          '+=0.5'
        )
        // Step 3: Bring text 2 up from bottom and fade in
        .fromTo(
          text2Ref.current,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        // Step 4: Fill text 2 letter by letter
        .to(
          chars2,
          {
            color: '#000000',
            stagger: 0.05,
            duration: 3,
            ease: 'none',
          },
          '+=0.2'
        )
    }, sectionRef)

    return () => ctx.revert() // Cleanup on unmount
  }, [isLoading, heroBanner1, heroBanner2]) // 3. Depend on loading state and text

  // Helper function to split text
  const splitTextToChars = (text: string) => {
    return text.split(' ').map((word, wordIndex) => (
      <span key={wordIndex} className="mr-[0.3em] inline-block whitespace-nowrap">
        {word.split('').map((char, charIndex) => (
          <span key={charIndex} className="char text-cst-primary/20 inline-block">
            {char}
          </span>
        ))}
      </span>
    ))
  }

  // 4. EARLY RETURN MUST HAPPEN HERE, AFTER ALL HOOKS
  if (isLoading) {
    return (
      <section className="relative flex min-h-[100vh] flex-col items-center justify-start overflow-hidden px-6 pt-32 pb-48 lg:min-h-screen lg:pt-40">
        <div className="relative z-30 flex w-full max-w-[1200px] flex-col items-center px-4 text-center">
          <Skeleton className="mb-6 h-6 w-full max-w-4xl" />
        </div>
        <div className="bg-cst-green mb-24 w-full md:mx-24">
          <div className="mx-auto flex max-w-[60vw] flex-col gap-2 rounded-md px-4 py-24 md:p-24">
            <Skeleton className="mb-6 h-32 w-full max-w-2xl" />
            <Skeleton className="mb-6 h-32 w-full max-w-2xl" />
            <Skeleton className="mb-6 h-32 w-full max-w-2xl" />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="mb-6 h-8 w-full max-w-2xl" />
          <Skeleton className="mb-6 h-32 w-full max-w-2xl" />
          <Skeleton className="mb-6 h-32 w-full max-w-2xl" />
        </div>
      </section>
    )
  }

  return (
    <section className="w-full overflow-hidden bg-white pt-64">
      <div className="mx-auto max-w-[2000px] px-6">
        <div className="relative mb-32 lg:mb-[250px] lg:gap-24">
          <div
            ref={sectionRef}
            className="relative mb-32 flex h-screen w-full flex-col items-center justify-center overflow-hidden lg:mb-[250px]"
          >
            {/* First Heading */}
            <div className="absolute flex w-full items-center justify-center px-4">
              <h2
                ref={text1Ref}
                className="flex flex-wrap justify-center text-[3rem] font-black md:text-[4.5rem]"
              >
                {/* 5. PASS FETCHED DATA HERE */}
                {splitTextToChars(heroBanner1)}
              </h2>
            </div>

            {/* Second Heading */}
            <div className="absolute flex w-full items-center justify-center px-4">
              <h2
                ref={text2Ref}
                className="mx-auto flex max-w-[90vw] flex-wrap justify-center text-center text-[3rem] leading-[1.1] font-black opacity-0 md:text-[4.5rem] lg:max-w-[50vw]"
              >
                {/* 5. PASS FETCHED DATA HERE */}
                {splitTextToChars(heroBanner2)}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-cst-green mb-24 md:mx-24">
          <div className="mx-auto flex max-w-[60vw] flex-col gap-16 rounded-md px-4 py-24 md:p-24">
            {aboutCoopgo.length > 0 && (
              <div className="flex flex-col gap-6 text-[1.1rem] leading-[1.6] text-white">
                <StrapiRichTextRenderer content={aboutCoopgo} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative px-4 py-24 md:p-24">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${aboutCooppiolet.bg_image.url}`}
          alt={aboutCooppiolet.bg_image.alternativeText || 'Background Image'}
          width={100}
          height={100}
          className="absolute inset-0 h-full w-full bg-cover object-cover object-center brightness-50"
        />
        <div className="mx-auto max-w-[2000px]">
          <FadeContent blur delay={100} duration={900}>
            <div className="rounded-md bg-[#FBF9F6] p-10 lg:p-20">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
                {/* Left Column */}
                <div>
                  <h2 className="mb-10 font-sans text-3xl leading-[1.1] font-extrabold tracking-tighter text-[#111113] uppercase md:text-4xl lg:text-5xl">
                    {aboutCooppiolet?.title?.split(',').map((line, index, array) => (
                      <span key={index} className="block">
                        {line}
                        {/* Re-add the comma if it's not the last line */}
                        {index < array.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </h2>

                  {/* Render the First Half using your custom renderer */}
                  <div className="flex flex-col gap-2 text-[1.1rem] leading-[1.6] text-[#4A4A4A]">
                    <StrapiRichTextRenderer content={leftColumnNodes} />
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-2 text-[1.1rem] leading-[1.6] text-[#4A4A4A] lg:pt-2">
                  {/* Render the Second Half using your custom renderer */}
                  <StrapiRichTextRenderer content={rightColumnNodes} />
                </div>
              </div>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  )
}

export default StorySection
