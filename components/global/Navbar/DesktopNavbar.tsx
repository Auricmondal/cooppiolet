'use client'
import LinkTag from '@/components/ui/LinkTag'
import { Button } from '@/components/ui/button'
import { NavbarContext } from '@/context/NavbarContext'
import { ModalContext, ModalType } from '@/context/ModalContext'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

const NavItem = ({ item }: { item: any }) => {
  const { openModal } = useContext(ModalContext)

  const isContact =
    item.label.toLowerCase().includes('contact') ||
    item.href.toLowerCase().includes('contact') ||
    item.label.toLowerCase().includes('demo') ||
    item.is_cta

  if (item.is_cta) {
    return (
      <Button
        key={item.id}
        variant="primary"
        size="sm"
        withDot
        onClick={() => openModal(ModalType.FORM, null)}
      >
        {item.label}
      </Button>
    )
  }

  const className = `text-base font-medium transition-colors ${
    item.isPrimary ? 'text-cst-primary' : 'text-gray-900'
  } hover:text-cst-primary`

  return isContact ? (
    <Button
      key={item.id}
      variant="ghost"
      onClick={() => openModal(ModalType.FORM, null)}
      className={className}
    >
      {item.label}
    </Button>
  ) : (
    <LinkTag
      key={item.id}
      href={item.href == 'home' ? '/' : item.href}
      label={item.label}
      className={className}
    />
  )
}

const DesktopNavbar = () => {
  const { navbarContent } = useContext(NavbarContext)
  const { openModal } = useContext(ModalContext)

  return (
    <div className="hidden w-full items-center justify-between px-4 py-4 transition-all duration-300 lg:flex">
      {/* Left Section */}
      <div>
        <Link href={'/'}>
          {navbarContent?.logo?.url && (
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${navbarContent.logo.url}`}
              alt={navbarContent.logo.alternativeText || 'Logo'}
              width={navbarContent.logo.width || 120}
              height={navbarContent.logo.height || 40}
              priority
            />
          )}
        </Link>
      </div>

      <div className="flex items-center justify-center gap-6">
        {navbarContent?.Links.map((item, index) => (
          <NavItem key={item.id || index} item={item} />
        ))}
      </div>
    </div>
  )
}

export default DesktopNavbar
