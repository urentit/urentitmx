/* Packages */
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    --main-font: 'Open Sans';
    --secondary-font: 'Open Sans', var(--default-font);

    ${'' /* Colors */}
      --c-white: #fff;
      --c-black: #000;
      --c-black-light: #1c1c1c;
      --c-main: #e1be4a;
      --c-bg-grey: #f8f8f8;
      --c-shadow: #0000001a;
      --c-grey-dark: #292929;
      --c-grey-button: #e6e6e6;
      --c-placeholder: #c7c7c7;
      --c-whatsapp: #00B407;
    }
  }

  .main-font {
    font-family: var(--main-font);
  }

  .secondary-font {
    font-family: var(--secondary-font);
  }

  .swal2-container {
    & .swal2-html-container {
      margin: 0px;
    }
    & .swal2-popup {
      background: var(--c-black);
      border-radius: 10px;
      color: var(--c-white);
      max-width: 600px;
      padding: 1.25rem 0;
      width: 100%;

      @media (min-width: 768px) {
        padding: 2.5rem 0;
      }

      & .swal2-close {
        border: none !important;
        box-shadow: none !important;
      }
    }
  }

  .btn-discreto {
    background-color: transparent !important;
    border: none !important;
    color: #888 !important;
    cursor: pointer !important;
    font-size: 12px !important;
    padding: 0 !important;
    text-decoration: underline !important;
  }
  .btn-discreto:hover {
    color: #aaa !important;
  }
`
