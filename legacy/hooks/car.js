/* Default */
import { useContext } from 'react'

/* Contexts */
import { CarContext } from '../contexts/car'

/**
 * useLoading
 * @param {object} car - Car object - e.g. { category: '', slug: '', name: '', brand: '' }
 * @returns {object} - car object - e.g. { cateogry: '', slug: '', name: '', brand: '' }
 */

export const useCar = () => {
  const { car, setCar } = useContext(CarContext)

  return {
    category: car?.category ?? '',
    slug: car?.slug ?? '',
    name: car?.name ?? '',
    brand: car?.brand ?? '',
    setCar,
  }
}
