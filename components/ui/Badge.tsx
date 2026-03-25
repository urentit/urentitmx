import { clsx } from 'clsx'

type BadgeVariant = 'gold' | 'dark' | 'outline'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  gold: 'text-gold/80 border border-gold/25 bg-gold/8',
  dark: 'text-white/60 border border-white/10 bg-white/5',
  outline: 'border border-gold/40 text-gold/70',
}

export function Badge({ children, variant = 'gold', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 text-[11px] font-sans font-medium tracking-[0.18em] uppercase px-3 py-1 rounded-none',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
