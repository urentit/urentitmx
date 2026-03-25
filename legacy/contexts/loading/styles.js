/* Packages */
import styled from 'styled-components'

/* Loaders */
import { Waves } from './loader'

export const WavesStyled = styled(Waves)`
  background-color: rgba(255, 255, 255, .3);
  height: 100%;
  left: 0px;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 9999999999999;

  & svg {
    background: none;
    display: block;
    left: 50%;
    margin: auto;
    position: absolute;
    shape-rendering: auto;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, .3);
  }
`
