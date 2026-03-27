'use client'

import { Navbar } from '@/types/navbar'
import { createContext, useCallback, useMemo, useState } from 'react'

type NavbarContextType = {
  isNavbarOpen: boolean
  navbarContent: Navbar | null
  toggleDrawer: () => void
  populateNavbarContent: (content: Navbar | null) => void
}

export const NavbarContext = createContext<NavbarContextType>({
  isNavbarOpen: false,
  navbarContent: null,
  toggleDrawer: () => {},
  populateNavbarContent: (content: Navbar | null) => {},
})

const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const [navbarContent, setNavbarContent] = useState<Navbar | null>(null)

  const populateNavbarContent = useCallback(
    (content: Navbar | null) => {
      setNavbarContent(content)
    },
    [navbarContent]
  )

  const toggleDrawer = useCallback(() => {
    setIsNavbarOpen((prev) => !prev)
  }, [])

  const value = useMemo(
    () => ({
      isNavbarOpen,
      navbarContent,
      toggleDrawer,
      populateNavbarContent,
    }),
    [isNavbarOpen, navbarContent, toggleDrawer]
  )

  return <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
}

export default NavbarProvider
