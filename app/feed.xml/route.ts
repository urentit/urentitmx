import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://urentit.mx'

// Escapa los caracteres que romperían el XML
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export const dynamic = 'force-static'

export function GET() {
  const posts = getAllPosts()
  const updated = posts[0]?.date ? new Date(posts[0].date) : new Date()

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`
      const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString()
      return `    <item>
      <title>${esc(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      ${post.category ? `<category>${esc(post.category)}</category>` : ''}
      <description>${esc(post.description)}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog U Rent It</title>
    <link>${BASE_URL}/blog</link>
    <description>Artículos sobre arrendamiento puro de vehículos para empresas en México.</description>
    <language>es-MX</language>
    <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
