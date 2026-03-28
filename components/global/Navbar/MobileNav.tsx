'use client'
import { Button } from '@/components/ui/button'
import FadeContent from '@/components/animations/FadeContent'
import { ElementRotation, TextHover } from '@/components/animations/TextHover'
import { NavbarContext } from '@/context/NavbarContext'
import { ModalContext, ModalType } from '@/context/ModalContext'
import gsap from 'gsap'
import { ArrowUpRight, Mail, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'

const MobileNavbar = () => {
  const { isNavbarOpen, navbarContent, toggleDrawer } = useContext(NavbarContext)

  return (
    <div className="flex w-full items-center justify-between px-4 py-4 transition-all duration-300 lg:hidden">
      <div>
        <Link href={'/'}>
          {navbarContent?.logo?.url && (
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${navbarContent.logo.url}`}
              alt={navbarContent.logo.alternativeText || 'Logo'}
              width={120}
              height={40}
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
    <Button
      variant="ghost"
      onClick={toggleDrawer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex items-center gap-1 ${
        !isNavbarOpen ? 'bg-cst-primary/10' : 'text-cst-neutral-08'
      } hover:bg-cst-primary/20 rounded-full border-none px-4 transition-all`}
    >
      <TextHover label={isNavbarOpen ? 'CLOSE' : 'MENU'} isHovered={isHovered} />
      <ElementRotation isHovered={isHovered}>
        {isNavbarOpen ? <X size={'16px'} /> : <Menu size={'16px'} />}
      </ElementRotation>
    </Button>
  )
}

const MobileNavItem = ({ item }: { item: any }) => {
  const { toggleDrawer } = useContext(NavbarContext)
  const { openModal } = useContext(ModalContext)

  const isContact =
    item.label.toLowerCase().includes('contact') ||
    item.href.toLowerCase().includes('contact') ||
    item.label.toLowerCase().includes('demo') ||
    item.is_cta

  if (item.is_cta) {
    return (
      <div className="drawer-link invisible py-3 opacity-0">
        <Button
          variant="primary"
          className="flex w-full items-center justify-between rounded-3xl px-8 py-10 text-4xl font-black text-white"
          withDot
          dotClassName="size-6"
          onClick={() => {
            toggleDrawer()
            openModal(ModalType.FORM, null)
          }}
        >
          <>
            {item.label}
            <ArrowUpRight size={32} />
          </>
        </Button>
      </div>
    )
  }

  const className = `group flex w-full items-center justify-between border-b border-gray-200 py-4 text-left text-5xl font-black tracking-tight md:text-6xl ${item.isPrimary ? 'text-cst-primary' : 'text-gray-900'} hover:text-cst-primary transition-colors`

  return (
    <div className="drawer-link invisible opacity-0">
      {isContact ? (
        <Button
          variant="ghost"
          onClick={() => {
            toggleDrawer()
            openModal(ModalType.FORM, null)
          }}
          aria-label={item.label}
          className={className}
        >
          <>
            {item.label}
            <ArrowUpRight
              className="-translate-x-4 opacity-0 transition-all duration-300 ease-out group-hover/button:translate-x-0 group-hover/button:opacity-100"
              size={32}
            />
          </>
        </Button>
      ) : (
        <Link
          href={item.href === 'home' ? '/' : item.href}
          onClick={toggleDrawer}
          aria-label={item.label}
          className={className}
        >
          <>
            <TextHover label={item.label} />
            <ArrowUpRight
              className="-translate-x-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
              size={32}
            />
          </>
        </Link>
      )}
    </div>
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
          '-=0.2'
        )
        .fromTo(
          '.drawer-artifact',
          { y: 20, scale: 0.95, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.2)',
          },
          '-=0.3'
        )
    } else {
      gsap.to(el, {
        x: '100%',
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
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
      className="invisible fixed top-0 right-0 z-50 flex h-full w-full flex-col bg-slate-50 opacity-0 shadow-2xl lg:hidden"
    >
      <div className="z-50 flex w-full items-center justify-between gap-4 p-4">
        {navbarContent?.logo?.url && (
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${navbarContent?.logo?.url || ''}`}
            alt={navbarContent?.logo?.alternativeText || 'Logo'}
            width={120}
            height={40}
          />
        )}
        <MenuButton />
      </div>

      <div className="flex h-full flex-1 flex-col overflow-y-auto px-6 pt-4 pb-8">
        <div className="flex flex-1 flex-col justify-center gap-2">
          {navbarContent?.Links.map((item, index) => (
            <MobileNavItem key={index} item={item} />
          ))}
        </div>

        {/* Bottom Section: Modern Artifacts / Bento Boxes */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {/* one email and seperated by a | terms and conditions and privacy */}
          <div className="drawer-artifact invisible flex items-center justify-center gap-4 text-sm text-gray-600 opacity-0">
            <Mail size={16} />
            <a
              href={`mailto:${navbarContent?.company_email || 'hello@yourcompany.com'}`}
              className="hover:text-cst-neutral-10"
            >
              {navbarContent?.company_email || 'hello@yourcompany.com'}
            </a>
          </div>
          <div className="drawer-artifact flex items-center justify-center gap-4 text-sm text-gray-600">
            {navbarContent?.legal_links.map((link, index) => (
              <Link href={link.href} key={index} className="hover:text-cst-neutral-10">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export { MenuDrawer, MobileNavbar }
