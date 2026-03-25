# Plan de Rediseño — urentit.mx

> **Identidad de marca:** Negro `#0a0a0a` + Dorado `#e1be4a` · Slogan: "¡Aspira a más!"
> **Repo:** GitHub (rama `master`) · Código anterior en `/legacy`

---

## Stack Tecnológico

| Área | Tecnología |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| Estilos | Tailwind CSS v3 |
| Animaciones | Framer Motion |
| Tipografía | Playfair Display + Inter (next/font) |
| Carrusel | Embla Carousel |
| Iconos | Lucide React |
| Formularios | React Hook Form + Zod |
| Analytics | GTM (GTM-T7CFMMR8) + GA4 + Web Vitals |
| SEO | Next.js Metadata API + JSON-LD |
| Imágenes | next/image |

---

## Paleta de Colores

```
Negro principal:  #0a0a0a
Negro secundario: #111111
Dorado principal: #e1be4a
Dorado claro:     #f0d878
Dorado oscuro:    #b8962e
Blanco:           #fafafa
Gris claro:       #f0f0f0
Gris texto:       #888888
```

---

## Estructura de Páginas

```
app/
├── layout.tsx                  # Layout raíz + metadata global + GTM
├── page.tsx                    # Homepage
├── arrendamiento-puro/
│   └── page.tsx                # Página de servicio detallada
├── aviso-de-privacidad/
│   └── page.tsx
├── api/
│   └── contact/route.ts        # Formulario de contacto
├── sitemap.ts                  # Sitemap dinámico
└── robots.ts                   # Robots.txt
```

---

## Secciones del Homepage

| # | Sección | Estado |
|---|---------|--------|
| 1 | Navbar (glassmorphism, menú móvil) | ⬜ pendiente |
| 2 | Hero (full screen, contadores animados) | ⬜ pendiente |
| 3 | Quiénes somos (50/50, métricas) | ⬜ pendiente |
| 4 | Propuesta de valor (9 cards) | ⬜ pendiente |
| 5 | Catálogo de vehículos (tabs + cards) | ⬜ pendiente |
| 6 | Marcas (infinite scroll automático) | ⬜ pendiente |
| 7 | Características (zig-zag) | ⬜ pendiente |
| 8 | Formulario de cotización (glassmorphism) | ⬜ pendiente |
| 9 | Testimonios (carrusel) | ⬜ pendiente |
| 10 | FAQs (acordeón + JSON-LD) | ⬜ pendiente |
| 11 | CTA Final | ⬜ pendiente |
| 12 | Footer (4 columnas) | ⬜ pendiente |

---

## Fases de Implementación

### ✅ FASE 1 — Setup y Base — COMPLETADA
> Objetivo: Proyecto funcional con stack nuevo, sin contenido.

- [x] Mover código legacy a `/legacy`
- [x] Crear `package.json` con dependencias nuevas
- [x] Crear `tsconfig.json`
- [x] Crear `next.config.mjs`
- [x] Crear `tailwind.config.ts` con paleta de marca
- [x] Crear `postcss.config.js`
- [x] Crear `.gitignore`
- [x] Copiar `/public/img/` y `/mocks/` desde legacy
- [x] Crear `app/globals.css` con variables CSS y directivas Tailwind
- [x] Crear `app/layout.tsx` con fuentes + metadata base + GTM
- [x] Crear `app/page.tsx` (placeholder)
- [x] `npm run build` sin errores ✓

---

### ✅ FASE 2 — Layout Base — COMPLETADA
> Objetivo: Navbar y Footer completamente rediseñados.

- [x] Crear `components/layout/Navbar.tsx`
  - [x] Logo + links de navegación
  - [x] Efecto glassmorphism al hacer scroll
  - [x] Menú hamburguesa animado con drawer (Framer Motion)
  - [x] CTA "Cotiza ahora" + "WhatsApp"
- [x] Crear `components/layout/Footer.tsx`
  - [x] 4 columnas: logo, nav, contacto, redes
  - [x] Borde dorado superior
  - [x] Links de redes sociales (Facebook, Instagram, LinkedIn, TikTok)
