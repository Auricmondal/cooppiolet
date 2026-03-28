'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import InteractiveTabs, { TabData } from '@/components/ui/InteractiveTabs'
import HeaderAnimation from '@/components/animations/HeaderAnimation'
import { Network, PieChart, ArrowRightCircle, FileText, ShieldCheck, ScanLine } from 'lucide-react'

const TABS: TabData[] = [
  {
    id: 'members',
    title: 'Member Management and Onboarding',
    icon: <Network size={24} strokeWidth={1.5} />,
    image: '/assets/image 1.webp', // Placeholder, assumes first image is members concept
  },
  {
    id: 'shares',
    title: 'Share Management',
    icon: <PieChart size={24} strokeWidth={1.5} />,
    image: '/assets/Frame 92.webp',
  },
  {
    id: 'general',
    title: 'General Management',
    icon: <ArrowRightCircle size={24} strokeWidth={1.5} />,
    image: '/assets/Frame 68.webp', // Another office/concept mockup
  },
  {
    id: 'documents',
    title: 'Document Management',
    icon: <FileText size={24} strokeWidth={1.5} />,
    image: '/assets/hero.webp',
  },
  {
    id: 'audit',
    title: 'Audit trial and Compliance Engine',
    icon: <ShieldCheck size={24} strokeWidth={1.5} />,
    image: '/assets/Frame 61.webp',
  },
  {
    id: 'finance',
    title: 'Transaction and Finance',
    icon: <ScanLine size={24} strokeWidth={1.5} />,
    badge: 'Coming soon',
    image: '/assets/Frame 93.webp',
  },
]

const Solutions = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id)

  return (
    <section className="relative w-full overflow-hidden bg-[#EAF1F0]">
      {/* Intro section area */}
      <div className="relative z-10 mx-auto flex max-w-[800px] flex-col items-center px-4 pt-4 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#111113] px-4 py-1.5 text-sm font-medium text-white shadow-xl">
          <span className="bg-cst-secondary h-1.5 w-1.5 rounded-full"></span>
          Solutions
        </div>

        {/* Heading via HeaderAnimation */}
        <HeaderAnimation
          text="Your business has it all, we are making it easier."
          delay={40}
          animateBy="words"
          direction="bottom"
          className="mb-6 max-w-3xl justify-center text-4xl leading-tight font-[500] tracking-[-0.03em] text-slate-900 md:text-5xl lg:text-[54px]"
        />

        {/* Paragraph */}
        <p className="mb-16 max-w-3xl text-lg leading-relaxed font-normal text-slate-600 md:text-xl">
          With Cooppiolet, managing your cooperative is no longer a source of compliance anxiety.
          We&apos;ve replaced outdated, manual processes with a single, intuitive platform built
          specifically for the legal requirements of German cooperatives.
        </p>
      </div>

      {/* Tabs / Card area with immersive changing background images mimicking Kaizen Labs */}
      <div className="relative top-0 mt-12 w-full pt-16 pb-32">
        {/* Background Orchestration - Kaizen Labs style with big vignette */}
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          {TABS.map((tab) => {
            const isBgActive = activeTab === tab.id
            return (
              <div
                key={tab.id}
                className={`absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isBgActive ? 'z-10 opacity-100' : 'z-0 opacity-0'
                }`}
              >
                <Image
                  src={tab.image}
                  alt={`Background for ${tab.title}`}
                  fill
                  className="object-cover object-center opacity-40"
                />
              </div>
            )
          })}

          {/* Kaizen Labs style vignette / edge fading */}
          <div className="pointer-events-none absolute inset-0 z-20">
            {/* Top fade */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#EAF1F0] to-transparent"></div>
            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#EAF1F0] to-transparent"></div>
            {/* Left fade */}
            <div className="absolute top-0 bottom-0 left-0 hidden w-32 bg-gradient-to-r from-[#EAF1F0] to-transparent md:block"></div>
            {/* Right fade */}
            <div className="absolute top-0 right-0 bottom-0 hidden w-32 bg-gradient-to-l from-[#EAF1F0] to-transparent md:block"></div>
          </div>
        </div>

        <div className="relative z-30 mx-auto max-w-[1200px] px-4">
          {/* Interactive Tabs Component synced with Background state */}
          <InteractiveTabs tabs={TABS} activeTab={activeTab} onTabHover={setActiveTab} />
        </div>
      </div>
    </section>
  )
}

export default Solutions
