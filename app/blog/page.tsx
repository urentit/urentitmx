import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Blog de Arrendamiento Vehicular | U Rent It',
  description:
    'Artículos, guías y comparativas sobre arrendamiento puro de vehículos para empresas en México. Aprende a optimizar la movilidad de tu empresa.',
  alternates: { canonical: 'https://urentit.mx/blog' },
  openGraph: {
    title: 'Blog | U Rent It — Arrendamiento Puro de Vehículos',
    description:
      'Guías y artículos sobre arrendamiento vehicular para empresas en México.',
    url: 'https://urentit.mx/blog',
    images: [{ url: 'https://urentit.mx/img/og-image.jpg', width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://urentit.mx' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://urentit.mx/blog' },
  ],
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/6 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="container-site relative z-10">
          <nav className="flex items-center gap-2 text-white/30 font-sans text-xs mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold transition-colors duration-150">Inicio</Link>
            <span>/</span>
            <span className="text-white/60">Blog</span>
          </nav>
          <Badge className="mb-5">Recursos</Badge>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight mb-4 max-w-2xl">
            Blog de{' '}
            <span className="text-gold italic">arrendamiento</span>
          </h1>
          <p className="text-white/50 font-sans text-lg max-w-xl">
            Guías, comparativas y recursos para que tomes la mejor decisión de movilidad para tu empresa.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="section-padding bg-black-secondary">
        <div className="container-site">
          {posts.length === 0 ? (
            <p className="text-white/40 font-sans text-center py-20">Próximamente — primeros artículos en camino.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-black border border-white/5 hover:border-gold/25 rounded-sm p-6 flex flex-col gap-4 transition-all duration-300 cursor-pointer"
                >
                  {/* Category */}
                  <div className="flex items-center gap-2">
                    <Tag size={11} className="text-gold/60" />
                    <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-gold/60">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-lg font-bold text-white group-hover:text-gold transition-colors duration-200 leading-snug">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-white/45 font-sans text-sm leading-relaxed flex-1">
                    {post.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 text-white/30 font-sans text-xs">
                      <Clock size={11} />
                      <span>{post.readTime} lectura</span>
                      <span>·</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-gold/40 group-hover:text-gold group-hover:translate-x-1 transition-all duration-200"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
