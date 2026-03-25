/* Default */
import Image from 'next/image'

/* Packages */
import { Link } from 'react-scroll'
import Fade from 'react-reveal/Fade'

/* Bee */
import _, { Box, Grid, Cell } from '../../../bee/grid'
import FaIcon from '../../../bee/fa-icon'

/* Components */
import Section from '../../../components/section'
import { H2 } from '../../../components/title'
import Button from '../../../components/button'

/* Images */
import { aboutUs, logoTitle } from '../../../lib/images'

export default () => (
  <Section
    id="quienes-somos"
    middle
    background="var(--c-bg-grey)"
    css={css`
      overflow: hidden;
    `}
  >
    <Box
      css={css`
        position: relative;
        z-index: 5;
      `}
    >
      <Grid
        gridTemplateColumns={{ _: '1fr', l: '1fr 1fr' }}
        gridTemplateRows={{ _: 'auto auto', l: '1fr' }}
        alignItems="end"
      >
        <Cell
          px={{ _: '1rem', m: '5rem', l: '2.5rem', xl: '5rem' }}
          pb="0"
          css={css`
            & span {
              vertical-align: middle;
            }
          `}
          gridRow={{ _: '2', l: '1' }}
        >
          <Fade bottom>
            <Image
              src={aboutUs}
              alt="Clientes satisfechos recibiendo vehículo arrendado con solución llave en mano de U Rent It"
              width={1000}
              height={900}
              priority
            />
          </Fade>
        </Cell>
        <Cell nested py={{ _: '2.5rem', s: '3.75rem', m: '5rem' }}>
          <Cell>
            <Fade top>

              {/* <Image src={logoTitle} alt="Conoce U Rentit" /> */}
              <H2>Conoce <span style={{fontWeight: 800, color: 'var(--c-main)'}}>U</span> Rent It</H2>
            </Fade>
          </Cell>
          <Cell>
            <Fade>
              {/* prettier-ignore */}
              <_ as="p" fontSize={{s: '1.125rem'}} lineHeight="1.8">En U Rent It ofrecemos soluciones de arrendamiento de vehículos para empresas, empresarios y ejecutivos que necesitan flotillas, vehículos premium, gama media, utilitarios, comerciales, carga y blindados sin necesidad de comprarlos. Nuestra propuesta llave en mano incluye unidades de lujo, gama media, utilitarios, y carga con seguro, mantenimiento y entrega inmediata en todo México.</_>
            </Fade>
          </Cell>
          <Cell mt="1.25rem">
            <Fade bottom>
              <Link to="oferta" smooth={true} offset={-50}>
                <Button as="span" fontWeight="800" fontSize="1.125rem">
                  NUESTRA OFERTA DE VALOR
                  <FaIcon
                    icon="caret-down"
                    ml="1rem"
                    fontSize="1.25rem"
                    color="var(--c-main)"
                  />
                </Button>
              </Link>
            </Fade>
          </Cell>
        </Cell>
      </Grid>
    </Box>
  </Section>
)
