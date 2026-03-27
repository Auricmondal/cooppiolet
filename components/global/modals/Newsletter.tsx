import React from 'react'
import NewsletterClient from './NewsletterClient'
import { Method, strapiRequest } from '@/lib/api'
import { NewsletterContent } from '@/types/newsletter'

interface Data {
  data: NewsletterContent
}
const Newsletter = async () => {
  const data: Data = await strapiRequest('/newsletter-modal?populate=*', Method.GET)
  return <NewsletterClient content={data.data} />
}

export default Newsletter
