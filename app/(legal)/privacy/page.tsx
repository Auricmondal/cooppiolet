import PrimaryWrapper from '@/components/Wrapper/PrimaryWrapper'
import { Method, strapiRequest } from '@/lib/api'
import PrivacyClient from './PrivacyClient'

const PrivacyPage = async () => {
  const initialData = await strapiRequest('/privacy-policy?populate=*&locale=en', Method.GET)

  return (
    <PrimaryWrapper>
      <PrivacyClient initialData={initialData} />
    </PrimaryWrapper>
  )
}

export default PrivacyPage