- [x] Crear `components/layout/WhatsAppWidget.tsx` flotante con tooltip
- [x] Crear `components/ui/Button.tsx` (variantes: primary, outline, ghost)
- [x] Crear `components/ui/Badge.tsx`
- [x] Integrar Navbar, Footer y WhatsApp en `app/layout.tsx`
- [x] `npm run build` sin errores ✓

---

### ✅ FASE 3 — Hero + Above the Fold — COMPLETADA
> Objetivo: Primera impresión impactante.

- [x] Crear `components/sections/Hero.tsx`
  - [x] Imagen de fondo fullscreen con overlay gradiente
  - [x] Título Playfair Display + subtítulo Inter
  - [x] Dos CTAs: "Cotiza ahora" (dorado) + "Ver vehículos" (outline)
  - [x] Contadores animados con Intersection Observer
  - [x] Línea de acento dorada lateral
  - [x] Scroll indicator animado (bounce)
  - [x] Evento GA4 `cta_hero_click`
- [x] Crear `components/sections/AboutUs.tsx`
  - [x] Layout 50/50 texto + imagen (invertido en móvil)
  - [x] Badge "Empresa Mexicana 🇲🇽"
  - [x] Tarjeta flotante con métrica destacada
  - [x] Líneas decorativas doradas en esquinas
  - [x] Animación reveal (Framer Motion)
- [x] Crear `components/sections/ValueProposition.tsx`
  - [x] Grid 3×3 de tarjetas de beneficios
  - [x] Iconos SVG del proyecto legacy con filtro dorado
  - [x] Hover: borde dorado + número decorativo
  - [x] Stagger animation en entrada
- [x] `npm run build` sin errores ✓

---

### ✅ FASE 4 — Catálogo y Marcas — COMPLETADA
> Objetivo: Showcase del producto principal.

- [x] Crear `components/sections/CarsGallery.tsx`
  - [x] 7 tabs de categoría con scroll horizontal en móvil
  - [x] Cards con next/image, hover overlay dorado + CTA
  - [x] Modal de detalle con cotización directa por modelo
  - [x] Evento GA4 `car_card_click`
  - [x] CTA "Solicitar modelo específico"
- [x] Crear `components/sections/Brands.tsx`
  - [x] Marquee CSS puro (sin JS) — 2 filas
  - [x] Fila 1 → izquierda, Fila 2 → derecha
  - [x] Grayscale → color en hover
  - [x] 36 marcas (Porsche, Ferrari, Tesla, Toyota…)
- [x] Crear `components/sections/Features.tsx`
  - [x] Secciones alternadas imagen + texto zig-zag
  - [x] 3 diferenciadores con bullets y badge
  - [x] Animación slide-in desde lados opuestos
  - [x] Grid decorativo de fondo
- [x] `npm run build` sin errores ✓

---

### ✅ FASE 5 — Conversión y Social Proof — COMPLETADA
> Objetivo: Formularios, testimonios y FAQs.

- [x] Crear `components/sections/ContactForm.tsx`
  - [x] Glassmorphism sobre imagen de fondo
  - [x] React Hook Form + Zod (validación en cliente y servidor)
  - [x] Estado loading (spinner) y éxito animados
  - [x] Alternativa WhatsApp con evento GA4
- [x] Crear `app/api/contact/route.ts`
  - [x] Validación Zod server-side
  - [x] Comentario guía para integrar Resend / Nodemailer
- [x] Crear `components/sections/Testimonials.tsx`
  - [x] Embla Carousel con autoplay (pausa en hover)
  - [x] Tarjetas con avatar, nombre, rol, estrellas, quote
  - [x] Flechas de navegación manual
  - [x] Rating summary global al pie
- [x] Crear `components/sections/FAQs.tsx`
  - [x] Acordeón animado con AnimatePresence
  - [x] 2 columnas en desktop, 1 en móvil
  - [x] JSON-LD FAQPage para SEO
  - [x] 11 preguntas frecuentes
