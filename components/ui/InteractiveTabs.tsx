import React from 'react'
import Image from 'next/image'
import { ArrowRightCircle } from 'lucide-react'

export interface TabData {
  id: string
  title: string
  icon: React.ReactNode
  image: string
  badge?: string
}

interface InteractiveTabsProps {
  tabs: TabData[]
  activeTab: string
  onTabHover: (id: string) => void
}

const InteractiveTabs = ({ tabs, activeTab, onTabHover }: InteractiveTabsProps) => {
  const activeContent = tabs.find((t) => t.id === activeTab) || tabs[0]

  return (
    <div className="flex min-h-[550px] w-full flex-col overflow-hidden rounded-[2rem] bg-white p-4 shadow-[0_40px_100px_rgba(0,0,0,0.15)] ring-4 ring-white/60 backdrop-blur-md lg:flex-row lg:p-6">
      {/* Left Sidebar (Tabs) */}
      <div className="flex w-full flex-col gap-2 py-4 lg:w-[450px] lg:pr-6">
        <h3 className="mb-6 px-4 text-xl font-medium text-slate-800">What We help you with:</h3>
        <div className="flex flex-col gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onMouseEnter={() => onTabHover(tab.id)}
                onClick={() => onTabHover(tab.id)}
                className={`group flex items-center justify-between gap-4 rounded-[1.2rem] p-3 text-left transition-all duration-500 ease-out ${
                  isActive
                    ? 'scale-[1.02] bg-[#F4F6F6] shadow-inner'
                    : 'bg-transparent hover:bg-slate-50'
                }`}
              >
                <div className="flex w-full items-center gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${isActive ? 'bg-cst-green shadow-cst-green/30 scale-105 text-white shadow-lg' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-500'}`}
                  >
                    {tab.icon}
                  </div>
                  <div className="flex flex-1 flex-col items-start gap-1">
                    {tab.badge && (
                      <span className="-mb-0.5 rounded-full bg-[#dc1186] px-2 py-[2px] text-[0.6rem] leading-none font-bold tracking-widest text-white uppercase">
                        {tab.badge}
                      </span>
                    )}
                    <span
                      className={`pr-2 text-[0.95rem] leading-tight font-[500] transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-800'}`}
                    >
                      {tab.title}
                    </span>
                  </div>
                </div>

                <ArrowRightCircle
                  size={20}
                  strokeWidth={1.5}
                  className={`mr-2 shrink-0 transition-all duration-500 ${isActive ? 'text-cst-green translate-x-0 opacity-100' : '-translate-x-4 text-transparent opacity-0'}`}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Right Content Area (Image Display) */}
      <div className="relative mt-6 flex-1 overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-inner lg:mt-0 lg:ml-2">
        {/* Using absolute stacked images to create a very smooth immersive crossfade within the card */}
        {tabs.map((tab) => {
          const isImageActive = activeTab === tab.id
          return (
            <Image
              key={tab.id}
              src={tab.image}
              alt={tab.title}
              fill
              priority
              className={`object-cover object-center transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isImageActive ? 'blur-0 scale-100 opacity-100' : 'scale-105 opacity-0 blur-sm'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default InteractiveTabs
