/* Packages */
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html, body {
    background: #fff;

    #__next {
      display: grid;
      grid-template-areas: 'nav' 'main' 'footer';
      grid-template-columns: 100%;
      grid-template-rows: [nav] auto [main] 1fr [footer] auto;
      min-height: 100%;
    }
  }
`
