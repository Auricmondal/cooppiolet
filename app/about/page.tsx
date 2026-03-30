import React from 'react'
import AboutHero from '@/components/about/AboutHero'
import StorySection from '@/components/about/StorySection'
import ValuesSection from '@/components/about/ValuesSection'
import ComplianceSection from '@/components/about/ComplianceSection'
import CTA from '@/components/global/CTA'
import type { Metadata } from 'next'
import { Method, strapiRequest } from '@/lib/api'
import qs from 'qs'
import { AboutResponse } from '@/types/about'
import { HomeResponse } from '@/types/home'

export const metadata: Metadata = {
  title: 'Über uns — CoopGo & Coop-Pilot',
  description:
    'Erfahren Sie mehr über CoopGo, das Unternehmen hinter Coop-Pilot — der führenden digitalen Verwaltungsplattform für deutsche Genossenschaften.',
}

const AboutPage = async () => {
  const aboutQuery = qs.stringify(
    {
      locale: 'en',
      populate: {
        Hero: { populate: '*' },
        about_cooppiolet: { populate: '*' },
        our_stand: {
          populate: {
            card: { populate: '*' },
          },
        },
        quote: { populate: '*' },
        overview: {
          populate: {
            card: { populate: '*' },
            badges: { populate: '*' },
          },
        },
      },
    },
    { encodeValuesOnly: true }
  )

  const homeQuery = qs.stringify(
    {
      locale: 'en',
      populate: {
        final_cta: true,
      },
    },
    { encodeValuesOnly: true }
  )

  const [aboutData, homeData] = await Promise.all([
    strapiRequest<AboutResponse>(`about?${aboutQuery}`, Method.GET),
    strapiRequest<HomeResponse>(`home?${homeQuery}`, Method.GET),
  ])

  return (
    <main className="flex min-h-screen w-full flex-col">
      <AboutHero initialData={aboutData} />
      <StorySection initialData={aboutData} />
      <ValuesSection initialData={aboutData} />
      <ComplianceSection initialData={aboutData} />
      <CTA initialData={homeData} />
    </main>
  )
}

export default AboutPage
