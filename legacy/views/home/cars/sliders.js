/* Bee */
import { Box, Flex, Cell } from '../../../bee/grid'

/* Mocks */
import cars from '../../../mocks/cars'

/* Components */
import Section from '../../../components/section'
import { Slider, Slide } from '../../../components/slider'
import { CarCard } from '../../../components/car-card'

export default ({ category }) => (
  <Section top>
    <Box>
      <Cell>
        <Slider
          options={{
            arrows: true,
            gap: '1.25rem',
            perPage: 2,
            type: 'loop',

            breakpoints: {
              1519: {
                arrows: false,
                pagination: true,
              },
              1023: {
                perPage: 2,
              },
              599: {
                perPage: 1,
              },
            },
          }}
          aria-label="Carrusel de vehículos de la categoría seleccionada"
        >
          {cars[category].items.map((item, i) => (
            <Slide key={i}>
              <CarCard category={category} car={item} />
            </Slide>
          ))}
        </Slider>
      </Cell>
    </Box>
  </Section>
)
