/* Default */
import { useContext, useEffect } from 'react'

/* Contexts */
import { LoadingContext } from '../contexts/loading'

/**
 * useLoading
 * @param {boolean} state - Whether to show the loading or not - default: false
 * @returns {object} - Object with the loading state and a function to set it - (e.g. { loading, setLoading: })
 */

export const useLoading = (state) => {
  const { loading, setLoading } = useContext(LoadingContext)

  useEffect(() => {
    if (state) setLoading(true)
    else setLoading(false)
  }, [state])

  return {
    loading,
    setLoading,
  }
}
