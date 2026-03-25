'use client'

import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

type Variant = 'primary' | 'outline' | 'ghost' | 'gold-text'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
  href?: string
}

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-wide rounded-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-gold text-black hover:bg-gold-light active:bg-gold-dark shadow-gold hover:shadow-gold-lg',
  outline:
    'border border-gold text-gold hover:bg-gold hover:text-black',
  ghost:
    'text-white/70 hover:text-gold hover:bg-white/5',
  'gold-text':
    'text-gold hover:text-gold-light underline-offset-4 hover:underline p-0',
}

const sizes: Record<Size, string> = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

/* Link variant — renders an <a> tag with button styles */
interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </a>
  )
}
