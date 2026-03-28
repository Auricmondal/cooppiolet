'use client'
import React from 'react'
import Link from 'next/link'
import FadeContent from '@/components/animations/FadeContent'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden border-t border-slate-200 bg-slate-50 pt-24 pb-8">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 z-0 rotate-45 overflow-hidden blur-[250px]">
        <div className="bg-cst-primary absolute top-0 -right-30 h-200 w-200 rounded-full"></div>
        <div className="absolute top-50 -right-30 h-200 w-200 rounded-full bg-[#5A65FF]"></div>
        <div className="bg-cst-secondary absolute -right-50 bottom-0 h-200 w-200 rounded-full"></div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000000 1px, transparent 1px),
            linear-gradient(to bottom, #000000 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
        }}
      ></div>

      {/* Abstract Animated Glows Behind the Boxes */}
      <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-linear-to-bl from-teal-100/50 via-emerald-50/20 to-transparent blur-[120px]"></div>
      <div className="pointer-events-none absolute bottom-1/2 left-0 h-[800px] w-[800px] rounded-full bg-linear-to-tr from-blue-100/50 via-indigo-50/30 to-transparent blur-[120px]"></div>

      <div className="relative z-10 mx-auto mb-24 max-w-[1400px] px-4 md:px-8">
        {/* Bento Grid Layout for Footer Content */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-12">
          {/* Box 1: Brand & Image Placeholder (Massive Left Box) */}
          <FadeContent
            blur
            delay={100}
            duration={800}
            className="flex md:col-span-12 lg:col-span-7"
          >
            <div className="group relative flex h-full min-h-[400px] w-full flex-col justify-between overflow-hidden rounded-md bg-white p-8 sm:p-12">
              {/* Optional background image integration like KaizenLabs inside the brand box */}
              <div
                className="absolute inset-0 z-0 opacity-[0.05] transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: "url('/assets/hero.webp')", backgroundSize: 'cover' }}
              ></div>
              <div className="absolute inset-0 z-0 bg-linear-to-br from-white via-white/80 to-transparent"></div>

              <div className="relative z-10">
                <Link
                  href="/"
                  className="mb-6 inline-block text-4xl font-black tracking-widest text-slate-900 uppercase"
                >
                  <Image
                    src="/assets/logo.svg"
                    alt="Cooppiolet Logo"
                    width={48}
                    height={48}
                    className="inline-block h-auto w-80"
                  />
                </Link>
                <p className="max-w-md font-sans text-lg leading-relaxed text-slate-600">
                  The all-in-one platform for cooperative management. Secure, powerful, and built
                  for modern standards.
                </p>
              </div>

              <div className="relative z-10 mt-16 inline-flex w-max items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-5 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-teal-500"></span>
                <span className="text-sm font-bold tracking-wide text-teal-800 uppercase">
                  All systems operational
                </span>
              </div>
            </div>
          </FadeContent>

          {/* Right Side Column containing smaller boxed grids */}
          <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-12 lg:col-span-5">
            {/* Box 2: Menu Links */}
            <FadeContent blur delay={200} duration={800} className="flex w-full">
              <div className="flex w-full flex-col rounded-md bg-white p-10 transition-all hover:border-teal-200">
                <h4 className="mb-8 flex items-center gap-3 text-[12px] font-bold tracking-widest text-teal-600 uppercase">
                  <span className="h-px w-4 bg-teal-600"></span>
                  Menu
                </h4>
                <nav className="flex flex-col gap-6">
                  <Link
                    href="#"
                    className="w-max text-lg font-medium text-slate-600 transition-all hover:translate-x-2 hover:text-slate-900"
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    className="w-max text-lg font-medium text-slate-600 transition-all hover:translate-x-2 hover:text-slate-900"
                  >
                    About
                  </Link>
                  <Link
                    href="#"
                    className="w-max text-lg font-medium text-slate-600 transition-all hover:translate-x-2 hover:text-slate-900"
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </FadeContent>

            {/* Box 3: Legal Links */}
            <FadeContent blur delay={300} duration={800} className="flex w-full">
              <div className="flex w-full flex-col rounded-md bg-white p-10 transition-all hover:border-blue-200">
                <h4 className="mb-8 flex items-center gap-3 text-[12px] font-bold tracking-widest text-blue-600 uppercase">
                  <span className="h-px w-4 bg-blue-600"></span>
                  Legals
                </h4>
                <nav className="flex flex-col gap-6">
                  <Link
                    href="#"
                    className="w-max text-lg font-medium text-slate-600 transition-all hover:translate-x-2 hover:text-slate-900"
                  >
                    Terms
                  </Link>
                  <Link
                    href="#"
                    className="w-max text-lg font-medium text-slate-600 transition-all hover:translate-x-2 hover:text-slate-900"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="#"
                    className="w-max text-lg font-medium text-slate-600 transition-all hover:translate-x-2 hover:text-slate-900"
                  >
                    Cookies
                  </Link>
                </nav>
              </div>
            </FadeContent>
          </div>

          {/* Box 4: Copyright & Socials (Full Width Bottom Bar inside the Bento Grid) */}
          <FadeContent blur delay={400} duration={800} className="md:col-span-12">
            <div className="flex w-full flex-col items-center justify-between rounded-md bg-white px-10 py-6 transition-all sm:flex-row">
              <span className="text-sm font-semibold text-slate-400">
                © {new Date().getFullYear()} Cooppiolet. All rights reserved.
              </span>
              <div className="mt-4 flex gap-8 sm:mt-0">
                <Link
                  href="#"
                  className="text-sm font-bold text-slate-500 transition-all hover:text-slate-900"
                >
                  X (Twitter)
                </Link>
                <Link
                  href="#"
                  className="text-sm font-bold text-slate-500 transition-all hover:text-slate-900"
                >
                  LinkedIn
                </Link>
                <Link
                  href="#"
                  className="text-sm font-bold text-slate-500 transition-all hover:text-slate-900"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </FadeContent>
        </div>
      </div>

      {/* Massive gradient typography for the brand name */}
      <div className="pointer-events-none relative z-0 mt-[-8vw] flex w-full items-end justify-center overflow-hidden">
        <h1
          className="bg-clip-text font-serif text-[24vw] leading-[0.7] font-black tracking-tighter text-transparent select-none"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(15, 23, 42, 0.08) 0%, rgba(15, 23, 42, 0.01) 100%)',
          }}
        >
          <Image
            src="/assets/logo.svg"
            alt="Cooppiolet Logo"
            width={48}
            height={48}
            className="inline-block h-auto w-[100vw] opacity-10"
          />
        </h1>
      </div>
    </footer>
  )
}

export default Footer
