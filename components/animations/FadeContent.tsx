'use client'
import * as React from 'react'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface FadeContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  blur?: boolean
  duration?: number
  ease?: string
  delay?: number
  threshold?: number
  initialOpacity?: number
  disappearAfter?: number
  disappearDuration?: number
  disappearEase?: string
  onComplete?: () => void
  onDisappearanceComplete?: () => void
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  duration = 1000,
  ease = 'power2.out',
  delay = 0,
  threshold = 0.2,
  initialOpacity = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power2.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const getSeconds = (val: number) => (val > 10 ? val / 1000 : val)

    gsap.set(el, {
      autoAlpha: initialOpacity,
      filter: blur ? 'blur(10px)' : 'blur(0px)',
    })

    const tl = gsap.timeline({
      paused: true,
      delay: getSeconds(delay),
      onComplete: () => {
        onComplete?.()

        if (disappearAfter > 0) {
          gsap.to(el, {
            autoAlpha: initialOpacity,
            filter: blur ? 'blur(10px)' : 'blur(0px)',
            delay: getSeconds(disappearAfter),
            duration: getSeconds(disappearDuration),
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.(),
          })
        }
      },
    })

    tl.to(el, {
      autoAlpha: 1,
      filter: 'blur(0px)',
      duration: getSeconds(duration),
      ease,
    })

    // 👇 THIS is the important part
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl.play()
          observer.unobserve(el) // run once
        }
      },
      {
        threshold: threshold, // how much visible before trigger
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      tl.kill()
      gsap.killTweensOf(el)
    }
  }, [
    blur,
    duration,
    ease,
    delay,
    threshold,
    initialOpacity,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete,
  ])

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
}

export default FadeContent
