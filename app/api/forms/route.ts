import { NextResponse } from 'next/server'
import { Method, strapiRequest } from '@/lib/api'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const response = await strapiRequest('/forms', Method.POST, body)

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Error submitting form:', error.response?.data || error.message)
    return NextResponse.json(
      { error: error.response?.data?.error?.message || 'Failed to submit form' },
      { status: error.response?.status || 500 }
    )
  }
}

export async function GET() {
  try {
    try {
      const strapiContent: any = await strapiRequest('/form-content?populate=*', Method.GET)

      return NextResponse.json(strapiContent.data)
    } catch (err) {
      // Fallback if Strapi content isn't set up yet
      return NextResponse.json({
        steps: [
          { title: 'Contact Sales', description: 'We are here to answer your queries!' },
          {
            title: 'Could You Tell Us more about You?',
            description: 'We are here to answer your queries!',
          },
          {
            title: 'What time suit you the best?',
            description: 'We are here to answer your queries!',
          },
        ],
        purposeOptions: [
          { value: 'demo', label: 'Software Demo' },
          { value: 'pricing', label: 'Pricing Inquiry' },
          { value: 'other', label: 'Other' },
        ],
      })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
