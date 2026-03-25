import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'

const ALL_BRANDS = [
  { slug: 'acura',          name: 'Acura' },
  { slug: 'alfa-romeo',     name: 'Alfa Romeo' },
  { slug: 'audi',           name: 'Audi' },
  { slug: 'bmw',            name: 'BMW' },
  { slug: 'bugatti',        name: 'Bugatti' },
  { slug: 'cadillac',       name: 'Cadillac' },
  { slug: 'chevrolet',      name: 'Chevrolet' },
  { slug: 'cupra',          name: 'Cupra' },
  { slug: 'ducati',         name: 'Ducati' },
  { slug: 'ferrari',        name: 'Ferrari' },
  { slug: 'ford',           name: 'Ford' },
  { slug: 'gmc',            name: 'GMC' },
  { slug: 'hino',           name: 'Hino' },
  { slug: 'honda',          name: 'Honda' },
  { slug: 'international',  name: 'International' },
  { slug: 'isuzu',          name: 'Isuzu' },
  { slug: 'jaguar',         name: 'Jaguar' },
  { slug: 'kenworth',       name: 'Kenworth' },
  { slug: 'kia',            name: 'KIA' },
  { slug: 'lamborghini',    name: 'Lamborghini' },
  { slug: 'land-rover',     name: 'Land Rover' },
  { slug: 'lexus',          name: 'Lexus' },
  { slug: 'man',            name: 'MAN' },
  { slug: 'maserati',       name: 'Maserati' },
  { slug: 'mazda',          name: 'Mazda' },
  { slug: 'mercedes-benz',  name: 'Mercedes-Benz' },
  { slug: 'nissan',         name: 'Nissan' },
  { slug: 'peugeot',        name: 'Peugeot' },
  { slug: 'polaris',        name: 'Polaris' },
  { slug: 'porsche',        name: 'Porsche' },
  { slug: 'rr',             name: 'Rolls-Royce' },
  { slug: 'tesla',          name: 'Tesla' },
  { slug: 'toyota',         name: 'Toyota' },
  { slug: 'volkswagen',     name: 'Volkswagen' },
]

/* Split into two rows for the dual-direction marquee */
const ROW_1 = ALL_BRANDS.slice(0, 17)
const ROW_2 = ALL_BRANDS.slice(17)

function BrandLogo({ brand }: { brand: typeof ALL_BRANDS[0] }) {
  return (
    <div className="group flex-shrink-0 w-72 h-40 mx-6 flex items-center justify-center">
      <div className="relative w-60 h-32 opacity-35 group-hover:opacity-90 transition-all duration-300 grayscale group-hover:grayscale-0">
        <Image
          src={`/img/brands/logo-${brand.slug}.png`}
          alt={brand.name}
          fill
          className="object-contain"
          sizes="80px"
        />
      </div>
    </div>
  )
}

function MarqueeRow({
  brands,
  reverse = false,
}: {
  brands: typeof ALL_BRANDS
  reverse?: boolean
}) {
  /* Duplicate so the loop is seamless */
  const doubled = [...brands, ...brands]

  return (
    <div className="flex overflow-hidden pause-on-hover">
      <div
        className={reverse ? 'animate-marquee-reverse flex' : 'animate-marquee flex'}
        aria-hidden="true"
      >
        {doubled.map((brand, i) => (
          <BrandLogo key={`${brand.slug}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  )
}

export function Brands() {
  return (
    <section
      id="marcas-disponibles"
      className="section-padding bg-black overflow-hidden relative"
      aria-label="Marcas disponibles"
    >
      {/* Top separator line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-site mb-12 text-center">
        <Badge className="mb-5">Marcas</Badge>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-4">
          Más de{' '}
          <span className="text-gold italic">36 marcas</span>
          {' '}disponibles
        </h2>
        <p className="text-white/50 font-sans text-base md:text-lg max-w-2xl mx-auto">
          Trabajamos con las mejores marcas del mundo automotriz, desde vehículos
          de trabajo hasta superdeportivos y flotillas comerciales.
        </p>
      </div>

      {/* Marquee rows */}
      <div className="space-y-4">
        <MarqueeRow brands={ROW_1} reverse={false} />
        <MarqueeRow brands={ROW_2} reverse={true} />
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  )
}
