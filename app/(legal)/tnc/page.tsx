import LegalContent from '@/components/global/LegalContent'
import PrimaryWrapper from '@/components/Wrapper/PrimaryWrapper'
import { Method, strapiRequest } from '@/lib/api'
import { Legal } from '@/types/legal'
import TermClient from './TermClient'

interface Data {
  data: {
    Legal: Legal
  }
}
const page = async () => {
  const legalData: Data = await strapiRequest('/terms-and-condition?populate=*', Method.GET)
  const tnc: Legal = legalData.data.Legal
  return (
    <PrimaryWrapper>
      <TermClient initialData={legalData} />
    </PrimaryWrapper>
  )
}

export default page
