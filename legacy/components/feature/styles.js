/* Packaes */
import styled from 'styled-components'
import * as ss from 'styled-system'

export const Feature = styled.div`
  text-align: center;

  ${ss.compose(ss.color)}
`

export const Label = styled.p`
  font-size: 1rem;
  font-weight: 700;
  margin-top: 0.625rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.x}) {
    font-size: 1.2rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.s}) {
    font-size: 1.5rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.l}) {
    font-size: 1rem;
  }
`

export const DD = styled.dd`
  font-size: 0.875rem;
  margin: 0rem;
  margin-top: 1rem;
  padding: 0rem;
`
