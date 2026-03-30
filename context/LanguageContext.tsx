'use client'

import React, { createContext, useState } from 'react'
import { Language } from '@/types/language'

const languages: Language[] = [
  { code: 'GB', name: 'English' },
  { code: 'DE', name: 'German' },
]

export const LanguageContext = createContext({
  lang: { code: 'GB', name: 'English' },
  toggleLang: () => {},
  languages: [{ code: 'GB', name: 'English' }],
})

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const languages = [
    { code: 'GB', name: 'English' },
    { code: 'DE', name: 'German' },
  ]

  const [lang, setLang] = useState({ code: 'GB', name: 'English' })

  const toggleLang = () => {
    setLang((prev) => {
      const nextCode = prev.code === 'GB' ? 'DE' : 'GB'
      return languages.find((l) => l.code === nextCode) || prev
    })
  }

  return (
    <LanguageContext.Provider
      value={{
        lang,

        toggleLang,

        languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
