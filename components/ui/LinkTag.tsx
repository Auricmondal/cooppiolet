'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useState } from 'react'
import { TextSwapAnimation } from '../animations/TextHover'

const LinkTag = ({
  href,
  label,
  className,
}: {
  href: string
  label: string
  isPrimary?: boolean
  isCTA?: boolean
  className?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <Link
      href={href}
      className={cn(className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TextSwapAnimation label={label} isHovered={isHovered} />
    </Link>
  )
}

export default LinkTag
