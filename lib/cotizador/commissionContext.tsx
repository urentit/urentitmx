'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useSession } from 'next-auth/react'

const STORAGE_KEY = 'urentit_comision'

export const COMISION_OPTS = [
  { value: 0,    label: '0%' },
  { value: 0.01, label: '1%' },
  { value: 0.02, label: '2%' },
  { value: 0.03, label: '3%' },
  { value: 0.04, label: '4%' },
  { value: 0.05, label: '5%' },
]

interface Ctx {
  comision:    number
  setComision: (v: number) => void
}

const CommissionContext = createContext<Ctx>({ comision: 0.03, setComision: () => {} })

export function CommissionProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const sessionComision   = Number((session?.user as any)?.comision ?? 0.03)
  const [comision, setComisionState] = useState<number>(sessionComision)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      const n = parseFloat(stored)
      if (Number.isFinite(n) && n >= 0 && n <= 0.1) {
        setComisionState(n)
        return
      }
    }
    setComisionState(sessionComision)
  }, [sessionComision])

  function setComision(v: number) {
    setComisionState(v)
    localStorage.setItem(STORAGE_KEY, String(v))
  }

  return (
    <CommissionContext.Provider value={{ comision, setComision }}>
      {children}
    </CommissionContext.Provider>
  )
}

export function useCommission() {
  return useContext(CommissionContext)
}
