'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import HeaderAnimation from '@/components/animations/HeaderAnimation'
import FadeContent from '@/components/animations/FadeContent'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { HomeResponse } from '@/types/home'
import { Skeleton } from '@/components/ui/skeleton'
import { StrapiRichTextRenderer } from '../global/RichTextRenderer'
import { Node } from '@/types/strapiRichText'

const FAQ = () => {
  const { data, isLoading } = useQuery<HomeResponse>({
    queryKey: ['home'],
    queryFn: async () => {
      const res = await axios.get('/api/home')
      return res.data
    },
  })

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (isLoading) {
    return (
      <section className="w-full bg-[#FAFAFA] px-4 py-24 md:py-[180px]">
        <div className="mx-auto flex max-w-[900px] flex-col">
          <Skeleton className="mb-6 h-20 w-3/4" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  const faqData = data?.data?.faqs

  const faqs = faqData!.Faq.map((faq) => ({
    Question: faq.Question,
    Answer: faq.Answer,
  }))

  return (
    <section className="w-full bg-[#FAFAFA] px-4 py-24 md:py-[180px]">
      <div className="mx-auto flex max-w-[900px] flex-col">
        <div className="mb-20 text-left">
          <h2 className="mb-6 font-serif text-5xl font-medium tracking-tight text-slate-900 md:text-7xl lg:text-[80px]">
            <HeaderAnimation
              text={faqData?.tag || 'Frequently Asked'}
              delay={40}
              animateBy="words"
              direction="bottom"
            />
            {(!faqData?.tag || faqData.tag === 'FAQs') && (
              <HeaderAnimation
                text="Questions."
                delay={60}
                animateBy="words"
                direction="bottom"
                className="text-slate-400"
              />
            )}
          </h2>
        </div>

        <div className="flex w-full border-t border-black/10">
          <div className="w-full">
            {faqs.map(
              (
                faq: {
                  Question: string
                  Answer: Node[]
                },
                index
              ) => {
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
                          {faq.Question}
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
                          <StrapiRichTextRenderer content={faq.Answer} />
                        </div>
                      </div>
                    </div>
                  </FadeContent>
                )
              }
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
