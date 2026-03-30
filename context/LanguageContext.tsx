'use client'

import React, { createContext, useState } from 'react'
import { Language } from '@/types/language'

export const LanguageContext = createContext({
  lang: { code: 'en', name: 'English' },
  toggleLang: () => {},
  languages: [{ code: 'en', name: 'English' }],
})

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'German' },
  ]

  const [lang, setLang] = useState({ code: 'en', name: 'English' })

  const toggleLang = () => {
    setLang((prev) => {
      const nextCode = prev.code === 'en' ? 'de' : 'en'
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
