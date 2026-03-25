/* Default */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

/* Context */
const LoadingContext = React.createContext()

/* Styles */
import { WavesStyled } from './styles'

const LoadingProvider = ({ children }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleLoadingEnabled = () => setLoading(true)
    const handleLoadingDisabled = () => setLoading(false)

    router.events.on('routeChangeStart', handleLoadingEnabled)
    router.events.on('routeChangeComplete', handleLoadingDisabled)

    return () => {
      router.events.off('routeChangeStart', handleLoadingEnabled)
      router.events.off('routeChangeComplete', handleLoadingDisabled)
    }
  }, [])

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <WavesStyled
          colors={{ 1: 'var(--c-primary)', 2: 'var(--c-black)' }}
        />
      )}
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
export { LoadingContext }
