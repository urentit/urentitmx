/* Default */
import { useState } from 'react'

/* ./ */
import Categories from './categories'
import Sliders from './sliders'

export default () => {
  const [category, setCategory] = useState('valor-medio')

  return (
    <>
      <Categories category={category} setCategory={setCategory} />
      <Sliders category={category} />
    </>
  )
}
