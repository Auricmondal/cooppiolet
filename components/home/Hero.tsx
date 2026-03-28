import React from 'react'
import Image from 'next/image'
import HeaderAnimation from '@/components/animations/HeaderAnimation'

const Hero = () => {
  return (
    <section className="relative flex min-h-[100vh] flex-col items-center justify-start overflow-hidden pt-32 pb-48 lg:min-h-screen lg:pt-40">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/assets/hero.webp"
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-30 flex w-full max-w-[1200px] flex-col items-center px-4 text-center">
        {/* Eyebrow */}
        <div className="border-cst-neutral-03 mb-8 inline-flex items-center gap-3 rounded-full border bg-white/60 p-1.5 pr-6 text-sm font-medium shadow-sm backdrop-blur-md">
          <span className="bg-cst-secondary rounded-full px-3 py-1 text-xs font-bold tracking-wider text-black uppercase backdrop-blur-sm">
            New
          </span>
          <span className="text-slate-600">The legal standard for your board.</span>
        </div>

        <HeaderAnimation
          text={'Modern People Fast \n Software For German \n Businesses'}
          delay={50}
          animateBy="words"
          wordStyles={{ German: 'text-[#760948] font-medium' }}
          direction="bottom"
          className="max-w-4xl justify-center text-6xl leading-none font-light tracking-[-0.05em] text-[#111113] md:text-7xl lg:text-[85px]"
        />

        {/* P */}
        <p className="mt-6 max-w-[600px] text-lg leading-relaxed font-normal text-[#242429] md:text-xl">
          Present hassle of maintaining mountains of excel sheets full of billions of data is
          tiring, we help solve that very easily.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button className="group flex items-center gap-3 rounded-full bg-black px-10 py-5 text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 hover:bg-slate-900">
            Talk to an Expert
            <span className="bg-cst-secondary h-2.5 w-2.5 rounded-full transition-transform group-hover:scale-125"></span>
          </button>
        </div>
      </div>

      {/* Floating Dashboard Interface & Icons */}
      <div className="z-20 w-full max-w-[1000px] translate-y-[20%] px-8">
        {/* Left side floating icons */}
        <div className="absolute -top-16 -left-12 z-30 hidden transition-transform hover:scale-105 lg:block">
          <Image
            src="/assets/documents.png"
            alt="Documents layout"
            width={110}
            height={110}
            className="-rotate-[15deg] object-contain drop-shadow-2xl"
          />
        </div>
        <div className="absolute top-[20%] -left-20 z-30 hidden transition-transform hover:scale-105 lg:block">
          <Image
            src="/assets/flash.png"
            alt="Flash layout"
            width={110}
            height={110}
            className="rotate-6 object-contain drop-shadow-2xl"
          />
        </div>
        <div className="absolute top-[60%] -left-16 z-30 hidden transition-transform hover:scale-105 lg:block">
          <Image
            src="/assets/chat.png"
            alt="Chat layout"
            width={110}
            height={110}
            className="-rotate-6 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right side floating icons */}
        <div className="absolute -top-12 -right-8 z-30 hidden transition-transform hover:scale-105 lg:block">
          <Image
            src="/assets/excel.png"
            alt="Excel layout"
            width={110}
            height={110}
            className="rotate-[15deg] object-contain drop-shadow-2xl"
          />
        </div>
        <div className="absolute top-[30%] -right-16 z-30 hidden transition-transform hover:scale-105 lg:block">
          <Image
            src="/assets/member.png"
            alt="Member layout"
            width={110}
            height={110}
            className="-rotate-12 object-contain drop-shadow-2xl"
          />
        </div>
        <div className="absolute top-[70%] -right-10 z-30 hidden transition-transform hover:scale-105 lg:block">
          <Image
            src="/assets/security.png"
            alt="Security layout"
            width={110}
            height={110}
            className="rotate-6 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Dashboard Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] border-2 border-slate-100 bg-white shadow-[0_40px_100px_rgba(0,0,0,0.15)] ring-4 ring-white">
          <Image
            src="/assets/Image 1.webp"
            alt="Platform Dashboard Preview"
            width={100}
            height={100}
            className="h-auto w-full object-top"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
