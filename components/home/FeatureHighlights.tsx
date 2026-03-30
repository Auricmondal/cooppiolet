'use client'
import { ProductFeatureBlock, ThemeType } from '@/components/ui/ProductFeatureBlock'
import { OtherFeatures } from '@/components/ui/OtherFeatures'
import { FeatureListBlock } from '@/components/ui/FeatureListBlock'
import FadeContent from '@/components/animations/FadeContent'
import HeaderAnimation from '@/components/animations/HeaderAnimation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { HomeResponse, ProductFeature } from '@/types/home'
import { Skeleton } from '@/components/ui/skeleton'

const THEMES: ThemeType[] = ['teal', 'purple', 'burgundy', 'light-pink', 'forest']

const FeatureHighlights = () => {
  const { data, isLoading } = useQuery<HomeResponse>({
    queryKey: ['home'],
    queryFn: async () => {
      const res = await axios.get('/api/home')
      return res.data
    },
  })

  if (isLoading) {
    return (
      <div className="flex w-full flex-col">
        {[1, 2, 3].map((i) => (
          <section key={i} className="w-full bg-[#f8f9fa] py-[160px] md:py-[180px]">
            <div className="mx-auto max-w-[1200px] px-4">
              <Skeleton className="mb-8 h-10 w-32 rounded-full" />
              <Skeleton className="mb-8 h-20 w-3/4" />
              <Skeleton className="mb-16 h-24 w-1/2" />
              <div className="flex flex-col gap-10 lg:flex-row">
                <Skeleton className="h-[400px] flex-1 rounded-3xl" />
                <Skeleton className="h-[400px] flex-1 rounded-3xl" />
              </div>
            </div>
          </section>
        ))}
      </div>
    )
  }

  const products = data?.data?.product || []

  return (
    <div className="flex w-full flex-col">
      {products.map((p: ProductFeature, idx) => {
        const theme = THEMES[idx % THEMES.length]
        let bgClass = ''
        let type: string = 'Normal'

        if (p.type === 'Other Features') type = 'Other'
        if (p.type === 'Coming Soon' || p.type === 'Security') type = 'List'

        // // Map theme to background styles
        if (theme === 'teal')
          bgClass =
            'text-[#14140f] relative overflow-hidden bg-gradient-to-br from-[#089694] to-[#112A46]'
        if (theme === 'purple') bgClass = 'bg-[#f8f9fa] text-[#14140f] relative overflow-hidden'
        if (theme === 'burgundy')
          bgClass =
            'bg-gradient-to-br from-[#7e0848] to-[#331070] text-white relative overflow-hidden'
        if (theme === 'light-pink') bgClass = 'bg-[#fbfafd] text-[#14140f] relative overflow-hidden'
        if (theme === 'forest')
          bgClass =
            'bg-gradient-to-br from-[#097645] to-[#112A46] text-white relative overflow-hidden'

        const pillClass = 'bg-[#14140f] text-white shadow-none border-0'

        // Construct block data
        const blockData = {
          tagLabel: p.tag_label,
          title: p.title,
          description: p.description,
          type: type,
          theme: theme,
          alignment: (p.alignment?.toLowerCase() || 'left') as 'left' | 'right' | 'center',
          details: p.details || [],
          productImage: p.section_image,
          others: p.others || [],
          coming_soon: p.coming_soon || [],
          security: p.security || undefined,
          columns: [],
        }

        return (
          <section
            key={idx}
            className={`w-full py-[160px] md:py-[180px] ${bgClass} ${type === 'Other' ? "bg-[url('/assets/hero.webp')]" : ''} relative`}
            id={blockData.title.replace(/\s+/g, '-').toLowerCase()}
          >
            {/* gradient */}
            {type !== 'Other' && (
              <div
                className="absolute inset-0 z-0 overflow-hidden blur-[250px]"
                style={{ transform: `rotate(${idx * 15}deg)` }}
              >
                <div className="bg-cst-primary absolute top-0 -right-30 h-200 w-200 rounded-full"></div>
                <div className="absolute top-50 -right-30 h-200 w-200 rounded-full bg-[#5A65FF]"></div>
                <div className="bg-cst-secondary absolute -right-50 bottom-0 h-200 w-200 rounded-full"></div>
              </div>
            )}
            {/* Tactile Noise Texture Overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay"></div>

            <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col px-4">
              <div
                className={`mb-16 flex flex-col ${blockData.alignment === 'center' ? 'mx-auto max-w-4xl items-center text-center' : 'max-w-3xl items-start text-left'}`}
              >
                <FadeContent
                  blur
                  duration={1000}
                  className={`mb-8 inline-flex items-center gap-3 rounded-full px-5 py-2 text-[13px] font-bold tracking-widest transition-all ${pillClass}`}
                >
                  <span className="h-2 w-2 rounded-full bg-[#0ac6c3]"></span>
                  {blockData.tagLabel}
                </FadeContent>

                {!(blockData.security?.length ?? 0) && (
                  <div className="mb-8 w-full">
                    <HeaderAnimation
                      text={blockData.title}
                      delay={30}
                      animateBy="words"
                      direction="bottom"
                      className={`font-serif text-4xl leading-[1.05] font-normal tracking-[-0.03em] md:text-5xl lg:text-[72px] lg:leading-[0.95] ${blockData.alignment === 'center' ? 'mx-auto justify-center' : 'justify-start'} ${theme === 'light-pink' || theme === 'purple' || theme === 'teal' || type == 'Other' ? 'text-[#14140f]' : 'text-white'}`}
                    />
                  </div>
                )}

                {!(blockData.security?.length ?? 0) && (
                  <FadeContent
                    blur
                    delay={200}
                    duration={800}
                    className={`text-xl leading-[1.7] ${blockData.alignment === 'center' ? 'max-w-3xl' : 'max-w-2xl'} ${theme === 'light-pink' || theme === 'purple' || theme === 'teal' || type == 'Other' ? 'text-[#14140f]/70' : 'text-white/80'}`}
                  >
                    {blockData.description}
                  </FadeContent>
                )}
              </div>

              {type === 'Other' ? (
                <OtherFeatures data={blockData as any} />
              ) : type === 'List' ? (
                <FeatureListBlock data={blockData as any} />
              ) : (
                <ProductFeatureBlock data={blockData as any} index={idx} theme={theme} />
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default FeatureHighlights
