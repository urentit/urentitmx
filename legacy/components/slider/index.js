/* Bee */
import FaIcon from '../../bee/fa-icon'

/* Packages */
import { SplideTrack, SplideSlide } from '@splidejs/react-splide'
import { Grid } from '@splidejs/splide-extension-grid'

/* Styles */
import { Slider as SliderStyled, Arrows as ArrowsStyled, Arrow } from './styles'

/**
 * Slider
 * @param {object} children - Slides
 * @param {object} options - Options for the slider - docs at https://splidejs.com/guides/options
 * @param {object} props - Props for the component
 * @returns
 */

export const Slider = ({ children, options, ...props }) => {
  const defaultOptions = {
    arrows: false,
    pagination: false,
    rewind: true,
    keyboard: 'global'
  }

  return (
    <SliderStyled
      extensions={{ Grid }}
      hasTrack={false}
      options={{ ...defaultOptions, ...options }}
      {...props}
    >
      {options?.arrows && <Arrows />}
      <SplideTrack>{children}</SplideTrack>
    </SliderStyled>
  )
}

/**
 * Slider
 * @param {object} children
 * @param {object} props - Props for the component
 * @returns
 */

export const Slide = ({ children, ...props }) => (
  <SplideSlide {...props}>{children}</SplideSlide>
)

const Arrows = ({ ...props }) => (
  <ArrowsStyled className="splide__arrows" {...props}>
    <Arrow left className="splide__arrow splide__arrow--prev" aria-label="Vehículo anterior" tabIndex={0}>
      <FaIcon icon="caret-left" />
    </Arrow>
    <Arrow right className="splide__arrow splide__arrow--next" aria-label="Vehículo siguiente" tabIndex={0}>
      <FaIcon icon="caret-right" />
    </Arrow>
  </ArrowsStyled>
)
