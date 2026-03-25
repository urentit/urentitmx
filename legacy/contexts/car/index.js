/* Default */
import React, { useState } from 'react'

/* Context */
const CarContext = React.createContext()

const CarProvider = ({ children }) => {
  const [car, setCar] = useState()

  return (
    <CarContext.Provider value={{ car, setCar }}>
      {children}
    </CarContext.Provider>
  )
}

export default CarProvider
export { CarContext }
