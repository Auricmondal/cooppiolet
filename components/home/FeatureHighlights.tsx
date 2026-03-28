import { ProductFeatureBlock, ProductFeatureData } from '@/components/ui/ProductFeatureBlock'
import { OtherFeatures } from '@/components/ui/OtherFeatures'
import { FeatureListBlock } from '@/components/ui/FeatureListBlock'
import FadeContent from '@/components/animations/FadeContent'
import HeaderAnimation from '@/components/animations/HeaderAnimation'

export const dummyBackendData: any[] = [
  {
    tagLabel: 'Members',
    title: 'We know how important is it to get good talents and manage them, we make it easier.',
    description:
      'Fully decoupled architectural tracking keeping all your team communication flawless.',
    type: 'Normal',
    theme: 'teal',
    alignment: 'right', // Image on the left
    details: [
      {
        title: 'Document Flow Mechanics',
        description: 'Automatically track, sign, and store every critical PDF payload.',
      },
      {
        title: 'Database Synchronization',
        description: 'Maintain a compliant database of your members with live read-replicas.',
      },
      {
        title: 'Compliance Metrics',
        description: 'Update statuses seamlessly without running complex migrations.',
      },
    ],
    productImage: '/assets/Frame 68.webp', // Mocking image
  },
  {
    tagLabel: 'Collaboration',
    title: 'We know how important is it to get good talents and manage them, we make it easier.',
    description:
      'Fully decoupled architectural tracking keeping all your team communication flawless.',
    type: 'Normal',
    theme: 'purple',
    alignment: 'left', // Image on the left
    details: [
      {
        title: 'Document Flow Mechanics',
        description: 'Automatically track, sign, and store every critical PDF payload.',
      },
      {
        title: 'Database Synchronization',
        description: 'Maintain a compliant database of your members with live read-replicas.',
      },
      {
        title: 'Compliance Metrics',
        description: 'Update statuses seamlessly without running complex migrations.',
      },
    ],
    productImage: '/assets/Frame 68.webp', // Mocking image
  },
  {
    tagLabel: 'Generalversammlung',
    title: 'We know how important is it to get good talents and manage them, we make it easier.',
    description:
      "Digital Beitrittserklärung Process membership applications with legal precision. Every entry is documented to ensure your cooperative remains rechtssicher from the first day of a new member's term.",
    type: 'Normal',
    theme: 'burgundy',
    alignment: 'right', // Image on the right
    details: [
      {
        title: 'Digital Membership Application',
        description:
          'No more paper signatures or physical forms. Since January 2025, members join via a simple digital platform. What used to take a week of paperwork now takes a morning.',
      },
      {
        title: 'Member Register',
        description: 'Maintain a compliant, fully sorted database of all your cooperative members.',
      },
      {
        title: 'Member Status Management',
        description: 'Instantly update or review active, pending, or former members seamlessly.',
      },
      {
        title: 'KYC / Identity Verification',
        description:
          'Automated identity checks fulfilling all stringent German KYC requirements instantly.',
      },
    ],
    productImage: '/assets/image 1.webp',
  },
  {
    tagLabel: 'Document Management',
    title: 'We know how important is it to get good talents and manage them, we make it easier.',
    description:
      "Digital Beitrittserklärung Process membership applications with legal precision. Every entry is documented to ensure your cooperative remains rechtssicher from the first day of a new member's term.",
    type: 'Normal',
    theme: 'light-pink',
    alignment: 'left', // Image on the left
    details: [
      {
        title: 'Digital Membership Application',
        description:
          'No more paper signatures or physical forms. Since January 2025, members join via a simple digital platform.',
      },
      {
        title: 'Member Register',
        description: 'Maintain a compliant database of your members.',
      },
      {
        title: 'Member Status Management',
        description: 'Update statuses seamlessly.',
      },
      {
        title: 'KYC / Identity Verification',
        description: 'Automated identity checks ensuring security.',
      },
    ],
    productImage: '/assets/Frame 68.webp',
  },
  {
    tagLabel: 'Admin',
    title: 'We know how important is it to get good talents and manage them, we make it easier.',
    description:
      "Digital Beitrittserklärung Process membership applications with legal precision. Every entry is documented to ensure your cooperative remains rechtssicher from the first day of a new member's term.",
    type: 'Normal',
    theme: 'forest',
    alignment: 'right', // Image on the right
    details: [
      {
        title: 'Digital Membership Application',
        description:
          'No more paper signatures or physical forms. Since January 2025, members join via a simple digital platform.',
      },
      {
        title: 'Member Register',
        description: 'Maintain a compliant database of your members.',
      },
      {
        title: 'Member Status Management',
        description: 'Update statuses seamlessly.',
      },
      {
        title: 'KYC / Identity Verification',
        description: 'Automated identity checks ensuring security.',
      },
    ],
    productImage: '/assets/Frame 93.webp',
  },
  {
    tagLabel: 'Members',
    title: 'We know how important is it to get good talents and manage them, we make it easier.',
    description:
      "Digital Beitrittserklärung Process membership applications with legal precision. Every entry is documented to ensure your cooperative remains rechtssicher from the first day of a new member's term.",
    type: 'Other',
    theme: 'light-minimal',
    alignment: 'center',
    columns: [
      {
        title: 'Member Portal',
        items: [
          'Member Self-Service - Own Data Access',
          'Digital Membership Cancellation',
          'Digital Proxy Grant through Member Portal',
          'Member Portal - Voting in Virtual and Stretched Assemblies',
        ],
      },
      {
        title: 'Settings',
        items: [
          'Cooperative Configuration - Legal Parameters',
          'Multi-Cooperative Support (White Label / Multi-Tenancy)',
        ],
      },
      {
        title: 'Communications',
        items: ['Structured Member Communications with Delivery Record'],
      },
    ],
  },
  {
    tagLabel: 'Security',
    title: 'Data Security and Transparency',
    description:
      'Every process adheres strictly to the Genossenschaftsgesetz and current EU data mandates. Your data is your own.',
    type: 'List',
    theme: 'security-white',
    alignment: 'right', // Image on the left
    items: [
      {
        title: 'Legal Compliance',
        description: 'Certified German standards for peace-of-mind.',
        icon: 'LockKeyhole',
        variant: 'default',
      },
      {
        title: 'Data Sovereignty',
        description: 'Hosted exclusively on local German servers.',
        icon: 'Database',
        variant: 'dashed',
      },
      {
        title: 'Encryption',
        description: 'Military-grade AES-256 for all shared assets.',
        icon: 'ShieldHalf',
        variant: 'default',
      },
      {
        title: 'Audit Logs',
        description: 'Every single state change is cryptographically hashed.',
        icon: 'FileSearch',
        variant: 'default',
      },
    ],
    footerBadges: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/General_Data_Protection_Regulation_logo.svg',
        label: 'GDPR',
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/General_Data_Protection_Regulation_logo.svg',
        label: 'GDPR',
      },
    ],
    productImage: '/assets/image 1.webp',
  },
  {
    tagLabel: 'Coming Soon',
    title: 'Transactions & Finance',
    description:
      "Built for German standards. Modular, scalable, and fully GoBD-compliant for your cooperative's growth.",
    type: 'List',
    theme: 'finance-white',
    items: [
      {
        title: 'Transactions & Finance',
        icon: 'Coins',
        variant: 'default',
      },
      {
        title: 'GoBD-Compliant Ledger',
        icon: 'FileText',
        variant: 'default',
      },
      {
        title: 'DATEV Automated Export',
        icon: 'ArrowUpRight',
        variant: 'default',
      },
      {
        title: 'Annual Overview',
        icon: 'BarChartHorizontal',
        variant: 'default',
      },
    ],
    productImage: '/assets/Frame 93.webp',
  },
]

