/* Default */
import React, { forwardRef } from 'react'
import Link from 'next/link'

/* Styles */
import { Button as ButtonStyled } from './styles'

/**
 * Button
 * @param {string} text (optional) - Text to display in the button
 * @param {string} target (optional) - Target of the link - e.g. _blank
 * @param {string} href (optional) - Href of the link
 * @param {string} variant (optional) - Variant of the button - Check the variants in the styles
 * @param {children} children (optional) - Children of the component
 * @param {object} props - Props to pass to the component
 */

const Button = forwardRef(({ ...props }, ref) => {
  return (
    <React.Fragment>
      {((props.target || !props.href) && (
        <ButtonLink ref={ref} {...props} />
      )) || (
        <Link href={props.href} passHref>
          <ButtonLink ref={ref} {...props} />
        </Link>
      )}
    </React.Fragment>
  )
})

export default Button

const ButtonLink = React.forwardRef(({ children, text, ...props }, ref) => {
  return (
    <ButtonStyled
      ref={ref}
      type={props.as === 'button' ? 'submit' : null}
      {...props}
    >
      {(children && children) || <span>{text}</span>}
    </ButtonStyled>
  )
})
ButtonLink.displayName = 'ButtonLink'
