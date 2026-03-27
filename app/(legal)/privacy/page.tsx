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
  const data: Data = await strapiRequest('/privacy-policy?populate=*', Method.GET)
  const privacy: Legal = data.data.Legal

  return (
    <PrimaryWrapper>
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
      <LegalContent
        effective_date={privacy.effective_date}
        id={privacy.id}
        legal_info={privacy.legal_info}
        title={privacy.title}
      />
    </PrimaryWrapper>
  )
}

export default page
