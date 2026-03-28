'use client'
import React from 'react'
import FadeContent from '@/components/animations/FadeContent'
import HeaderAnimation from '@/components/animations/HeaderAnimation'
import { Shield, BookOpen, Layers, Users } from 'lucide-react'
import Image from 'next/image'
import { H2 } from '../global/Typography'

const values = [
  {
    image: '/assets/hero.webp',
    cardBg: 'cst-primary/80',
    textColor: '#ffffff',
    bodyColor: 'rgba(255,255,255,0.85)',
    title: 'Sicherheit & Vertrauen',
    subtitle: 'Security & Trust',
    body: [
      `Your members' data is among the most sensitive information your cooperative holds. Housing records, financial contributions, personal identification documents, and governance votes — all of this lives inside Coop-Pilot. We take that responsibility seriously.`,
      `All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We operate exclusively on German-hosted infrastructure, meaning your member data never crosses into foreign legal jurisdictions.`,
      `We do not monetize your data. We do not sell insights derived from your members to third parties. Your cooperative's data is your data — full stop.`,
    ],
  },
  {
    image: '/assets/Frame 61.webp',
    cardBg: 'cst-primary/80',
    textColor: '#ffffff',
    bodyColor: 'rgba(255,255,255,0.85)',
    title: 'Genossenschaftliche Prinzipien',
    subtitle: 'Cooperative Philosophy',
    body: [
      `We are not neutral about cooperatives. We believe they represent one of the most structurally sound and socially resilient forms of business organization ever developed. The International Cooperative Alliance's seven principles are yours, and they are ours too.`,
      `Every product decision at CoopGo is evaluated against a simple question: does this empower cooperative administrators to uphold their legal obligations while strengthening member participation? We build for transparency.`,
      `The Genossenschaftsgesetz exists for a reason. We are here to make compliance with it a competitive advantage, not a burden.`,
    ],
  },
  {
    image: '/assets/Frame 92.webp',
    cardBg: 'cst-primary/80',
    textColor: '#ffffff',
    bodyColor: 'rgba(255,255,255,0.85)',
    title: 'Einfachheit',
    subtitle: 'Radical Simplicity',
    body: [
      `The administrators of most German cooperatives are not software engineers. They are farmers, housing managers, and community organizers. Coop-Pilot must be usable by someone who has never heard of an API.`,
      `Behind a one-click Beitrittserklärung workflow is a sophisticated compliance engine. The user sees a green checkmark. That is the goal.`,
      `We measure the success of every new feature by time-saved for the cooperative administrator who would otherwise be doing it manually.`,
    ],
  },
  {
    image: '/assets/Frame 93.webp',
    cardBg: 'cst-primary/80',
    textColor: '#ffffff',
    bodyColor: 'rgba(255,255,255,0.85)',
    title: 'Langfristige Partnerschaft',
    subtitle: 'Long-Term Partnership',
    body: [
      `We do not operate on a feature-release-and-forget model. When a cooperative signs up for Coop-Pilot, they are entering a long-term operational relationship with us.`,
      `That is why we provide comprehensive onboarding with guided data migration, direct access to a support team that understands cooperative law, and a committed update cycle triggered by changes in German law.`,
      `We also actively contribute to the broader cooperative digitization conversation in Germany, participating in Prüfungsverband discussions and publishing compliance guides.`,
    ],
  },
]

const ValuesSection = () => {
  return (
    <section className="w-full bg-[#FFFFFF]">
      <div className="mx-auto mb-24 max-w-[2000px] px-6">
        {/* Heading */}
        <div className="mb-24">
          <H2>
            <HeaderAnimation
              text="What we stand for."
              delay={40}
              animateBy="words"
              direction="bottom"
              className="justify-start font-serif text-4xl leading-[1.05] font-normal tracking-tight text-[#111113] md:text-5xl lg:text-[5.5rem]"
            />
          </H2>
          <FadeContent blur delay={400} duration={800}>
            <p className="max-w-2xl text-[1.15rem] leading-[1.7] text-[#4A4A4A]">
              These are not values written for a website. They are the principles that have shaped
              every product decision, every customer relationship, and every line of code we&apos;ve
              written since 2019.
            </p>
          </FadeContent>
        </div>

        <div className="relative flex flex-col gap-2 pb-[10vh] lg:block">
          {values.map((val, i) => {
            return (
              <div
                key={i}
                className="bg-cst-primary lg:bg-cst-primary/80 relative top-auto flex flex-col overflow-hidden rounded-md backdrop-blur-md lg:sticky lg:top-[var(--sticky-top)] lg:flex-row"
                style={
                  {
                    '--sticky-top': `calc(100px )`,
                    marginBottom: i === values.length - 1 ? '0' : '2rem',
                    zIndex: 10 + i,
                  } as React.CSSProperties
                }
              >
                {/* Left Column: Image (40%) */}
                {/* Added: lg:h-auto to ensure it stretches with the flex row instead of collapsing */}
                <div className="relative h-[250px] w-full shrink-0 overflow-hidden md:h-[350px] lg:h-auto lg:w-[40%]">
                  <Image
                    src={val.image}
                    alt={val.title}
                    fill // Replaced width={100} height={100} with fill
                    sizes="(max-width: 1024px) 100vw, 40vw" // Good practice for responsive performance
                    className="object-cover brightness-50 grayscale"
                  />
                </div>

                {/* Right Column: All the writing (60%) */}
                <div className="flex w-full flex-col justify-center p-8 md:p-12 lg:w-[60%] lg:p-20">
                  <h3
                    className="mb-8 font-serif text-3xl leading-[1.1] font-normal md:text-[2.2rem] lg:text-[3rem]"
                    style={{ color: val.textColor }}
                  >
                    {val.title}
                  </h3>

                  <div className="flex flex-col gap-6">
                    {val.body.map((para, j) => (
                      <p
                        key={j}
                        className="text-[1rem] leading-[1.6] md:text-[1.1rem]"
                        style={{ color: val.bodyColor }}
                      >
                        {para}
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
                &ldquo;A well-managed cooperative is a stronger cooperative. We exist to remove
                every barrier between excellent administration and the people doing it.&rdquo;
              </p>
              <p className="text-cst-primary/80 mt-8 text-sm md:mt-12 md:text-[11px]">
                CoopGo - Unternehmensvision
              </p>
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  )
}

export default ValuesSection
