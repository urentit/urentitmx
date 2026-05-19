import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPost, getAllSlugs } from '@/lib/blog'
import { ButtonLink } from '@/components/ui/Button'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Blog U Rent It`,
    description: post.description,
    alternates: { canonical: `https://urentit.mx/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://urentit.mx/blog/${post.slug}`,
      type: 'article',
      images: [{ url: 'https://urentit.mx/img/og-image.jpg', width: 1200, height: 630 }],
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'U Rent It', url: 'https://urentit.mx' },
    publisher: { '@type': 'Organization', name: 'U Rent It', url: 'https://urentit.mx' },
    url: `https://urentit.mx/blog/${post.slug}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://urentit.mx' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://urentit.mx/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://urentit.mx/blog/${post.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Header */}
      <section className="relative pt-32 pb-12 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/6 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="container-site relative z-10 max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/30 font-sans text-xs mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold transition-colors duration-150">Inicio</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gold transition-colors duration-150">Blog</Link>
            <span>/</span>
            <span className="text-white/60 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-white/40 font-sans text-xs">
            <span className="flex items-center gap-1.5 text-gold/70">
              <Tag size={11} />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              {post.readTime} de lectura
            </span>
            <span>{formatDate(post.date)}</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-black-secondary py-16">
        <div className="container-site max-w-3xl">
          <article className="prose-blog">
            <MDXRemote source={post.content} />
          </article>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/40 hover:text-gold font-sans text-sm transition-colors duration-200"
            >
              <ArrowLeft size={15} />
              Volver al blog
            </Link>
            <ButtonLink href="/contacto" variant="primary" size="md">
              Solicitar cotización gratis
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
