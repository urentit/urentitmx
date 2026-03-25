/* Default */
import { useRouter } from 'next/router'
import NextLink from 'next/link'

/* Packages */
import { Link } from 'react-scroll'

/* Mocks */
import menu from '../../../mocks/menu'

/* Components */
import Button from '../../../components/button'

/* Styles */
import { Items as StyledItems, Item } from './styles'

export const Items = ({ setOpen }) => {
  const router = useRouter()

  return (
    <StyledItems>
      {menu.map((item, i) => (
        <Item key={i}>
          {router.pathname === '/' ? (
            <HomeItems item={item} setOpen={setOpen} />
          ) : (
            <NormalItems item={item} setOpen={setOpen} />
          )}
        </Item>
      ))}
      <Item>{router.pathname === '/' ? <HomeQuote /> : <NormalQuote />}</Item>
    </StyledItems>
  )
}

const HomeItems = ({ item, setOpen }) => (
  <Link
    href={`#${item.hash}`}
    spy={true}
    to={item.hash}
    smooth={true}
    offset={-50}
    activeClass="active"
  >
    <Button as="span" text={item.title} onClick={() => setOpen(false)} />
  </Link>
)

const NormalItems = ({ item, setOpen }) => (
  <Button
    href={`/#${item.hash}`}
    text={item.title}
    onClick={() => setOpen(false)}
  />
)

const HomeQuote = () => (
  <Link to="formulario-cotizacion" smooth={true} offset={-50}>
    <Button
      aria-label="Ir al formulario de cotización"
      as="span"
      text="Solicita cotización"
      variant="main-white"
      fontSize="1rem"
      small
    />
  </Link>
)

const NormalQuote = () => (
  <NextLink href="/#formulario-cotizacion">
    <Button
      as="span"
      aria-label="Ir al formulario de cotización"
      text="Solicita cotización"
      variant="main-white"
      fontSize="1rem"
      small
    />
  </NextLink>
)
