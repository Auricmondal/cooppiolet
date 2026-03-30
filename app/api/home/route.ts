import { NextResponse } from 'next/server'
import { strapiRequest } from '@/lib/api'
import qs from 'qs'
import { HomeResponse } from '@/types/home'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'

    const query = qs.stringify(
      {
        locale: lang,
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

    const response = await strapiRequest<HomeResponse>(`home?${query}`)

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch home data' }, { status: 500 })
  }
}
