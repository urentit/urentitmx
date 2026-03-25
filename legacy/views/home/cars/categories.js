/* Bee */
import _, { Box, Flex, Cell } from '../../../bee/grid'

/* Mocks */
import cars from '../../../mocks/cars'

/* Components */
import Section from '../../../components/section'
import { H2 } from '../../../components/title'
import Button from '../../../components/button'

export default ({ category, setCategory }) => (
  <Section id="vehiculos-ejemplo" background="var(--c-bg-grey)">
    <Box>
      <Cell mb={{ _: '1.25rem', m: '2.5rem' }} textAlign="center">
        <H2>Ejemplos de vehículos por categoría</H2>
        <_
          as="p"
          mt="1rem"
          fontSize={{ s: '1.125rem' }}
          lineHeight="1.8"
          style={{
            maxWidth: '1200px',
            textWrap: 'balance',
            margin: '0 auto',
            marginTop: '1rem',
          }}
        >
          Las unidades mostradas son ejemplos ilustrativos y están sujetas a
          disponibilidad en el mercado automotriz. Consulta con nuestros
          asesores para opciones actualizadas.
        </_>
      </Cell>
      <Flex justifyContent="center" flexWrap="wrap" gridGap="1.25rem">
        {Object.keys(cars).map((car, i) => (
          <Button
            key={i}
            variant="grey-o-main-o"
            text={cars[car].name}
            small
            className={category == car ? 'active' : ''}
            onClick={() => setCategory(car)}
            aria-label={`Ver vehículos de ${cars[car].name}`}
          />
        ))}
      </Flex>
    </Box>
  </Section>
)