- [x] Crear `components/sections/CTAFinal.tsx`
  - [x] Sección fullwidth con círculos decorativos
  - [x] 2 CTAs: Cotizador + WhatsApp
  - [x] Trust signals al pie
  - [x] Evento GA4 `cotizador_click`
- [x] `npm run build` sin errores ✓

---

### ✅ FASE 6 — SEO, Analytics y Optimización — COMPLETADA
> Objetivo: Máximo rendimiento y visibilidad.

- [x] Metadata API completa en `app/layout.tsx`
  - [x] title template, description, keywords
  - [x] Open Graph (og:image, og:title, og:description)
  - [x] Twitter Card
  - [x] Canonical URL
- [x] Crear `app/sitemap.ts` dinámico
- [x] Crear `app/robots.ts`
- [x] Agregar JSON-LD schemas:
  - [x] `Organization` — en layout.tsx
  - [x] `FAQPage` — en FAQs.tsx
  - [x] `Service` — en page.tsx y arrendamiento-puro/page.tsx
- [x] Configurar GTM (`GTM-T7CFMMR8`) en layout
- [x] Eventos GA4 custom:
  - [x] `form_submit` — ContactForm.tsx
  - [x] `whatsapp_click` — WhatsAppWidget.tsx
  - [x] `cta_hero_click` — Hero.tsx
  - [x] `car_card_click` — CarsGallery.tsx
  - [x] `cotizador_click` — CTAFinal.tsx
- [ ] Auditoría Lighthouse (meta: Performance >90, SEO >95) — pendiente manual
- [x] Crear og-image.jpg (1200×630) — generada con sharp (fondo hero + logo + tagline)

---

### ✅ FASE 7 — Páginas Secundarias — COMPLETADA
> Objetivo: Completar el sitio.

- [x] Crear `app/arrendamiento-puro/page.tsx`
- [x] Crear `app/aviso-de-privacidad/page.tsx`
- [x] WhatsApp widget flotante — `components/layout/WhatsAppWidget.tsx`
- [x] Crear `app/not-found.tsx` (página 404 personalizada)

---

## Componentes a Crear

```
components/
├── layout/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── sections/
│   ├── Hero.tsx
│   ├── AboutUs.tsx
│   ├── ValueProposition.tsx
│   ├── CarsGallery.tsx
│   ├── Brands.tsx
│   ├── Features.tsx
│   ├── ContactForm.tsx
│   ├── Testimonials.tsx
│   ├── FAQs.tsx
│   └── CTAFinal.tsx
└── ui/
    ├── Button.tsx
    ├── Badge.tsx
    ├── Card.tsx
    └── WhatsAppWidget.tsx
```

---

## Assets Reutilizados del Proyecto Anterior

| Asset | Ruta | Uso |
|-------|------|-----|
| Logo | `public/img/logos/logo-urentit.svg` | Navbar, Footer |
| Foto intro | `public/img/default/foto-intro.png` | About Us |
| Fondo hero | `public/img/backgrounds/foto-slider.jpg` | Hero |
| Fondo cotiza | `public/img/backgrounds/fondo-cotiza.jpg` | Formulario |
| Iconos SVG | `public/img/default/*.svg` | Value Proposition |
| Fotos autos | `public/img/cars/**/*` | Catálogo |
| Logos marcas | `public/img/brands/*` | Marcas |
| Fotos testimonios | `public/img/testimonials/*` | Testimonios |
| Datos | `mocks/*.json` | Todos los contenidos |

---

## Verificación Final

```bash
npm run dev       # sin errores
npm run build     # build limpio
```

- [ ] Lighthouse: Performance >90 / SEO >95 / Accessibility >90
- [ ] Mobile 375px (iPhone SE)
- [ ] Desktop 1440px
- [ ] Formulario de contacto funcional
- [ ] GTM Preview Mode con eventos
- [ ] JSON-LD válido (Google Rich Results Test)
- [ ] Sitemap accesible en /sitemap.xml
