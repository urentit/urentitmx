/* Packages */
import styled, { css } from 'styled-components'

export const Header = styled.header`
  color: var(--c-white);
  box-shadow: 0 0.125rem 0.25rem 0 var(--c-shadows);
  left: 0;
  padding: 1.25rem 0;
  position: fixed;
  top: 0;
  transition: background 0.2s ease, padding 0.2s ease;
  width: 100%;
  z-index: 100;

  ${(props) =>
    props.isSticky &&
    css`
      background: var(--c-black);
      padding: 0;
    `}
`

export const Logo = styled.div`
  transition: width 0.2s ease;
  width: 120px;

  ${(props) =>
    props.isSticky &&
    css`
      width: 50px;
    `}
`

export const Nav = styled.nav`
  transition: padding 0.2s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints._l}) {
    background: var(--c-black);
    border: solid 4px var(--c-main);
    border-radius: 1.875rem;
    box-shadow: 0 1.25rem 1rem var(--c-shadow);
    left: 50%;
    padding: 40px 20px;
    position: fixed;
    top: 50%;
    transition: transform 0.2s ease;
    transform: translate(-50%, -50%) scale(0);
    width: min(400px, 90%);
    z-index: 110;

    ${(props) =>
      props.isOpen &&
      css`
        transform: translate(-50%, -50%) scale(1);
      `}
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.l}) {
    ${(props) =>
      props.isSticky &&
      css`
        padding: 5px 0;
      `}
  }
`

export const Items = styled.ul`
  align-items: center;
  display: flex;
  margin: 0;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints._l}) {
    flex-direction: column;
  }
`

export const Item = styled.li`
  list-style: none;

  & a {
    color: var(--c-white);
    font-weight: 700;
    padding: 1rem 0;

    &.active {
      color: var(--c-main);
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.l}) {
      padding: 0.625rem;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
      padding: 1rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints._l}) {
    margin: 0.625rem 0;

    & a {
      font-size: 1.25rem;
    }
  }
`
