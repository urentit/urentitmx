'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { clsx } from 'clsx'

const TESTIMONIALS = [
  {
    img: '/img/testimonials/demo-resena-1.jpg',
    author: 'Eduardo R.',
    role: 'Director General',
    rate: 5,
    quote: 'La atención y el servicio pronto y oportuno, definitivamente regresaré por otro auto.',
  },
  {
    img: '/img/testimonials/demo-resena-2.jpg',
    author: 'Arturo H.',
    role: 'Empresario',
    rate: 5,
    quote: 'Las rentas son accesibles, tienen disponibilidad para acudir a donde sea necesario, quedé satisfecho con toda la ayuda que se me brindó.',
  },
  {
    img: '/img/testimonials/demo-resena-3.jpg',
    author: 'Carla E.',
    role: 'Gerente de Operaciones',
    rate: 5,
    quote: 'Ofrecen distintas alternativas, los planes son acorde con lo que estaba buscando. Los recomiendo ampliamente.',
  },
  {
    img: '/img/testimonials/demo-resena-4.jpg',
    author: 'Moisés T.',
    role: 'Emprendedor',
    rate: 5,
    quote: 'Los recomiendo de todo a todo, atención, rapidez y el coche que estuve buscando, con ellos lo conseguí.',
  },
]

const reviewsSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://urentit.mx/#localbusiness',
  name: 'U Rent It',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    worstRating: '1',
    reviewCount: String(TESTIMONIALS.length),
  },
  review: TESTIMONIALS.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.author },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(t.rate),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: t.quote,
  })),
}

function StarRating({ rate }: { rate: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rate} estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className={i < rate ? 'text-gold' : 'text-white/15'}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  return (
    <div className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-black-secondary border border-white/5 hover:border-gold/20 rounded-sm p-6 md:p-7 transition-all duration-300 flex flex-col gap-5">
      {/* Quote icon */}
      <Quote size={24} className="text-gold/30" />

      {/* Stars */}
      <StarRating rate={testimonial.rate} />

      {/* Quote text */}
      <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed flex-1 italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gold/20">
          <Image
            src={testimonial.img}
            alt={testimonial.author}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <p className="text-white font-sans font-semibold text-sm">{testimonial.author}</p>
          <p className="text-white/40 font-sans text-xs">{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const autoplay = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }))

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [autoplay.current]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  // Pause on hover
  const handleMouseEnter = () => autoplay.current.stop()
  const handleMouseLeave = () => autoplay.current.play()

  return (
    <section
      id="opiniones-clientes"
      className="section-padding bg-black relative overflow-hidden"
      aria-label="Opiniones de clientes"
      ref={ref}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      {/* Decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-site relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4">Testimonios</Badge>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold"
            >
              Lo que dicen{' '}
              <span className="text-gold italic">nuestros clientes</span>
            </motion.h2>
          </div>

          {/* Navigation arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-2 flex-shrink-0"
          >
            <button
              onClick={scrollPrev}
              className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/50 hover:border-gold/40 hover:text-gold rounded-sm transition-all duration-200"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/50 hover:border-gold/40 hover:text-gold rounded-sm transition-all duration-200"
              aria-label="Siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>

        {/* Carousel */}
        <div
          className="overflow-hidden"
          ref={emblaRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex gap-6">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex items-center gap-3 justify-center"
        >
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" className="text-gold" fill="currentColor" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-white/40 font-sans text-sm">
            5.0 · Calificación promedio de nuestros clientes
          </span>
        </motion.div>
      </div>
    </section>
  )
}
