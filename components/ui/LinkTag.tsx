'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useState } from 'react'
import { TextSwapAnimation } from '../animations/TextHover'

const LinkTag = React.forwardRef<
  HTMLAnchorElement,
  {
    href: string
    label: string
    isPrimary?: boolean
    isCTA?: boolean
    className?: string
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    onClick?: () => void
  }
>(({ href, label, className, onMouseEnter, onMouseLeave, onClick, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    onMouseEnter?.()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onMouseLeave?.()
  }

  return (
    <Link
      href={href}
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      <TextSwapAnimation label={label} isHovered={isHovered} />
    </Link>
  )
})

LinkTag.displayName = 'LinkTag'

export default LinkTag
