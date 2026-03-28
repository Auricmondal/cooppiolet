import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/privacy-policy?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_READONLY_TOKEN}`,
        },
      }
    )

    return NextResponse.json(res.data.data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
