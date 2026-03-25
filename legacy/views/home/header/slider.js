/* Mocks */
import slidesHome from '../../../mocks/slides-home'

/* Components */
import { Slider, Slide } from '../../../components/slider'
import { SlideHome } from '../../../components/slide-home'

export default () => (
  <Slider
    options={{
      autoplay: true,
    }}
  >
    {slidesHome.map((slide, i) => (
      <Slide key={i}>
        <SlideHome slide={slide} />
      </Slide>
    ))}
  </Slider>
)
