import React from 'react'
import Image from 'next/image'

const Logos = () => {
  const logos = [
    { src: '/assets/sm-logo-ohneclaim-vertikal-jpg.webp', alt: 'Partner Logo', height: 80 },
    {
      src: '/assets/Bundesministerium_für_Wirtschaft_und_Energie_Logo.webp',
      alt: 'Bundesministerium',
      height: 80,
    },
    { src: '/assets/Immaterielles_Kulturerbe_Logo_08.2018.webp', alt: 'Kulturerbe', height: 80 },
    { src: '/assets/EN_Co-fundedbytheEU_RGB_BLACK 1.webp', alt: 'Co-funded by EU', height: 80 },
  ]

  return (
    <section className="w-full bg-[#EAF1F0] px-4 pt-24 pb-12 md:pt-32">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 text-center">
        <p className="text-sm font-semibold tracking-wide text-[#20202d]">In partnership with</p>

        <div className="flex w-full flex-wrap items-center justify-center gap-12 md:gap-24">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center transition-all duration-500 ease-in-out hover:scale-105"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={300}
                height={logo.height}
                className="object-contain opacity-60 grayscale transition-all duration-500 ease-out group-hover:opacity-100 group-hover:drop-shadow-sm group-hover:grayscale-0"
                style={{ height: logo.height, width: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Logos
