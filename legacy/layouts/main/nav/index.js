/* Default */
import Image from 'next/image'
import { useEffect, useState } from 'react'

/* Bee */
import _, { Box, Flex, Cell } from '../../../bee/grid'
import FaIcon from '../../../bee/fa-icon'

/* Packages */
import ClickAwayListener from 'react-click-away-listener'

/* Components */
import Button from '../../../components/button'

/* Styles */
import { Header, Logo, Nav } from './styles'

/* Images */
import { logo } from '../../../lib/images'

/* ./ */
import { Items } from './items'

export default ({ ...props }) => {
  const [isSticky, setSticky] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const handleScroll = () => {
    const isSticky = window.scrollY > 0
    setSticky(isSticky)
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Header id="encabezado-principal" gridArea="nav" {...props} isSticky={isSticky}>
      <Box>
        <Flex alignItems="flex-start" justifyContent="space-between">
          <Cell
            alignSelf="center"
            flex="0 0 200px"
            py="0"
            display="flex"
            alignItems="center"
          >
            <Button href="/" aria-label="Ir al inicio de U Rent It">
              <Logo isSticky={isSticky}>
                <Image src={logo} alt="U Rent It - Arrendamiento de vehículos empresariales" width={424} height={500} />
              </Logo>
            </Button>
            {/* <_ ml="1.25rem">
              <Logo isSticky={isSticky}>
                <Image src={ebu} width={80} height={46} alt={app.name} />
              </Logo>
            </_> */}
          </Cell>
          <Cell flex="0 0 auto">
            <Button
              display={{ l: 'none' }}
              onClick={(e) => {
                e.stopPropagation()
                setOpen(!isOpen)
              }}
              fontSize="2rem"
            >
              <FaIcon icon={isOpen ? 'times' : 'bars'} />
            </Button>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Nav isSticky={isSticky} isOpen={isOpen} role="navigation" aria-label="Navegación principal">
                <Items setOpen={setOpen} />
              </Nav>
            </ClickAwayListener>
          </Cell>
        </Flex>
      </Box>
    </Header>
  )
}
