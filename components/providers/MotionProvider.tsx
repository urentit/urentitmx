'use client'

import { MotionConfig } from 'framer-motion'

/**
 * Framer Motion global config.
 * reducedMotion="user" respects prefers-reduced-motion system preference.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
