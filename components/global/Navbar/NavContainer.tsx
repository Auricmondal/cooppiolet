'use client'
import React, { useContext, useEffect, useRef } from 'react'
import DesktopNavbar from './DesktopNavbar'
import { MobileNavbar } from './MobileNav'
import { Navbar } from '@/types/navbar'
import { NavbarContext } from '@/context/NavbarContext'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

gsap.registerPlugin(ScrollTrigger)

const NavContainer = ({ content }: { content: Navbar }) => {
  const { populateNavbarContent } = useContext(NavbarContext)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.8
      if (window.scrollY > threshold) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ['navbar'],
    initialData: content,
    queryFn: async () => {
      const res = await axios.get(`/api/navbar`)
      return res.data
    },
    staleTime: Infinity,
  })

  useEffect(() => {
    populateNavbarContent(data || content)
  }, [data, content, populateNavbarContent])

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Failed to load navbar')
    }
  }, [isError, error])

  // ✅ GSAP logic
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const ctx = gsap.context(() => {
      const navAnimation = gsap.to(nav, {
        yPercent: -100,
        duration: 0.3,
        paused: true,
        ease: 'power2.inOut',
      })

      ScrollTrigger.create({
        start: 'top top',
        onUpdate: (self) => {
          if (self.scroll() > window.innerHeight) {
            if (self.direction === 1) {
              navAnimation.play()
            } else {
              navAnimation.reverse()
            }
          } else {
            navAnimation.reverse()
          }
        },
      })
    })

    return () => ctx.revert()
  }, [])

  if (isLoading && !data) {
    return (
      <nav className="fixed top-0 left-0 z-50 w-full bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
          <div className="flex gap-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      {isFetching && (
        <div className="fixed top-0 left-0 z-[60] h-[2px] w-full animate-pulse bg-black/10" />
      )}

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <DesktopNavbar />
        <MobileNavbar />
      </nav>
    </>
  )
}

export default NavContainer
