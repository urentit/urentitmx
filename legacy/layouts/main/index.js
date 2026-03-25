/* Layouts */
import Head from './head'
import Nav from './nav'
import MainContainer from './main-container'
import Footer from './footer'

/* Components */
import { WhatsappWidget } from '../../components/whatsapp-widget'

/* Styles */
import LayoutStyles from './styles'

export default ({ children, ...props }) => {
  return (
    <>
      <LayoutStyles />
      <Head {...props} />
      <Nav />
      <MainContainer>
        {children}
        <WhatsappWidget />
      </MainContainer>
      <Footer />
    </>
  )
}
