import React from 'react'
import Hero from '@/components/home/Hero'
import Logos from '@/components/home/Logos'
import Solutions from '@/components/home/Solutions'
import FeatureHighlights from '@/components/home/FeatureHighlights'
import FAQ from '@/components/home/FAQ'
import CTA from '@/components/global/CTA'

const page = () => {
  return (
    <main className="flex min-h-screen w-full flex-col overflow-hidden bg-white">
      <Hero />
      <Logos />
      <Solutions />
      <FeatureHighlights />
      <FAQ />
      <CTA />
    </main>
  )
}

export default page
