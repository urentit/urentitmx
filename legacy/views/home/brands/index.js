/* Default */
import Image from 'next/image'
import { useEffect, useState } from 'react'

/* Packages */
import { shuffle } from 'lodash'
import Fade from 'react-reveal/Fade'

/* Images */
import { brands } from '../../../lib/brands'

/* Bee */
import _, { Box, Cell } from '../../../bee/grid'

/* Components */
import Section from '../../../components/section'
import { H2 } from '../../../components/title'
import { Slider, Slide } from '../../../components/slider'

const brandAlt = {
  Nissan: 'Marca Nissan con opciones para flotillas operativas y comerciales',
  Porsche: 'Marca Porsche para arrendamiento de autos deportivos de alta gama',
  Isuzu: 'Marca Isuzu disponible para vehículos utilitarios y de carga',
  Volkswagen:
    'Marca Volkswagen con vehículos de pasajeros y carga para flotillas',
  Chevrolet: 'Marca Chevrolet con opciones de autos y pickups para empresas',
  Toyota:
    'Marca Toyota con autos, SUVs y pickups para arrendamiento empresarial',
  Audi: 'Marca Audi para arrendamiento de autos premium y ejecutivos',
  KIA: 'Marca KIA con SUVs y autos compactos para flotillas',
  Honda:
    'Marca Honda con vehículos ejecutivos y familiares para leasing empresarial',
  BMW: 'Marca BMW para arrendamiento de autos de lujo y deportivos',
  Mazda: 'Marca Mazda con vehículos urbanos y utilitarios para empresas',
  'Mercedes-Benz':
    'Marca Mercedes-Benz con opciones de lujo y carga para arrendamiento',
  Ford: 'Marca Ford con pickups, SUVs y autos para empresas',
  Jeep: 'Marca Jeep con SUVs premium para arrendamiento',
  Mini: 'Marca Mini para arrendamiento de autos urbanos premium',
  Fiat: 'Marca Fiat con autos económicos para uso empresarial urbano',
  'Land Rover': 'Marca Land Rover con SUVs premium para ejecutivos',
  Tesla: 'Marca Tesla con autos eléctricos premium para flotillas sustentables',
  Cadillac: 'Marca Cadillac de lujo disponible para arrendamiento corporativo',
  GMC: 'Marca GMC con pickups y SUVs para empresas',
  Hino: 'Marca Hino con camiones de carga para logística empresarial',
  Kenworth:
    'Marca Kenworth especializada en camiones de carga para arrendamiento',
  MAN: 'Marca MAN con vehículos industriales y camiones pesados',
  International:
    'Marca International para transporte pesado y flotillas de carga',
  Peugeot: 'Marca Peugeot disponible para arrendamiento empresarial',
  Lexus: 'Marca Lexus de lujo con sedanes y SUVs para empresas',
  Ferrari: 'Marca Ferrari para arrendamiento de autos deportivos de lujo',
  Lamborghini:
    'Marca Lamborghini para arrendamiento de autos deportivos exclusivos',
  Maserati: 'Marca Maserati premium para arrendamiento exclusivo',
  'Alfa Romeo':
    'Marca Alfa Romeo disponible para arrendamiento ejecutivo de alto nivel',
  JAC: 'Marca JAC con soluciones de transporte comercial y vehículos eléctricos',
  // ...puedes agregar más según tu catálogo
}

export default () => {
  const [images, setImages] = useState([])

  useEffect(() => {
    setImages(shuffle(brands))
  }, [])

  return (
    <Section id="marcas-disponibles">
      <Box>
        <Cell mb={{ _: '1.25rem', m: '2.5rem' }} textAlign="center">
          <H2>Marcas de vehículos disponibles para arrendamiento</H2>
          <_
            as="p"
            mt="1rem"
            fontSize={{ s: '1.125rem' }}
            lineHeight="1.8"
            style={{ textWrap: 'balance' }}
          >
            Trabajamos con una amplia gama de marcas reconocidas a nivel
            mundial. La disponibilidad de unidades varía según el mercado
            automotriz y puede cambiar sin previo aviso.
          </_>
        </Cell>
        <Cell>
          {images.length > 0 && (
            <Slider
              options={{
                autoplay: true,
                gap: '2.5rem',
                arrows: true,
                perPage: 6,
                type: 'loop',
                grid: {
                  rows: 3,
                  cols: 1,
                },
                breakpoints: {
                  1519: {
                    arrows: false,
                    pagination: true,
                  },
                  1023: {
                    perPage: 4,
                  },
                  767: {
                    perPage: 3,
                  },
                },
              }}
            >
              {images.map((brand, i) => (
                <Slide key={i}>
                  <Fade>
                    <Image
                      src={brand.logo}
                      alt={brandAlt[brand.name] || `Marca ${brand.name}`}
                      title={brand.name}
                      priority
                    />
                  </Fade>
                </Slide>
              ))}
            </Slider>
          )}
        </Cell>
      </Box>
    </Section>
  )
}
