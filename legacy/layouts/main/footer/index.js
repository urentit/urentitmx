/* Default */
import Image from 'next/image'

/* Packages */
import moment from 'moment'

/* Bee */
import _, { Box, Grid, Cell } from '../../../bee/grid'
import FaIcon from '../../../bee/fa-icon'

/* Mocks */
import app from '../../../mocks/app'
import routes from '../../../mocks/routes'

/* Images */
import { logo, ebu } from '../../../lib/images'

/* Components */
// import { Logo } from '../../../components/dinkbit'
import Button from '../../../components/button'

export default () => (
  <_
    id="footer-urentit"
    as="footer"
    background="var(--c-black)"
    color="var(--c-white)"
    gridArea="footer"
    pt="1.25rem"
    pb="4rem"
  >
    <Box>
      <Grid
        gridTemplateColumns={{
          _: '1fr',
          m: '30% 70%',
          l: '33.33% 33.33% 33.33%',
        }}
        justifyItems="center"
      >
        <Cell>
          <Grid display="flex">
            <Cell>
              <Button href={routes['home.index']} aria-label="Inicio U Rent It">
                <Image
                  src={logo}
                  width={120}
                  height={142}
                  alt="U Rent It - Arrendamiento vehicular empresarial"
                />
              </Button>
            </Cell>
            <Cell>
              <Button href={routes['home.index']}>
                <Image src={ebu} width={80} height={46} alt={app.name} />
              </Button>
            </Cell>
          </Grid>
        </Cell>
        <Cell textAlign="center">
          {/* prettier-ignore */}
          <small>{app.name} © {moment().format('Y')}. <_ as="span" display="inline-block">Todos los derechos reservados.</_></small>
          <div className="redes-sociales">
            <_ as="p" display="flex" justifyContent="center" gridGap="20px">
              <Button
                href="https://www.facebook.com/Urentit.mx/"
                target="_blank"
                rel="noreferrer"
              >
                <FaIcon icon="facebook-f" lib="fab" />
              </Button>
              <Button
                href="https://www.instagram.com/urent.it/?igshid=YmMyMTA2M2Y="
                target="_blank"
                rel="noreferrer"
              >
                <FaIcon icon="instagram" lib="fab" />
              </Button>
              <Button
                href="https://www.linkedin.com/company/urentit"
                target="_blank"
                rel="noreferrer"
              >
                <i class="fa-brands fa-linkedin-in"></i>
              </Button>
              <Button
                href="https://www.tiktok.com/@urentit"
                target="_blank"
                rel="noreferrer"
              >
                <i class="fa-brands fa-tiktok"></i>
              </Button>
            </_>
          </div>
          <p>
            <Button
              href={routes['privacy.index']}
              text="Aviso de privacidad"
              underline
              target="_blank"
              rel="noopener"
            />
          </p>
          <br />
          <p>
            <Button
              href="https://cotiza.urentit.mx/"
              target="_blank"
              rel="noreferrer"
              text="COTIZADOR"
              variant="main-white"
              small
              className="btn-discreto"
            />
          </p>
        </Cell>
        {/* <Cell mt={{ _: '1.25rem', m: '0rem' }}>
          <Logo logo="dinkbit-hca-blanco" width="90px" />
        </Cell> */}
      </Grid>
    </Box>
  </_>
)
