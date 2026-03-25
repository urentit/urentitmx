/* Packages */
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

/* Styles */
import { FaIconStyled } from './styles'

/* Settings */
config.autoAddCss = false

/**
 * @function default
 * @docs layout - https://styled-system.com/table#layout
 * @docs position - https://styled-system.com/table#position
 * @docs space - https://styled-system.com/table#space
 * @docs typography - https://styled-system.com/table#typography
 * @param {string} lib - The library to use.
 * @param {string} icon - The icon to use.
 * @param {object} props - The props to pass to the component.
 * @returns {object} - The component.
 */

export default ({ lib, icon, ...props }) => {
  return <FaIconStyled icon={[lib, icon]} {...props} />
}
