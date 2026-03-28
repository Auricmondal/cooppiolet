import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import Image from 'next/image'
import { FileText, Users, Building2, Calendar, LayoutDashboard } from 'lucide-react'

const TABS = [
  {
    id: 'gestion',
    title: 'Gestion Administrative',
    icon: <FileText size={20} />,
    description: 'Centralisez tous vos documents et automatisez vos tâches récurrentes.',
    image: '/assets/Frame 68.webp',
  },
  {
    id: 'communaute',
    title: 'Animation de Communauté',
    icon: <Users size={20} />,
    description: 'Engagez vos membres avec des outils de communication internes fluides.',
    image: '/assets/Frame 92.webp', // Reusing available assets for demo
  },
  {
    id: 'finances',
    title: 'Suivi Financier',
    icon: <Building2 size={20} />,
    description: 'Un pilotage clair de votre trésorerie et de vos budgets.',
    image: '/assets/Frame 61_2.webp',
  },
  {
    id: 'events',
    title: "Organisation d'Événements",
    icon: <Calendar size={20} />,
    description: 'Planifiez, invitez et gérez les inscriptions en un clic.',
    image: '/assets/image 1.webp',
  },
  {
    id: 'dashboard',
    title: 'Tableaux de bord',
    icon: <LayoutDashboard size={20} />,
    description: 'Visualisez vos KPIs et prenez les bonnes décisions.',
    image: '/assets/Frame 93.webp',
  },
]

const FeatureTabs = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id)

  const activeContent = TABS.find((t) => t.id === activeTab) || TABS[0]

  return (
    <section className="w-full bg-slate-50 px-4 py-24">
      <div className="mx-auto max-w-[1200px]">
        {/* Main App-like Container */}
        <div className="flex min-h-[600px] flex-col overflow-hidden rounded-[40px] bg-white shadow-2xl ring-1 ring-slate-900/5 lg:flex-row">
          {/* Left Sidebar (Tabs) */}
          <div className="flex w-full flex-col border-slate-100 bg-white p-6 lg:w-[400px] lg:border-r lg:p-10">
            <h3 className="mb-8 text-2xl font-bold text-slate-900">Nos Solutions</h3>
            <div className="flex flex-col gap-2">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <Button
                    key={tab.id}
                    variant="ghost"
                    rounded="lg"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex h-auto items-start justify-start gap-4 border-none p-4 text-left whitespace-normal transition-all duration-300 hover:bg-slate-50 ${
                      isActive
                        ? 'bg-cst-green shadow-cst-green/20 shadow-cst-green/40 hover:bg-cst-green text-white shadow-lg hover:text-white'
                        : 'bg-transparent text-slate-600'
                    }`}
                  >
                    <div
                      className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}
                    >
                      {tab.icon}
                    </div>
                    <div>
                      <h4
                        className={`text-lg font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}
                      >
                        {tab.title}
                      </h4>
                      {isActive && (
                        <p className="animate-in fade-in slide-in-from-top-2 mt-2 text-sm text-green-50">
                          {tab.description}
                        </p>
                      )}
                    </div>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Right Content Area (Image Display) */}
          <div className="relative flex-1 bg-slate-100/50 p-6 lg:p-10">
            <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-900/10 md:rounded-3xl">
              <Image
                key={activeContent.id} // Forces re-render for smooth fade if we add transitions
                src={activeContent.image}
                alt={activeContent.title}
                fill
                className="animate-in fade-in zoom-in-95 object-cover object-top duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureTabs
