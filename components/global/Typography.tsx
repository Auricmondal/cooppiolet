import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* ------------------ Base Types ------------------ */

type Props = {
  className?: string
  children?: ReactNode
}

/* ------------------ Headings ------------------ */

export const H1: React.FC<Props> = ({ className, children }) => (
  <h1 className={cn('text-[4rem] leading-none tracking-tight md:text-[5rem]', className)}>
    {children}
  </h1>
)

export const H2: React.FC<Props> = ({ className, children }) => (
  <h2 className={cn('text-[1.8rem] font-bold md:text-[2rem]', className)}>{children}</h2>
)

export const H3: React.FC<Props> = ({ className, children }) => (
  <h3 className={cn('text-[1.5rem] font-bold md:text-[1.8rem]', className)}>{children}</h3>
)

export const H4: React.FC<Props> = ({ className, children }) => (
  <h4 className={cn('text-[1.25rem] leading-6 font-bold md:text-[1.5rem]', className)}>
    {children}
  </h4>
)

export const H5: React.FC<Props> = ({ className, children }) => (
  <h5 className={cn('text-[1.1rem] leading-6 font-bold md:text-[1.2rem]', className)}>
    {children}
  </h5>
)

export const H6: React.FC<Props> = ({ className, children }) => (
  <h6 className={cn('text-[1rem] font-semibold tracking-tight opacity-80', className)}>
    {children}
  </h6>
)

/* ------------------ Text ------------------ */

export const P: React.FC<Props> = ({ className, children }) => (
  <p className={cn('text-[1rem] md:text-[1.25rem] lg:text-[1.5rem]', className)}>{children}</p>
)

export const Small: React.FC<Props> = ({ className, children }) => (
  <p className={cn('text-sm text-neutral-600', className)}>{children}</p>
)

/* Inline */

export const Bold: React.FC<Props> = ({ className, children }) => (
  <strong className={cn('font-semibold', className)}>{children}</strong>
)

export const Italic: React.FC<Props> = ({ className, children }) => (
  <em className={cn('italic', className)}>{children}</em>
)

export const Underline: React.FC<Props> = ({ className, children }) => (
  <span className={cn('underline', className)}>{children}</span>
)

export const InlineCode: React.FC<Props> = ({ className, children }) => (
  <code className={cn('rounded bg-neutral-700 px-1 py-0.5 text-sm text-white', className)}>
    {children}
  </code>
)

/* ------------------ Lists ------------------ */

export const UL: React.FC<Props> = ({ className, children }) => (
  <ul className={cn('list-disc space-y-2 pl-6 text-[1.25rem]', className)}>{children}</ul>
)

export const OL: React.FC<Props> = ({ className, children }) => (
  <ol className={cn('list-decimal space-y-2 pl-6 text-[1.25rem]', className)}>{children}</ol>
)

export const LI: React.FC<Props> = ({ className, children }) => (
  <li className={cn('text-[1.25rem] leading-relaxed', className)}>{children}</li>
)

/* ------------------ Quote ------------------ */

export const Quote: React.FC<Props> = ({ className, children }) => (
  <blockquote
    className={cn('my-4 border-l-4 border-neutral-400 pl-4 text-[1.25rem] italic', className)}
  >
    {children}
  </blockquote>
)

/* ------------------ Code Block ------------------ */

type CodeBlockProps = Props & {
  code?: string
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ className, code }) => (
  <pre
    className={cn(
      'overflow-auto rounded-lg bg-neutral-800 p-4 text-sm leading-relaxed text-white',
      className
    )}
  >
    <code>{code}</code>
  </pre>
)

/* ------------------ Image ------------------ */

type FigureProps = {
  src?: string
  alt?: string
  caption?: string
  className?: string
}

export const Figure: React.FC<FigureProps> = ({ src, alt, caption, className }) => (
  <figure className={cn('my-6', className)}>
    {src && <img src={src} alt={alt} className="w-full rounded-lg" />}
    {caption && (
      <figcaption className="mt-2 text-center text-sm text-neutral-600">{caption}</figcaption>
    )}
  </figure>
)
