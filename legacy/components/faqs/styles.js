/* Packages */
import styled, { css } from 'styled-components'

export const Faq = styled.details`
  border: solid 2px var(--c-main);
  border-radius: 1.875rem;
  height: 100%;
  ${'' /* padding: 1rem 1.5625rem; */}

  ${(props) =>
    props.open &&
    css`
      padding-bottom: 1rem;
    `}
`

export const Question = styled.summary`
  align-items: center;
  display: flex;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 700;
  grid-gap: 1rem;
  justify-content: space-between;
  padding: 1rem 1.5625rem;
  transition: all 0.2s ease, font-size 0s;
  user-select: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.s}) {
    font-size: 1rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.m}) {
    font-size: 1.125rem;
  }

  & svg {
    font-size: 1.25rem;
    transition: color 0.2s ease;
  }

  &:hover {
    & svg {
      color: var(--c-main);
    }
  }

  ${(props) =>
    props.open &&
    css`
      margin-bottom: -1rem;
      & svg {
        transform: rotate(180deg);
      }
    `}
`

export const Answer = styled.p`
  font-size: 1rem;
  max-height: 0px;
  opacity: 0;
  overflow: hidden;
  padding: 1rem 1.5625rem;
  transition: max-height 0.2s ease, opacity 0.2s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints._l}) {
    font-size: 0.875rem;
  }

  ${(props) =>
    props.open &&
    css`
      max-height: ${(props) => props.height}px;
      opacity: 1;
    `}

  & p {
    display: block;
    padding: 0px;
    padding-top: 1rem;
  }
`
