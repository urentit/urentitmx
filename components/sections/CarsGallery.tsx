'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Shield, Zap, Truck, Star, Bike, Wrench, type LucideProps } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { clsx } from 'clsx'

const COTIZAR = '#cotizar'

/* ─── Data ─── */
type CarItem = { name: string; slug: string; brand: string }
type LucideIcon = React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>

const CATEGORIES: { key: string; label: string; icon: LucideIcon }[] = [
  { key: 'lujo',                   label: 'Lujo',          icon: Star },
  { key: 'valor-medio',            label: 'Valor Medio',   icon: Zap },
  { key: 'utilitarios',            label: 'Utilitarios',   icon: ArrowRight },
  { key: 'carga',                  label: 'Carga',         icon: Truck },
  { key: 'blindados',              label: 'Blindados',     icon: Shield },
  { key: 'motos',                  label: 'Motos',         icon: Bike },
  { key: 'equipamiento-especial',  label: 'Especial',      icon: Wrench },
]

const CARS: Record<string, { name: string; items: CarItem[] }> = {
  'lujo': {
    name: 'Lujo',
    items: [
      { slug: 'suburban',          name: 'Suburban',           brand: 'Chevrolet' },
      { slug: 'range-rover-velar', name: 'Range Rover Velar',  brand: 'Land Rover' },
      { slug: 'model-x',           name: 'Model X',            brand: 'Tesla' },
      { slug: 'model-y',           name: 'Model Y',            brand: 'Tesla' },
      { slug: 'q5',                name: 'Q5',                 brand: 'Audi' },
      { slug: 'grand-cherokee',    name: 'Grand Cherokee',     brand: 'Jeep' },
      { slug: 'cooper',            name: 'Cooper',             brand: 'Mini' },
      { slug: 'cayman',            name: 'Cayman',             brand: 'Porsche' },
    ],
  },
  'valor-medio': {
    name: 'Valor Medio',
    items: [
      { slug: 'sentra',       name: 'Sentra',       brand: 'Nissan' },
      { slug: 'sienna-hybrid',name: 'Sienna Hybrid',brand: 'Toyota' },
      { slug: 'prius',        name: 'Prius',        brand: 'Toyota' },
      { slug: 'teramont',     name: 'Teramont',     brand: 'Volkswagen' },
      { slug: 'tiguan',       name: 'Tiguan',       brand: 'Volkswagen' },
      { slug: 'seltos',       name: 'Seltos',       brand: 'KIA' },
      { slug: 'sportage',     name: 'Sportage',     brand: 'KIA' },
      { slug: 'odissey',      name: 'Odyssey',      brand: 'Honda' },
    ],
  },
  'utilitarios': {
    name: 'Utilitarios',
    items: [
      { slug: 'aveo',  name: 'Aveo',  brand: 'Chevrolet' },
      { slug: 'march', name: 'March', brand: 'Nissan' },
      { slug: 'mobi',  name: 'Mobi',  brand: 'Fiat' },
      { slug: 'vento', name: 'Vento', brand: 'Volkswagen' },
    ],
  },
  'carga': {
    name: 'Carga',
    items: [
      { slug: 'np300',    name: 'NP300',    brand: 'Nissan' },
      { slug: 'hilux',    name: 'Hilux',    brand: 'Toyota' },
      { slug: 'hiace',    name: 'Hiace',    brand: 'Toyota' },
      { slug: 'transit',  name: 'Transit',  brand: 'Ford' },
      { slug: 'crafter',  name: 'Crafter',  brand: 'Volkswagen' },
      { slug: 'promaster',name: 'Promaster',brand: 'RAM' },
      { slug: 'elf-300',  name: 'Elf 300',  brand: 'Isuzu' },
      { slug: 'prostar',  name: 'Prostar',  brand: 'International' },
    ],
  },
  'blindados': {
    name: 'Blindados',
    items: [
      { slug: 'suburban',       name: 'Suburban',       brand: 'Chevrolet' },
      { slug: 'navigator',      name: 'Navigator',      brand: 'Lincoln' },
      { slug: 'grand-cherokee', name: 'Grand Cherokee', brand: 'Jeep' },
      { slug: 'escalade',       name: 'Escalade',       brand: 'Cadillac' },
    ],
  },
  'motos': {
    name: 'Motos',
    items: [
      { slug: 'v4s-red-travel',  name: 'V4S Red Travel',   brand: 'Ducati' },
      { slug: 'street-scrambler',name: 'Street Scrambler', brand: 'Triumph' },
    ],
  },
  'equipamiento-especial': {
    name: 'Equipamiento Especial',
    items: [
      { slug: '1828-p', name: '1828 P',  brand: 'Hino' },
      { slug: 'elf-800k',name: 'Elf 800K',brand: 'Isuzu' },
      { slug: 'partner', name: 'Partner', brand: 'Peugeot' },
      { slug: 'prostar', name: 'Prostar', brand: 'International' },
    ],
  },
}

