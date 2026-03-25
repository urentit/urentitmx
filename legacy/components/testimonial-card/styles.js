/* Packages */
import styled, { css } from 'styled-components'

export const Card = styled.article`
  background: var(--c-white);
  border-radius: 1.875rem;
  box-shadow: 3px 3px 10px var(--c-shadow);
  height: 100%;
  overflow: hidden;
`

export const Content = styled.div`
  padding: 1.25rem 1.5625rem;
`

export const Img = styled.div`
  height: 200px;
  position: relative;
  width: 100%;
`

export const Auhor = styled.h3`
  font-size: 1.125rem;
  font-weight: 800;

  @media (max-width: ${({ theme }) => theme.breakpoints._s}) {
    font-size: 1rem;
  }
`

export const Rate = styled.div`
  color: var(--c-main);
`

export const Quote = styled.p`
  margin-top: 0.625rem;

  @media (max-width: ${({ theme }) => theme.breakpoints._s}) {
    font-size: 0.875rem;
  }
`
