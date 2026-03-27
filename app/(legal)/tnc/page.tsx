import LegalContent from '@/components/global/LegalContent'
import PrimaryWrapper from '@/components/Wrapper/PrimaryWrapper'
import { Method, strapiRequest } from '@/lib/api'
import { Legal } from '@/types/legal'

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
      <LegalContent
        effective_date={tnc.effective_date}
        id={tnc.id}
        legal_info={tnc.legal_info}
        title={tnc.title}
      />
    </PrimaryWrapper>
  )
}

export default page
