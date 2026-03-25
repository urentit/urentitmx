/* Bee */
import _ from '../../../bee/grid'

export default ({ children, ...props }) => (
  <_ as="main" gridArea="main" {...props}>
    {children}
  </_>
)
