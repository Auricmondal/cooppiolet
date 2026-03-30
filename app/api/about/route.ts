import { NextResponse } from 'next/server'
import { strapiRequest } from '@/lib/api'
import qs from 'qs'
import { AboutResponse } from '@/types/about'

export async function GET() {
  try {
    const query = qs.stringify(
      {
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
    console.error('Error fetching about data:', error)
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 })
  }
}
