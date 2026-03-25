/* NextJs */
import Head from 'next/head'
import { useRouter } from 'next/router'

/* Mocks */
import app from '../../../mocks/app'
import { useEffect } from 'react'

const url = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}`

/**
 * @function default
 * @param {string} title
 * @param {string} description
 * @param {string} keywords
 * @param {string} logoShare
 * @param {string} locale
 *
 * @json app.json
 */

export default ({
  title = `${app.name}`,
  description = `${app.description}`,
  keywords = `${app.keywords}`,
  logoShare = `${url}/img/ico/${app.logoShare}`,
  locale = `${app.locale}`,
  canonical,
}) => {
  const router = useRouter()

  useEffect(() => {
    const html = document.querySelector('html')

    if(html) html.setAttribute('lang', 'es')
  }, [])

  const font = `${app.font}`
  const currentTitle =
    title && router.pathname !== '/'
      ? `${title} :: ${app.name}`
      : `${app.name} :: ${app.slogan}`

  return (
    <Head>
      <title>{currentTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />

      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={app.name} />
      <meta property="og:image" content={logoShare} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:site" content={`@${app.name}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={logoShare} />

      {/* APPLE ICONS */}
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href={`${url}/img/ico/apple-icon-57x57.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href={`${url}/img/ico/apple-icon-60x60.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href={`${url}/img/ico/apple-icon-72x72.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${url}/img/ico/apple-icon-76x76.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href={`${url}/img/ico/apple-icon-114x114.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={`${url}/img/ico/apple-icon-120x120.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href={`${url}/img/ico/apple-icon-144x144.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={`${url}/img/ico/apple-icon-152x152.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${url}/img/ico/apple-icon-180x180.png`}
      />

      {/* ANDROID ICONS */}
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${url}/img/ico/favicon-16x16.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${url}/img/ico/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href={`${url}/img/ico/favicon-96x96.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={`${url}/img/ico/android-icon-192x192.png`}
      />
      <link rel="manifest" href={`${url}/img/ico/manifest.json`} />

      {/* MICROSOFT ICONS */}
      <meta name="msapplication-TileColor" content={app.mainColor} />
      <meta
        name="msapplication-TileImage"
        content={`${url}/img/ico/ms-icon-144x144.png`}
      />
      <meta name="theme-color" content={app.mainColor} />

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </Head>
  )
}
