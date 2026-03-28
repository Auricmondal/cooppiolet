'use client'

import FadeContent from '@/components/animations/FadeContent'

import Image from 'next/image'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const StorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLHeadingElement>(null)
  const text2Ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // gsap.context helps clean up animations automatically in React
    const ctx = gsap.context(() => {
      if (!text1Ref.current || !text2Ref.current) return

      const chars1 = text1Ref.current.querySelectorAll('.char')
      const chars2 = text2Ref.current.querySelectorAll('.char')

      // Create a timeline tied to the scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center', // Start when the container hits the center of the screen
          end: '+=300%', // Pin for 3x the viewport height (gives plenty of scroll time)
          scrub: 1, // Smooth scrubbing effect
          pin: true, // Pin the section in place
        },
      })

      // Step 1: Fill "Our Story" letter by letter
      tl.to(chars1, {
        color: '#000000', // Turns to black
        stagger: 0.1,
        duration: 2,
        ease: 'none',
      })
        // Step 2: Delay slightly, then move "Our Story" up and fade it out
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
        // Step 3: Bring "From lightweight..." up from the bottom and fade in
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
        ) // The negative delay makes it overlap smoothly with the exit of text 1
        // Step 4: Fill the second heading letter by letter
        .to(
          chars2,
          {
            color: '#000000',
            stagger: 0.05, // Faster stagger since there are more letters
            duration: 3,
            ease: 'none',
          },
          '+=0.2'
        )
    }, sectionRef)

    return () => ctx.revert() // Cleanup on unmount
  }, [])

  // Helper function to split text into words, then characters.
  // This prevents words from breaking in half at the end of a line.
  const splitTextToChars = (text: string) => {
    return text.split(' ').map((word, wordIndex) => (
      <span key={wordIndex} className="mr-[0.3em] inline-block whitespace-nowrap">
        {word.split('').map((char, charIndex) => (
          <span
            key={charIndex}
            className="char text-cst-primary/20 inline-block" // Tailwind gray-300 hex
          >
            {char}
          </span>
        ))}
      </span>
    ))
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
                {splitTextToChars('Our Story')}
              </h2>
            </div>

            {/* Second Heading */}
            <div className="absolute flex w-full items-center justify-center px-4">
              <h2
                ref={text2Ref}
                // Starts hidden (opacity-0) so it doesn't flash before GSAP takes over
                className="mx-auto flex max-w-[90vw] flex-wrap justify-center text-center text-[3rem] leading-[1.1] font-black opacity-0 md:text-[4.5rem] lg:max-w-[50vw]"
              >
                {splitTextToChars('From lightweight to mission critical.')}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-cst-green mb-24 md:mx-24">
          <div className="mx-auto flex max-w-[60vw] flex-col gap-16 rounded-md px-4 py-24 md:p-24">
            <div className="flex flex-col gap-6 text-[1.1rem] leading-[1.6] text-white">
              <p>
                CoopGo launched its first product — <strong>easy-coop.de</strong> — in 2019 as a
                lightweight web interface for cooperative administrators. The response was instant:
                hundreds of cooperatives signed up within the first year, not because the product
                was exceptional, but because <em>nothing else existed</em> for this specific use
                case.
              </p>
              <p>
                As Germany&apos;s legal landscape evolved — particularly around the 2022 GenG
                amendments — it became evident that a lightweight tool was no longer sufficient.
                Cooperatives needed an end-to-end operating system.
              </p>
              <p>
                <strong>Coop-Pilot</strong> is that operating system. Built from the ground up on
                lessons learned from thousands of cooperative administrators, it represents four
                years of iteration and deep-domain expertise.
              </p>
            </div>
          </div>
        </div>

        {/* Block 3: Company Philosophy — Industrial Card (Light) */}
      </div>
      <div className="relative px-4 py-24 md:p-24">
        <Image
          src="/assets/bg.jpg"
          alt="CTA Background"
          width={100}
          height={100}
          className="absolute inset-0 h-full w-full bg-cover object-cover object-center brightness-50"
        />
        <div className="mx-auto max-w-[2000px]">
          <FadeContent blur delay={100} duration={900}>
            <div className="rounded-md bg-[#FBF9F6] p-10 lg:p-20">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
                <div>
                  <h2 className="mb-10 font-sans text-3xl leading-[1.1] font-extrabold tracking-tighter text-[#111113] uppercase md:text-4xl lg:text-5xl">
                    Built in Germany,
                    <br />
                    for Germany.
                  </h2>
                  <div className="flex flex-col gap-6 text-[1.1rem] leading-[1.6] text-[#4A4A4A]">
                    <p>
                      Coop-Pilot is the flagship product of{' '}
                      <a
                        href="https://coopgo.de"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cst-primary font-bold underline-offset-4 hover:underline"
                      >
                        CoopGo GmbH
                      </a>
                      . All infrastructure — from our databases to our code pipelines — runs on
                      servers physically located in the Federal Republic, ensuring your member data
                      never leaves German jurisdiction.
                    </p>
                    <p>
                      We are not a generic SaaS company. We are a cooperative-focused company from
                      day one.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-6 text-[1.1rem] leading-[1.6] text-[#4A4A4A] lg:pt-2">
                  <p>
                    Our team combines software engineers with backgrounds in legal technology,
                    former cooperative auditors (<em>Genossenschaftsprüfer</em>), and administrative
                    specialists.
                  </p>
                  <p>
                    We write features in close collaboration with the auditing associations (
                    <em>Prüfungsverbände</em>) and legal experts. When German law changes,
                    Coop-Pilot is updated as part of our core release cycle.
                  </p>
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
