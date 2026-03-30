import { NextResponse } from 'next/server'
import { strapiRequest } from '@/lib/api'
import qs from 'qs'
import { AboutResponse } from '@/types/about'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'

    const query = qs.stringify(
      {
        locale: lang,
        populate: {
          Hero: {
            populate: '*',
          },
          about_cooppiolet: { populate: '*' },
          our_stand: {
            populate: {
              card: {
                populate: '*',
              },
            },
          },
          quote: {
            populate: '*',
          },
          overview: {
            populate: {
              card: {
                populate: '*',
              },
              badges: {
                populate: '*',
              },
            },
          },
        },
      },
      { encodeValuesOnly: true }
    )

    const response = await strapiRequest<AboutResponse>(`about?${query}`)

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 })
  }
}
