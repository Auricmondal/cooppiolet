'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import HeaderAnimation from '@/components/animations/HeaderAnimation'
import FadeContent from '@/components/animations/FadeContent'
import { ModalContext, ModalType } from '@/context/ModalContext'
import { useContext } from 'react'

const CTA = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <section className="relative w-full overflow-hidden px-4 py-24 md:py-[200px]">
      {/* Full Section Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-fixed bg-center transition-transform duration-[10s] hover:scale-105"
        style={{ backgroundImage: "url('/assets/hero.webp')" }}
      ></div>

      {/* Dark Gradient Overlay to make text pop */}
      <div className="absolute inset-0 z-0 bg-slate-900/60 mix-blend-multiply"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40"></div>

      <div className="relative z-10 mx-auto flex max-w-[1000px] flex-col items-center text-center">
        <FadeContent blur delay={100} duration={800}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-teal-400"></span>
            <span className="pl-2 text-xs font-bold tracking-widest text-white uppercase">
              Take Your Operations to the Next Level
            </span>
          </div>
        </FadeContent>

        <h2 className="mb-8 font-serif text-5xl leading-[1.05] font-medium tracking-tight text-white md:text-7xl lg:text-[90px]">
          <HeaderAnimation
            text="Simplify your"
            delay={30}
            animateBy="words"
            direction="bottom"
            className="justify-center drop-shadow-lg"
          />
          <HeaderAnimation
            text="cooperative management."
            delay={60}
            animateBy="words"
            direction="bottom"
            className="mt-2 justify-center text-teal-300 drop-shadow-xl"
          />
        </h2>

        <FadeContent blur delay={200} duration={800}>
          <p className="mb-14 max-w-2xl font-sans text-xl leading-relaxed text-white/80 drop-shadow-md">
            Join hundreds of organizations that have already made the leap. Account creation takes
            less than two minutes.
          </p>
        </FadeContent>

        <FadeContent
          blur
          delay={400}
          duration={800}
          className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <Button variant="white" size="lg" className="w-full sm:w-auto">
            Create a Free Account
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            withDot
            onClick={() => openModal(ModalType.FORM, null)}
          >
            Request a Demo
          </Button>
        </FadeContent>

        <FadeContent blur delay={500} duration={800}>
          <p className="mt-8 text-sm font-medium tracking-wide text-white/50">
            No credit card required • Instant setup
          </p>
        </FadeContent>
      </div>
    </section>
  )
}

export default CTA
