'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'

interface TextHoverProps {
  label: string
  isHovered?: boolean
}

const TextHover = ({ label, isHovered }: TextHoverProps) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  // Standard React pattern for adjusting state based on props without useEffect
  const [text, setText] = useState(label)
  const [prevLabel, setPrevLabel] = useState(label)

  if (label !== prevLabel) {
    setPrevLabel(label)
    setText(label)
  }

  const repeats = 6

  const animateRoll = (nextText?: string) => {
    const el = innerRef.current
    if (!el) return

    gsap.killTweensOf(el)
    const yTarget = -(repeats - 1) * 1.5

    gsap.fromTo(
      el,
      { y: '0em' },
      {
        y: `${yTarget}em`,
        duration: 1.2,
        ease: 'power4.out',
      }
    )
  }

  // Handle Label Change Animation
  useEffect(() => {
    if (isFirstRender.current) return
    animateRoll(label)
  }, [label])

  // Handle Hover State Animation
  useEffect(() => {
    if (isHovered === undefined) return

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    animateRoll()
  }, [isHovered])

  return (
    <div className="h-[1.5em] cursor-pointer overflow-hidden select-none">
      <div ref={innerRef} className="flex flex-col">
        {Array.from({ length: repeats }).map((_, index) => (
          <div key={index} className="flex h-[1.5em] items-center">
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}

const ElementRotation = ({
  children,
  isHovered,
}: {
  children: React.ReactNode
  isHovered?: boolean
}) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  const animate = (toRotation: number) => {
    const el = innerRef.current
    if (!el) return
    gsap.to(el, {
      rotation: toRotation,
      duration: 1.2,
      ease: 'power4.out',
      overwrite: true,
    })
  }

  useEffect(() => {
    if (isHovered === undefined) return

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    animate(isHovered ? 360 : 0)
  }, [isHovered])

  return (
    <div
      onMouseEnter={isHovered === undefined ? () => animate(360) : undefined}
      onMouseLeave={isHovered === undefined ? () => animate(0) : undefined}
    >
      <div ref={innerRef} className="inline-block">
        {children}
      </div>
    </div>
  )
}

const TextSwapAnimation = ({ label, isHovered }: { label: string; isHovered?: boolean }) => {
  const textTopRef = useRef<HTMLDivElement>(null)
  const textBottomRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.killTweensOf([textTopRef.current, textBottomRef.current, lineRef.current])

    const tl = gsap.timeline({
      defaults: { duration: 0.5, ease: 'power2.inOut' },
    })

    if (isHovered) {
      tl.to(textTopRef.current, { y: '-100%', rotateX: -90, opacity: 0 }, 0)
      tl.fromTo(
        textBottomRef.current,
        { y: '100%', rotateX: 90, opacity: 0 },
        { y: '0%', rotateX: 0, opacity: 1 },
        0
      )
      tl.to(lineRef.current, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, 0.1)
    } else {
      tl.to(textTopRef.current, { y: '0%', rotateX: 0, opacity: 1 }, 0)
      tl.to(textBottomRef.current, { y: '100%', rotateX: 90, opacity: 0 }, 0)
      tl.to(lineRef.current, { scaleX: 0, duration: 0.3 }, 0)
    }
  }, [isHovered])

  return (
    <div
      className="relative inline-flex flex-col items-center justify-center"
      style={{ perspective: '500px' }}
    >
      <div className="relative flex h-[1.5em] items-center justify-center overflow-hidden px-1">
        <div ref={textTopRef} className="will-change-transform">
          {label}
        </div>
        <div
          ref={textBottomRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 will-change-transform"
        >
          {label}
        </div>
      </div>
      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-current"
      />
    </div>
  )
}

export { TextHover, ElementRotation, TextSwapAnimation }
