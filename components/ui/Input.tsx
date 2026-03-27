import { cn } from '@/lib/utils'
import React from 'react'

const Input = ({
  className,
  placeholder,
  type = 'text',
  label,
}: {
  className?: string
  placeholder?: string
  type?: string
  label?: string
}) => {
  return (
    <input
      className={cn(
        'w-full rounded-xl border border-black/5 bg-white p-3 text-sm text-black transition-all placeholder:text-black/40 focus:ring-1 focus:ring-black/20 focus:outline-none',
        className
      )}
      id={label}
      name={label}
      placeholder={placeholder}
      type={type}
    />
  )
}

const Select = ({
  className,

  options = [],
}: {
  className?: string
  options?: { value: string; label: string }[]
}) => {
  return (
    <select
      className={cn(
        'w-full rounded-xl border border-black/5 bg-white p-3 text-sm text-black transition-all placeholder:text-black/40 focus:ring-1 focus:ring-black/20 focus:outline-none',
        className
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

const Textarea = ({ className, placeholder }: { className?: string; placeholder?: string }) => {
  return (
    <textarea
      className={cn(
        'w-full rounded-xl border border-black/5 bg-white p-3 text-sm text-black transition-all placeholder:text-black/40 focus:ring-1 focus:ring-black/20 focus:outline-none',
        className
      )}
      placeholder={placeholder}
    />
  )
}

export { Input, Select, Textarea }
