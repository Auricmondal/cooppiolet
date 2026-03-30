import { Method, strapiRequest } from '@/lib/api'
import { FooterResponse } from '@/types/footer'

import { NextResponse } from 'next/server'
import qs from 'qs'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'

    const query = qs.stringify(
      {
        locale: lang,
        populate: {
          Footer: {
            populate: {
              Links: {
                populate: '*',
              },
              social_links: {
                populate: '*',
              },
              footer_logo: {
                populate: '*',
              },
              logo: {
                populate: '*',
              },
            },
          },
        },
      },
      { encodeValuesOnly: true }
    )
    const res: { data: FooterResponse } = await strapiRequest<{ data: FooterResponse }>(
      `footer?${query}`,
      Method.GET
    )

    return NextResponse.json(res.data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
