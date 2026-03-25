/* Packages */
import styled from 'styled-components'

export const Header = styled.div`
  background: url('/img/backgrounds/foto-slider.jpg');
  background-size: cover;
  color: var(--c-white);
  ${'' /* height: 100vh; */}
  padding-top: 12rem;
  position: relative;

  &:before {
    background: var(--c-black);
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.85;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`

export const Hand = styled.div`
  bottom: 10%;
  position: absolute;
  right: 0;
  width: 50%;

  @media (min-width: ${({ theme }) => theme.breakpoints.l}) {
    top: 50%;
    transform: translateY(-50%);
    width: 40%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints._m}) {
    display: none;
  }
`
