'use client'

import * as React from 'react'
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { TextHover } from '../animations/TextHover'

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4 hover:scale-[1.02] active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-black text-white hover:bg-slate-900 shadow-lg',
        primary: 'bg-black text-white hover:bg-slate-900 shadow-lg',
        secondary: 'bg-cst-primary text-white hover:bg-cst-primary-light shadow-lg',
        outline:
          'border-border/40 bg-background/50 backdrop-blur-md shadow-xs hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
        white: 'bg-white text-slate-900 hover:bg-slate-50 shadow-xl shadow-white/10',
      },
      size: {
        default: 'h-10 gap-2 px-6',
        xs: 'h-7 gap-1 px-3 text-xs [&_svg:not([class*="size-"])]:size-3',
        sm: 'h-9 gap-1.5 px-4',
        lg: 'h-14 gap-3 px-10 text-lg font-semibold',
        icon: 'size-10',
        'icon-xs': 'size-7 [&_svg:not([class*="size-"])]:size-3',
        'icon-sm': 'size-9',
        'icon-lg': 'size-14',
      },
      rounded: {
        default: 'rounded-full',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
)

export interface ButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  withDot?: boolean
  dotClassName?: string
  label?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      asChild = false,
      withDot = false,
      dotClassName,
      label,
      children,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const Component = asChild ? Slot : ButtonPrimitive

    const handleMouseEnter = (e: any) => {
      setIsHovered(true)
      if (onMouseEnter) onMouseEnter(e)
    }

    const handleMouseLeave = (e: any) => {
      setIsHovered(false)
      if (onMouseLeave) onMouseLeave(e)
    }

    const content = label || (typeof children === 'string' ? children : null)

    return (
      <Component
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {content ? <TextHover label={content} isHovered={isHovered} /> : children}
            {withDot && (
              <span
                className={cn(
                  'bg-cst-secondary h-2.5 w-2.5 shrink-0 rounded-full transition-transform group-hover/button:scale-125',
                  dotClassName
                )}
              />
            )}
          </>
        )}
      </Component>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
