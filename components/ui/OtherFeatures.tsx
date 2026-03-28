'use client'
import React from 'react'
import { User, Hexagon, Smartphone, Check } from 'lucide-react'
import FadeContent from '@/components/animations/FadeContent'

interface OtherFeaturesProps {
  data: {
    columns: {
      title: string
      items: string[]
    }[]
    theme: string
  }
}

export const OtherFeatures = ({ data }: OtherFeaturesProps) => {
  const isDarkTheme = data.theme === 'burgundy' || data.theme === 'forest'

  return (
    <div className="mt-16 grid w-full grid-cols-1 gap-8 md:grid-cols-3">
      {data.columns.map((col: any, idx: number) => {
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
              className={`group flex w-full flex-col transition-all duration-500 ${
                isDarkTheme
                  ? 'bg-transparent' // Transparent for dark themes as per screenshot
                  : `rounded-2xl ${idx === 0 ? 'bg-green-300/80' : idx === 1 ? 'bg-purple-300/80' : 'bg-blue-300/80'} p-8 shadow-[0_8px_40px_rgb(0,0,0,0.03)] ring-slate-900/4 backdrop-blur-lg hover:-translate-y-2 hover:shadow-[0_20px_60px_rgb(0,0,0,0.06)] hover:ring-slate-900/8 xl:p-10`
              }`}
            >
              {/* Icon Block */}
              <div
                className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 ${
                  isDarkTheme
                    ? 'border border-white/20 bg-transparent group-hover:bg-white/10'
                    : 'bg-[#fafafa] shadow-sm ring-1 ring-slate-900/5 group-hover:bg-slate-900'
                }`}
              >
                <IconComponent
                  className={`h-8 w-8 transition-colors duration-500 ${
                    isDarkTheme
                      ? 'text-amber-400 group-hover:text-white'
                      : 'text-slate-700 group-hover:text-white'
                  }`}
                  strokeWidth={1.2}
                />
              </div>

              <h3
                className={`mb-8 text-2xl font-normal tracking-tight ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}
              >
                {col.title}
              </h3>

              <ul className="mt-4 flex flex-col gap-5">
                {col.items.map((item: string, i: number) => (
                  <li key={i} className="flex flex-row items-start gap-3.5">
                    <div
                      className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isDarkTheme
                          ? 'bg-amber-400/20'
                          : 'bg-cst-green/10 group-hover:bg-cst-green/20'
                      }`}
                    >
                      <Check
                        className={`h-3.5 w-3.5 ${isDarkTheme ? 'text-amber-400' : 'text-cst-green'}`}
                        strokeWidth={3}
                      />
                    </div>
                    <span className={`text-[16px] leading-relaxed font-normal text-black/70`}>
                      {item}
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
