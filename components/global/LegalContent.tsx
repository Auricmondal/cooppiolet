import { Legal } from '@/types/legal'

import { StrapiRichTextRenderer } from './RichTextRenderer'
import BlurText from '../animations/HeaderAnimation'
import { H1, P } from './Typography'
import FadeContent from '../animations/FadeContent'

const LegalContent = ({ title, effective_date, id, legal_info }: Legal) => {
  const formattedDate = new Date(effective_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex flex-col gap-4">
      <H1>
        <BlurText
          text={title}
          delay={30}
          animateBy="letters"
          direction="bottom"
          className="mb-6 text-[4rem] font-bold"
        />
      </H1>
      <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
        <P className=" ">
          <span className="font-medium">Effective Date:</span> {formattedDate}
        </P>
      </FadeContent>
      <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
        <StrapiRichTextRenderer content={legal_info} />
      </FadeContent>
    </div>
  )
}

export default LegalContent
