'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import HeaderAnimation from '@/components/animations/HeaderAnimation'
import FadeContent from '@/components/animations/FadeContent'

const FAQ = () => {
  const faqs = [
    {
      question: 'Mon association est toute petite, cet outil est-il pour moi ?',
      answer:
        "Absolument. Nous avons pensé l'outil pour qu'il soit extrêmement simple à prendre en main, même sans compétences techniques. De plus, notre plan Essentiel est gratuit.",
    },
    {
      question: 'Comment se passe la migration de nos données actuelles ?',
      answer:
        "Nous mettons à votre disposition un module d'importation Excel/CSV très intuitif. De plus, notre équipe support peut vous accompagner lors de la migration initiale.",
    },
    {
      question: 'Les données de mes membres sont-elles en sécurité ?',
      answer:
        'Vos données sont hébergées sur des serveurs sécurisés en Europe. Nous respectons scrupuleusement le RGPD et nous nous engageons à ne jamais revendre vos données.',
    },
    {
      question: 'Puis-je personnaliser la plateforme aux couleurs de mon asso ?',
      answer:
        "Oui ! Le plan Pro vous permet d'intégrer votre logo, vos couleurs et de personnaliser l'URL de votre espace membre pour une marque blanche complète.",
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="w-full bg-[#FAFAFA] px-4 py-24 md:py-[180px]">
      <div className="mx-auto flex max-w-[900px] flex-col">
        <div className="mb-20 text-left">
          <h2 className="mb-6 font-serif text-5xl font-medium tracking-tight text-slate-900 md:text-7xl lg:text-[80px]">
            <HeaderAnimation
              text="Frequently Asked"
              delay={40}
              animateBy="words"
              direction="bottom"
            />
            <HeaderAnimation
              text="Questions."
              delay={60}
              animateBy="words"
              direction="bottom"
              className="text-slate-400"
            />
          </h2>
        </div>

        <div className="flex w-full border-t border-black/10">
          <div className="w-full">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <FadeContent
                  key={index}
                  blur
                  delay={300 + index * 100}
                  duration={800}
                  className="w-full"
                >
                  <div className="w-full border-b border-black/10 transition-colors duration-500 hover:bg-black/[0.02]">
                    <Button
                      variant="ghost"
                      className="group flex h-auto w-full items-center justify-between py-12 text-left whitespace-normal hover:bg-transparent"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="pr-8 font-sans text-xl font-medium tracking-tight text-slate-900 transition-transform duration-300 group-hover/button:translate-x-2 md:text-2xl">
                        {faq.question}
                      </span>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/10 transition-all duration-500 group-hover/button:bg-slate-900 group-hover/button:text-white">
                        {isOpen ? (
                          <Minus
                            className="rotate-180 transition-transform duration-500"
                            size={20}
                            strokeWidth={1.5}
                          />
                        ) : (
                          <Plus
                            className="transition-transform duration-500"
                            size={20}
                            strokeWidth={1.5}
                          />
                        )}
                      </div>
                    </Button>

                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'mb-8 grid-rows-[1fr] opacity-100' : 'mb-0 grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden px-6">
                        <p className="max-w-[80%] text-lg leading-relaxed text-slate-500">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeContent>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