/* ─── Car Card ─── */
function CarCard({ car, category, onSelect }: { car: CarItem; category: string; onSelect: (car: CarItem) => void }) {
  const imgPath = `/img/cars/${category}/${car.slug}.jpg`

  const handleClick = () => {
    onSelect(car)
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      ;(window as any).dataLayer.push({ event: 'car_card_click', car_name: car.name, category })
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-black-secondary border border-white/5 rounded-sm overflow-hidden cursor-pointer hover:border-gold/30 transition-all duration-300"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black-light">
        <Image
          src={imgPath}
          alt={`${car.brand} ${car.name}`}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => {/* fallback handled by CSS */}}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        {/* CTA on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-2 text-gold font-sans font-semibold text-sm bg-black/70 border border-gold/40 rounded-sm px-4 py-2">
            Ver detalle <ArrowRight size={14} />
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-4">
        <p className="text-white/40 font-sans text-xs tracking-widest uppercase mb-1">{car.brand}</p>
        <h3 className="text-white font-sans font-semibold text-base group-hover:text-gold transition-colors duration-200">
          {car.name}
        </h3>
      </div>
    </motion.div>
  )
}

/* ─── Car Modal ─── */
function CarModal({ car, category, onClose }: { car: CarItem; category: string; onClose: () => void }) {
  const imgPath = `/img/cars/${category}/${car.slug}.jpg`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-lg bg-black-secondary border border-white/10 rounded-sm overflow-hidden shadow-dark"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white bg-black/50 rounded-full transition-colors"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>

        {/* Image */}
        <div className="relative aspect-video bg-black-light">
          <Image
            src={imgPath}
            alt={`${car.brand} ${car.name}`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-secondary via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <Badge variant="dark" className="mb-3">{CARS[category]?.name}</Badge>
          <p className="text-white/40 font-sans text-xs tracking-widest uppercase mb-1">{car.brand}</p>
          <h3 className="font-display text-2xl text-white font-bold mb-4">{car.name}</h3>
          <p className="text-white/50 font-sans text-sm leading-relaxed mb-6">
            Disponible en arrendamiento puro con planes flexibles, mantenimiento incluido y
            beneficios fiscales y mantenimiento incluido. Consulta disponibilidad y condiciones con nuestro equipo.
          </p>
          <ButtonLink
            href={COTIZAR}
            variant="primary"
            size="md"
            className="w-full justify-center"
          >
            Cotizar {car.name}
          </ButtonLink>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main component ─── */
export function CarsGallery() {
  const [activeTab, setActiveTab] = useState('lujo')
  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null)

  const current = CARS[activeTab]

  return (
    <section
      id="vehiculos-ejemplo"
      className="section-padding bg-black-secondary relative overflow-hidden"
      aria-label="Vehículos que arrendamos"
    >
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-1 bg-gold/20 blur-sm" />

      <div className="container-site">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-5">Catálogo</Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-4"
          >
            Vehículos que{' '}
            <span className="text-gold italic">arrendamos</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 font-sans text-base md:text-lg max-w-2xl mx-auto"
          >
            Desde utilitarios hasta vehículos de lujo y blindados. Contamos con
            más de 7 categorías para cubrir cualquier necesidad empresarial.
          </motion.p>
        </div>

        {/* Tabs — scrollable on mobile */}
        <div className="relative mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
            {CATEGORIES.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={clsx(
                  'flex-shrink-0 snap-start inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-sans text-sm font-medium transition-all duration-200 border',
                  activeTab === key
                    ? 'bg-gold text-black border-gold'
                    : 'bg-transparent text-white/50 border-white/10 hover:text-white hover:border-white/20'
                )}
                aria-pressed={activeTab === key}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
          {/* Fade edge on mobile */}
          <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-black-secondary to-transparent pointer-events-none lg:hidden" />
        </div>

        {/* Category label */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-1 h-6 bg-gold rounded-full" />
          <h3 className="font-display text-xl text-white font-semibold">
            {current?.name}
          </h3>
          <span className="text-white/30 font-sans text-sm">
            {current?.items.length} vehículos
          </span>
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {current?.items.map((car) => (
              <CarCard
                key={`${activeTab}-${car.slug}`}
                car={car}
                category={activeTab}
                onSelect={setSelectedCar}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 font-sans text-sm mb-4">
            ¿No encuentras lo que buscas? Tenemos acceso a más modelos.
          </p>
          <ButtonLink
            href={COTIZAR}
            variant="outline"
            size="md"
          >
            Solicitar modelo específico
          </ButtonLink>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCar && (
          <CarModal
            car={selectedCar}
            category={activeTab}
            onClose={() => setSelectedCar(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
