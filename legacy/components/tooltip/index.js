/* Bee */
import FaIcon from '../../bee/fa-icon'

/* Packages */
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

/* Styles */
import { Button } from './styles'

/**
 * Info
 * @docs https://atomiks.github.io/tippyjs/v6/getting-started/
 * @param {component} content - Tippy content component - e.g. <div>...</div>
 * @returns
 */

export const Info = ({ children, content, ...props }) => {
  return (
    <Tippy content={content} trigger="click" {...props}>
      <Button>
        <FaIcon icon="circle-info" />
      </Button>
    </Tippy>
  )
}
