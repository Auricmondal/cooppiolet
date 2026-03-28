import React from 'react'
import AboutHero from '@/components/about/AboutHero'
import StorySection from '@/components/about/StorySection'
import ValuesSection from '@/components/about/ValuesSection'
import ComplianceSection from '@/components/about/ComplianceSection'
import CTA from '@/components/global/CTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über uns — CoopGo & Coop-Pilot',
  description:
    'Erfahren Sie mehr über CoopGo, das Unternehmen hinter Coop-Pilot — der führenden digitalen Verwaltungsplattform für deutsche Genossenschaften.',
}

const AboutPage = () => {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <ComplianceSection />
      <CTA />
    </main>
  )
}

export default AboutPage
