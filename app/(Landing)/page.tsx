import React from 'react'
import Hero from '@/components/home/Hero'
import Logos from '@/components/home/Logos'
import Solutions from '@/components/home/Solutions'
import FeatureHighlights from '@/components/home/FeatureHighlights'
import FAQ from '@/components/home/FAQ'
import CTA from '@/components/global/CTA'
import { Method, strapiRequest } from '@/lib/api'
import qs from 'qs'
import { HomeResponse } from '@/types/home'

const page = async () => {
  const query = qs.stringify(
    {
      locale: 'en',
      populate: {
        hero: { populate: '*' },
        partners: { populate: '*' },
        solutions: {
          populate: {
            solutions: {
              populate: '*',
            },
          },
        },
        product: {
          populate: {
            section_image: {
              populate: '*',
            },
            details: {
              populate: '*',
            },
            coming_soon: {
              populate: '*',
            },
            others: {
              populate: '*',
            },
            security: {
              populate: '*',
            },
          },
        },
        faqs: { populate: '*' },
        final_cta: true,
      },
    },
    { encodeValuesOnly: true }
  )

  const data = await strapiRequest<HomeResponse>(`home?${query}`, Method.GET)

  return (
    <main className="flex min-h-screen w-full flex-col overflow-hidden bg-white">
      <Hero initialData={data} />
      <Logos initialData={data} />
      <Solutions initialData={data} />
      <FeatureHighlights initialData={data} />
      <FAQ initialData={data} />
      <CTA initialData={data} />
    </main>
  )
}

export default page
