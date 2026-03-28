'use client'
import FadeContent from '@/components/animations/FadeContent'
import { ElementRotation, TextHover } from '@/components/animations/TextHover'
import { NavbarContext } from '@/context/NavbarContext'
import { ModalContext, ModalType } from '@/context/ModalContext'
import gsap from 'gsap'
import { ArrowUpRight, Mail, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'

const MobileNavbar = () => {
  const { isNavbarOpen, navbarContent, toggleDrawer } = useContext(NavbarContext)

  return (
    <div className="flex items-center justify-between bg-white px-4 py-4 lg:hidden">
      <div>
        <Link href={'/'}>
          {navbarContent?.logo?.url && (
            <Image
              src={`http://localhost:1337${navbarContent.logo.url}`}
              alt={navbarContent.logo.alternativeText || 'Logo'}
              width={navbarContent.logo.width || 120}
              height={navbarContent.logo.height || 40}
              priority
            />
          )}
        </Link>
      </div>
      <div>
        <MenuButton />
      </div>
    </div>
  )
}

const MenuButton = () => {
  const { isNavbarOpen, toggleDrawer } = useContext(NavbarContext)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={toggleDrawer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex cursor-pointer items-center gap-1 ${
        !isNavbarOpen ? 'bg-cst-primary/10' : 'text-cst-neutral-08'
      } rounded-full px-2 py-1`}
    >
      <TextHover label={isNavbarOpen ? 'CLOSE' : 'MENU'} isHovered={isHovered} />
      <ElementRotation isHovered={isHovered}>
        <X size={'16px'} />
      </ElementRotation>
    </button>
  )
}

const MenuDrawer = () => {
  const { isNavbarOpen, navbarContent, toggleDrawer } = useContext(NavbarContext)
  const { openModal } = useContext(ModalContext)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tl = gsap.timeline()

    if (isNavbarOpen) {
      // 1. Slide and fade the main drawer background in
      tl.fromTo(
        el,
        { x: '100%', autoAlpha: 0 },
        {
          x: '0%',
          autoAlpha: 1,
          duration: 0.4,
          ease: 'power3.inOut',
        }
      )
        // 2. Stagger the main navigation links
        .fromTo(
          '.drawer-link',
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '-=0.2' // Start slightly before the drawer finishes opening
        )
        // 3. Pop in the artifact boxes at the bottom
        .fromTo(
          '.drawer-artifact',
          { y: 20, scale: 0.95, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.2)', // Gives a slight, satisfying bounce
          },
          '-=0.3'
        )
    } else {
      // Animate Close
      gsap.to(el, {
        x: '100%',
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
      // Instantly reset the interior items for the next open
      gsap.set('.drawer-link', { autoAlpha: 0, y: 30 })
      gsap.set('.drawer-artifact', { autoAlpha: 0, y: 20, scale: 0.95 })
    }

    return () => {
      tl.kill()
    }
  }, [isNavbarOpen])

  return (
    <div
      ref={ref}
      // Changed background to a soft neutral to make the white/colored boxes pop
      className="invisible fixed top-0 right-0 z-50 flex h-full w-full flex-col bg-slate-50 opacity-0 shadow-2xl lg:hidden"
    >
      {/* Header Area */}
      <div className="z-50 flex w-full items-center justify-between gap-4 p-4">
        {navbarContent?.logo?.url && (
          <Image
            src={`http://localhost:1337${navbarContent?.logo?.url || ''}`}
            alt={navbarContent?.logo?.alternativeText || 'Logo'}
            width={navbarContent?.logo?.width || 120}
            height={navbarContent?.logo?.height || 40}
          />
        )}
        <MenuButton />
      </div>

      {/* Main Content Area - Split Layout */}
      <div className="flex h-full flex-1 flex-col overflow-y-auto px-6 pt-4 pb-8">
        {/* Top Section: Navigation Links */}
        <div className="flex flex-1 flex-col justify-center gap-2">
          {navbarContent?.Links.map((item, index) => {
            const isContact =
              item.label.toLowerCase() === 'contact' || item.href.toLowerCase() === 'contact'
            const className = `group flex w-full items-center justify-between border-b border-gray-200 py-4 text-left text-5xl font-black tracking-tight md:text-6xl ${item.isPrimary ? 'text-cst-primary' : 'text-gray-900'} ${item.is_cta ? 'hover:text-cst-secondary rounded-3xl bg-black px-8 text-white shadow-md' : 'hover:text-cst-primary'} transition-colors`

            return (
              <div key={index} className="drawer-link invisible opacity-0">
                {isContact ? (
                  <button
                    onClick={() => {
                      toggleDrawer()
                      openModal(ModalType.FORM, null)
                    }}
                    aria-label={item.label}
                    className={className}
                  >
                    <TextHover label={item.label} />
                    <ArrowUpRight
                      className="-translate-x-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                      size={32}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href === 'home' ? '/' : item.href}
                    onClick={toggleDrawer}
                    aria-label={item.label}
                    className={className}
                  >
                    <TextHover label={item.label} />
                    <ArrowUpRight
                      className="-translate-x-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                      size={32}
                    />
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom Section: Modern Artifacts / Bento Boxes */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {/* one email and seperated by a | terms and conditions and privacy */}
          <div className="drawer-artifact invisible flex items-center justify-center gap-4 text-sm text-gray-600 opacity-0">
            <Mail size={16} />
            <a href="mailto:hello@yourcompany.com" className="hover:text-cst-neutral-10">
              hello@yourcompany.com
            </a>
          </div>
          <div className="drawer-artifact flex items-center justify-center gap-4 text-sm text-gray-600">
            <Link href="/terms" className="hover:text-cst-neutral-10">
              Terms & Conditions
            </Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-cst-neutral-10">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export { MenuDrawer, MobileNavbar }
