'use client'
import { createContext, useState } from 'react'

export const DrawerContext = createContext()

const DrawerProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerContent, setDrawerContent] = useState(null)
  const [drawerType, setDrawerType] = useState('team') // 'team' or 'resource'

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev)
  }

  const openDrawer = (type, content) => {
    setDrawerType(type)
    setDrawerContent(content)
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
    setTimeout(() => {
      setDrawerContent(null)
      setDrawerType('team')
    }, 500)
  }

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerContent,
        drawerType,
        toggleDrawer,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

export default DrawerProvider
