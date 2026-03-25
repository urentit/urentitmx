/* Default */
import Image from 'next/image'
import { useRouter } from 'next/router'

/* Packages */
import Fade from 'react-reveal/Fade'

/* Bee */
import { Box, Grid, Cell } from '../../../bee/grid'

/* Components */
import Section from '../../../components/section'

/* Styles */
import { Header, Hand } from './styles'

/* Images */
import { hand } from '../../../lib/images'

/* ./ */
import Slider from './slider'

export default () => {
  const router = useRouter()

  return (
    <Header as={Section} style={{overflow: 'hidden'}}>
      {router.pathname === '/' && (
        <Fade right>
          <Hand>
            <Image src={hand} alt="Fondo con SUV para arrendamiento de vehículos premium, gama media, utilitarios, comerciales, carga y blindados" width={1200} height={1000} priority />
          </Hand>
        </Fade>
      )}
      <Box height="100%">
        <Grid
          gridTemplateColumns={{ _: '1fr', l: '1fr 1fr' }}
          alignItems="center"
          height="100%"
        >
          <Cell>
            <Slider />
          </Cell>
        </Grid>
      </Box>
    </Header>
  )
}