const FeatureHighlights = () => {
  return (
    <div className="flex w-full flex-col">
      {dummyBackendData.map((data, idx) => {
        let bgClass = ''

        // Select the pristine exact gradients differentiating each of the 5 themes
        if (data.theme == 'teal')
          bgClass =
            'text-[#14140f] relative overflow-hidden bg-gradient-to-br from-[#089694] to-[#112A46] '
        if (data.theme === 'light-minimal')
          bgClass = 'bg-[#FAFAFA] text-[#14140f] relative overflow-hidden'
        if (data.theme === 'purple')
          bgClass = 'bg-[#f8f9fa] text-[#14140f] relative overflow-hidden'
        if (data.theme === 'burgundy')
          bgClass =
            'bg-gradient-to-br from-[#7e0848] to-[#331070] text-white relative overflow-hidden'
        if (data.theme === 'light-pink')
          bgClass = 'bg-[#fbfafd] text-[#14140f] relative overflow-hidden'
        if (data.theme === 'forest')
          bgClass =
            'bg-gradient-to-br from-[#097645] to-[#112A46] text-white relative overflow-hidden'

        // --- SIGNATURE "BLOOM" GRADIENTS (KAIZEN STYLE) ---
        if (data.theme === 'security-white')
          bgClass = 'bg-white text-[#14140f] relative overflow-hidden'
        if (data.theme === 'finance-white')
          bgClass = 'bg-[#fdfcfb] text-[#14140f] relative overflow-hidden'

        const pillClass = 'bg-[#14140f] text-white shadow-none border-0'

        return (
          <section
            key={idx}
            className={`w-full py-[160px] md:py-[180px] ${bgClass} ${data.type == 'Other' ? "bg-[url('/assets/hero.webp')]" : ''}`}
          >
            {/* Tactile Noise Texture Overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay"
              style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}
            ></div>

            {/* Signature atmospheric radial blooms (blooms / ethereal highlights) */}
            {data.theme === 'security-white' && (
              <>
                <div className="absolute top-0 right-0 z-0 h-[1000px] w-[1000px] translate-x-1/4 -translate-y-1/2 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#e0f2fe] via-transparent to-transparent opacity-60 blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 z-0 h-[800px] w-[800px] -translate-x-1/4 translate-y-1/4 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#f5f3ff] via-transparent to-transparent opacity-40 blur-[100px]"></div>
              </>
            )}

            {data.theme === 'finance-white' && (
              <>
                <div className="absolute top-0 left-0 z-0 h-[1200px] w-[1200px] -translate-x-1/4 -translate-y-1/2 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#fff7ed] via-transparent to-transparent opacity-50 blur-[140px]"></div>
                <div className="absolute right-0 bottom-0 z-0 h-[900px] w-[900px] translate-x-1/4 translate-y-1/4 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#f0fdf4] via-transparent to-transparent opacity-30 blur-[100px]"></div>
              </>
            )}

            {/* Gentle noise overlay universally applied like before */}
            <div
              className={`pointer-events-none absolute inset-0 z-0 mix-blend-overlay ${data.theme === 'light-pink' || data.theme === 'purple' ? 'opacity-[0.25]' : 'opacity-40'}`}
              style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
            ></div>

            {/* Purple & Pink atmospheric radial blooms explicitly matching layouts */}
            {data.theme === 'purple' && (
              <div className="pointer-events-none absolute right-0 bottom-[-20%] z-0 h-[800px] w-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#cdbaf1] to-transparent bg-cover opacity-60 mix-blend-multiply blur-[100px]"></div>
            )}
            {data.theme === 'light-pink' && (
              <div className="pointer-events-none absolute top-1/2 right-0 z-0 h-[1000px] w-[1000px] translate-x-[20%] -translate-y-1/2 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ffb6c1]/70 via-[#ffd1dc]/40 to-transparent opacity-100 mix-blend-multiply blur-[80px]"></div>
            )}

            <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col px-4">
              <div
                className={`mb-16 flex flex-col ${data.alignment === 'center' ? 'mx-auto max-w-4xl items-center text-center' : 'max-w-3xl items-start text-left'}`}
              >
                <FadeContent
                  blur
                  duration={1000}
                  className={`mb-8 inline-flex items-center gap-3 rounded-full px-5 py-2 text-[13px] font-bold tracking-widest transition-all ${pillClass}`}
                >
                  <span className="h-2 w-2 rounded-full bg-[#0ac6c3]"></span>
                  {data.tagLabel}
                </FadeContent>

                <div className="mb-8 w-full">
                  <HeaderAnimation
                    text={data.title}
                    delay={30}
                    animateBy="words"
                    direction="bottom"
                    className={`font-serif text-4xl leading-[1.05] font-normal tracking-[-0.03em] md:text-5xl lg:text-[72px] lg:leading-[0.95] ${data.alignment === 'center' ? 'mx-auto justify-center' : 'justify-start'} ${data.theme === 'light-pink' || data.theme === 'purple' || data.theme === 'light-minimal' || data.theme === 'security-white' || data.theme === 'finance-white' ? 'text-[#14140f]' : 'text-white'}`}
                  />
                </div>

                <FadeContent
                  blur
                  delay={200}
                  duration={800}
                  className={`text-xl leading-[1.7] ${data.alignment === 'center' ? 'max-w-3xl' : 'max-w-2xl'} ${data.theme === 'light-pink' || data.theme === 'purple' || data.theme === 'light-minimal' || data.theme === 'security-white' || data.theme === 'finance-white' ? 'text-[#14140f]/70' : 'text-white/80'}`}
                >
                  {data.description}
                </FadeContent>
              </div>

              {data.type === 'Other' ? (
                <OtherFeatures data={data} />
              ) : data.type === 'List' ? (
                <FeatureListBlock data={data} />
              ) : (
                <ProductFeatureBlock data={data} index={idx} theme={data.theme} />
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default FeatureHighlights
