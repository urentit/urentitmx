/* Packages */
import styled from 'styled-components'

export const Card = styled.div`
  background: var(--c-white);
  border-radius: 0.625rem;
  border: 2px solid var(--c-main);
  display: grid;
  ${'' /* flex-direction: column; */}
  ${'' /* grid-gap: 1rem; */}
  height: 100%;
  justify-content: flex-start;
  padding: 1rem 1.25rem;
  text-align: center;
  transition: background 0.2s ease;
  user-select: none;
`

export const Icon = styled.div`
  flex: 0 0 3.75rem;
`

export const Label = styled.p`
  color: var(--c-black);
  font-size: 1rem;
  font-size: 1rem;
  font-weight: 800;
  font-weight: 800;

  @media (min-width: ${({ theme }) => theme.breakpoints.l}) {
    font-size: 1.125rem;
  }
`

export const DT = styled.dt`
  align-items: center;
  display: flex;
  flex-direction: column;
  grid-gap: 1rem;
  justify-content: flex-start;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: row;
    text-align: left;
  }
`

export const DD = styled.dd`
  color: var(--c-black);
  font-size: 0.875rem;
  margin-top: -0.625rem;
  padding-left: 2.2rem;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    margin: 0rem;
    margin-top: 1rem;
    padding: 0rem;
    text-align: center;
  }
`
