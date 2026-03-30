import { Method, strapiRequest } from '@/lib/api'
import FooterClient from './FooterClient'
import qs from 'qs'
import { FooterResponse } from '@/types/footer'

const Footer = async () => {
  const query = qs.stringify(
    {
      locale: 'en',
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
  const data: {
    data: FooterResponse
  } = await strapiRequest(`footer?${query}`, Method.GET)

  return <FooterClient content={data?.data} />
}

export default Footer
