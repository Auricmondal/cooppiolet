import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/privacy-policy?locale=${lang}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_READONLY_TOKEN}`,
        },
      }
    )

    return NextResponse.json(res.data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
