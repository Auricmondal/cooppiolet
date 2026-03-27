import { Method, strapiRequest } from '@/lib/api'
import CookieClient from './CookieClient'
import { CookieClientProps } from '@/types/cookie'
interface Data {
  data: CookieClientProps['content']
}
const Cookie = async () => {
  const data: Data = await strapiRequest('/cookie-content?populate=*', Method.GET)

  return <CookieClient content={data.data} />
}

export default Cookie
