import { cn } from '@/lib/utils'
import React, { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, type = 'text', label, ...props }, ref) => {
    return (
      <input
        className={cn(
          'w-full rounded-xl border border-black/5 bg-white p-3 text-sm text-black transition-all placeholder:text-black/40 focus:ring-1 focus:ring-black/20 focus:outline-none',
          className
        )}
        id={label}
        name={label || props.name}
        placeholder={placeholder}
        type={type}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options = [], ...props }, ref) => {
    return (
      <select
        className={cn(
          'w-full rounded-xl border border-black/5 bg-white p-3 text-sm text-black transition-all placeholder:text-black/40 focus:ring-1 focus:ring-black/20 focus:outline-none',
          className
        )}
        ref={ref}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }
)
Select.displayName = 'Select'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, placeholder, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'w-full rounded-xl border border-black/5 bg-white p-3 text-sm text-black transition-all placeholder:text-black/40 focus:ring-1 focus:ring-black/20 focus:outline-none',
          className
        )}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className={cn('group flex cursor-pointer items-center gap-2', className)}>
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-black/10 bg-white transition-all checked:border-[#8A154A] checked:bg-[#8A154A] focus:ring-1 focus:ring-black/20 focus:outline-none"
            ref={ref}
            {...props}
          />
          <svg
            className="absolute mt-[-1px] h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        {label && (
          <span className="text-[13px] leading-tight text-black/60 transition-colors group-hover:text-black/80">
            {label}
          </span>
        )}
      </label>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Input, Select, Textarea, Checkbox }
