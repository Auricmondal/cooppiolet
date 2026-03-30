import { Method, strapiRequest } from '@/lib/api'

import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    const res: any = await strapiRequest(`/navbar?locale=${lang}&populate=*`, Method.GET)

    return NextResponse.json(res.data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await strapiRequest('/newsletters', Method.POST, body)
    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.error?.message || 'Failed to subscribe to newsletter' },
      { status: error.response?.status || 500 }
    )
  }
}
