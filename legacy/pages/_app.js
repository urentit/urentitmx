/* Packages */
import 'moment/locale/es'
import { ThemeProvider } from 'styled-components'
import { GTMProvider } from '@elgorditosalsero/react-gtm-hook'

/* Libraries */
import '../lib/fontawesome'

/* Config */
import theme from '../config/theme'

/* Contexts */
import LoadingProvider from '../contexts/loading'

/* Styles */
import BeeNormalizeCss from '../bee/css'
import GlobalStyles from '../styles/global'
import '../styles/globals.scss'

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const gtmParams = { id: 'GTM-T7CFMMR8' }

  return (
    <GTMProvider state={gtmParams}>
      <ThemeProvider theme={theme}>
        <BeeNormalizeCss />
        <GlobalStyles />
        <LoadingProvider>
          <Component {...pageProps} />
        </LoadingProvider>
      </ThemeProvider>
    </GTMProvider>
  )
}

export default App
