/* Layouts */
import Main from '../layouts/main'

/* Contexts */
import CarProvider from '../contexts/car'

/* Views */
import Header from '../views/home/header'
import AboutUs from '../views/home/about-us'
import Offer from '../views/home/offer'
import Features from '../views/home/features'
import Cars from '../views/home/cars'
import Brands from '../views/home/brands'
import Contact from '../views/home/contact'
import Testimonials from '../views/home/testimonials'
import Faqs from '../views/home/faqs'

const Page = () => {
  return (
    <Main
      title="Arrendamiento Puro de Vehículos | Flotillas para Empresas"
      description="U Rent It es especialista en arrendamiento puro de vehículos para empresas. Flotillas ejecutivas y comerciales, beneficios fiscales y soluciones flexibles."
      canonical="https://urentit.mx/"
    >
      <CarProvider>
        <Header />
        <AboutUs />
        <Offer />
        <Features />
        <Cars />
        <Brands />
        <Contact />
        <Testimonials />
        <Faqs />
      </CarProvider>
    </Main>
  )
}

export default Page
