'use client'
import React, { useContext, useEffect, useRef } from 'react'
import DesktopNavbar from './DesktopNavbar'
import { MobileNavbar } from './MobileNav'
import { Navbar } from '@/types/navbar'
import { NavbarContext } from '@/context/NavbarContext'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NavContainer = ({ content }: { content: Navbar }) => {
  const { populateNavbarContent } = useContext(NavbarContext)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    populateNavbarContent(content)
  }, [content, populateNavbarContent])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const ctx = gsap.context(() => {
      // Create the hide/show tween
      const navAnimation = gsap.to(nav, {
        yPercent: -100,
        duration: 0.3,
        paused: true,
        ease: 'power2.inOut',
      })

      ScrollTrigger.create({
        start: 'top top', // Monitor from the very start
        onUpdate: (self) => {
          // 1. Only start hiding/showing AFTER 100vh
          if (self.scroll() > window.innerHeight) {
            // self.direction 1 = scrolling down, -1 = scrolling up
            if (self.direction === 1) {
              navAnimation.play()
            } else {
              navAnimation.reverse()
            }
          } else {
            // 2. If we are in the first 100vh, always show it
            navAnimation.reverse()
          }
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <nav ref={navRef} className="fixed top-0 left-0 z-50 w-full bg-white">
      <DesktopNavbar />
      <MobileNavbar />
    </nav>
  )
}

export default NavContainer
