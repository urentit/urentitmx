/* Default */
import Image from 'next/image'

/* Bee */
import _, { Cell } from '../../bee/grid'

/* Packages */
import { Link } from 'react-scroll'

/* Hooks */
import { useCar } from '../../hooks/car'

/* Components */
import Button from '../../components/button'

/**
 * CarCard
 * @param {string} category - Car category - e.g. 'sedan'
 * @param {object} car - Car object - e.g. { category: '', slug: '', name: '', brand: '' }
 * @returns
 */

export const CarCard = ({ category, car }) => {
  const { setCar } = useCar()

  // Descripciones SEO por modelo (puedes expandir este objeto según la guía)
  const descriptions = {
    sentra: "Ejemplo ilustrativo Nissan Sentra sedán ejecutivo para arrendamiento empresarial.",
    "sienna-hybrid": "Ejemplo ilustrativo Toyota Sienna Hybrid minivan ideal para transporte corporativo.",
    prius: "Ejemplo ilustrativo Toyota Prius híbrido para flotilla sustentable.",
    teramont: "Ejemplo ilustrativo Volkswagen Teramont SUV amplia para uso ejecutivo.",
    tiguan: "Ejemplo ilustrativo Volkswagen Tiguan SUV mediana para uso corporativo.",
    seltos: "Ejemplo ilustrativo Kia Seltos SUV compacta para flotilla operativa.",
    sportage: "Ejemplo ilustrativo Kia Sportage SUV ejecutiva para arrendamiento.",
    odissey: "Ejemplo ilustrativo Honda Odissey minivan ejecutiva para transporte empresarial.",
    suburban: "Ejemplo ilustrativo Chevrolet Suburban SUV de lujo para directivos.",
    "range-rover-velar": "Ejemplo ilustrativo Range Rover Velar SUV premium para ejecutivos.",
    "model-x": "Ejemplo ilustrativo Tesla Model X SUV eléctrica de alta gama.",
    "model-y": "Ejemplo ilustrativo Tesla Model Y crossover eléctrico ejecutivo.",
    q5: "Ejemplo ilustrativo Audi Q5 SUV de lujo para gerencia o dirección.",
    "grand-cherokee": "Ejemplo ilustrativo Jeep Grand Cherokee SUV premium para arrendamiento.",
    cooper: "Ejemplo ilustrativo Mini Cooper hatchback de lujo para uso ejecutivo.",
    cayman: "Ejemplo ilustrativo Porsche Cayman deportivo premium para uso corporativo exclusivo.",
    aveo: "Ejemplo ilustrativo Chevrolet Aveo sedán compacto para flotillas operativas.",
    march: "Ejemplo ilustrativo Nissan March subcompacto ideal para reparto urbano.",
    mobi: "Ejemplo ilustrativo Fiat Mobi auto económico para uso empresarial urbano.",
    vento: "Ejemplo ilustrativo Volkswagen Vento sedán para flotilla de servicios."
    // ...agrega más según tu catálogo
  }

  return (
    <_ textAlign="center">
      <Cell>
        <Image
          src={`/img/cars/${category}/${car.slug}.jpg`}
          alt={descriptions[car.slug] || car.name}
          width="560"
          height="307"
          priority
        />
      </Cell>
      <Cell>
        <_
          display="flex"
          alignItems="center"
          gridGap={{ l: '0.625rem' }}
          justifyContent="center"
          flexWrap="wrap"
          flexDirection={{ _: 'column', l: 'row' }}
        >
          <_ as="span" fontWeight="800" fontSize="1.375rem">
            {car.name}
          </_>
          <_ as="span" fontSize="1.125rem">
            {car.brand}
          </_>
        </_>
      </Cell>
      <Cell>
        <p className="descripcion-auto" style={{margin: '0.5rem 0 0.75rem 0', color: 'var(--c-text-light)'}}>{descriptions[car.slug]}</p>
      </Cell>
      <Cell>
        <Link to="formulario-cotizacion" smooth={true} offset={-50} aria-label={`Cotizar el modelo ${car.name} ${car.brand}`}>
          <Button
            as="span"
            text="Cotizar este modelo"
            variant="grey-o-main-o"
            onClick={() => {
              setCar({
                category,
                name: car.name,
                slug: car.slug,
                brand: car.brand,
              })
            }}
          />
        </Link>
      </Cell>
    </_>
  )
}
