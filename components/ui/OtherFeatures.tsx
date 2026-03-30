'use client'
import React from 'react'
import { User, Hexagon, Smartphone, Check } from 'lucide-react'
import FadeContent from '@/components/animations/FadeContent'

interface OtherFeaturesProps {
  data: {
    others: {
      title: string
      Feature: {
        feature_name: string
        id: number
      }
    }[]
    theme: string
  }
}

export const OtherFeatures = ({ data }: OtherFeaturesProps) => {
  return (
    <div className="mt-16 grid w-full grid-cols-1 gap-8 md:grid-cols-3">
      {data.others.map((col: any, idx: number) => {
        // Assigning sleek Lucide icons based on column index to match the shared image
        const IconComponent = idx === 0 ? User : idx === 1 ? Hexagon : Smartphone

        return (
          <FadeContent
            key={idx}
            blur
            delay={400 + idx * 150}
            duration={800}
            className="flex w-full"
          >
            <div
              className={`group flex w-full flex-col rounded-2xl transition-all duration-500 ${idx === 0 ? 'bg-green-300/80' : idx === 1 ? 'bg-purple-300/80' : 'bg-blue-300/80'} p-8 shadow-[0_8px_40px_rgb(0,0,0,0.03)] ring-slate-900/4 backdrop-blur-lg hover:-translate-y-2 hover:shadow-[0_20px_60px_rgb(0,0,0,0.06)] hover:ring-slate-900/8 xl:p-10`}
            >
              {/* Icon Block */}
              <div
                className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fafafa] shadow-sm ring-1 ring-slate-900/5 transition-all duration-500 group-hover:bg-slate-900`}
              >
                <IconComponent
                  className={`h-8 w-8 text-slate-700 transition-colors duration-500 group-hover:text-white`}
                  strokeWidth={1.2}
                />
              </div>

              <h3 className={`mb-8 text-2xl font-normal tracking-tight text-slate-900`}>
                {col.title}
              </h3>

              <ul className="mt-4 flex flex-col gap-5">
                {col.Feature.map((item: { feature_name: string; id: number }, i: number) => (
                  <li key={i} className="flex flex-row items-start gap-3.5">
                    <div
                      className={`bg-cst-green/10 group-hover:bg-cst-green/20 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-300`}
                    >
                      <Check className={`text-cst-green h-3.5 w-3.5`} strokeWidth={3} />
                    </div>
                    <span className={`text-[16px] leading-relaxed font-normal text-black`}>
                      {item.feature_name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeContent>
        )
      })}
    </div>
  )
}
