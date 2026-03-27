'use client'
import LinkTag from '@/components/ui/LinkTag'
import { NavbarContext } from '@/context/NavbarContext'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

const DesktopNavbar = () => {
  const { navbarContent } = useContext(NavbarContext)
  return (
    <div className="hidden w-full items-center justify-between bg-white px-4 py-4 lg:flex">
      {/* Left Section */}
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

      <div className="flex items-center justify-center gap-6">
        {navbarContent?.Links.map((item, index) => (
          <LinkTag
            key={item.id}
            href={item.href == 'home' ? '/' : item.href}
            label={item.label}
            className={`text-lg font-medium ${item.isPrimary ? 'text-cst-primary' : 'text-gray-900'} ${item.is_cta ? 'hover:text-cst-secondary flex items-center gap-2 rounded-full border bg-black px-6 py-2 text-white transition-all duration-500 hover:border-black hover:bg-white' : 'hover:text-cst-primary'} transition-colors`}
          />
        ))}
      </div>
    </div>
  )
}

export default DesktopNavbar
