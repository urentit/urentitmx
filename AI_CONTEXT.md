# Contexto del Proyecto: urentit.mx (Actualizado para IAs)

Este archivo está diseñado para dar contexto inmediato a cualquier Inteligencia Artificial (Claude, Cursor, Copilot, etc.) sobre el estado actual del proyecto `urentit.mx`.

## 📌 Estado Actual (En qué vamos)
**Fase Actual:** Sitio público completo + módulo de cotizador interno integrado.

**Sitio público** (Fases 1–7 completadas): Hero, Catálogo, Formularios, SEO, GTM/GA4, referidos, Open Graph.

**Cotizador** (integrado en mayo 2026): Herramienta interna migrada de `cotiza.urentit.mx` (Laravel/PHP) a `/cotizador` en este mismo repo. Ver `COTIZADOR.md` para documentación completa.

Pendiente:
- Auditorías Lighthouse (Performance >90, SEO >95).
- Historial de cotizaciones (requiere BD — Google Sheets o MySQL/AWS pendiente de aprobación).

## 🛠 Stack Tecnológico Principal
- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v3
- **Animaciones:** Framer Motion (solo sitio público — cotizador no usa animaciones)
- **Formularios:** React Hook Form + Zod
- **UI & Iconos:** Lucide React, Embla Carousel
- **Auth:** NextAuth v4 (Credentials provider, JWT, usuarios en env var `COTIZADOR_USERS`)
- **PDF:** @react-pdf/renderer (cotizador)
- **Mails:** Resend (API Route en `app/api/contact/route.ts`)

## 🏗 Arquitectura de Carpetas
- `/app`: Rutas del App Router.
  - Sitio público: `layout.tsx`, `page.tsx`, `/arrendamiento-puro`, `/aviso-de-privacidad`, `/referidos`.
  - Cotizador interno: `/cotizador/(protected)/` (rutas protegidas) + `/cotizador/login/`.
  - APIs: `/api/contact`, `/api/referrals`, `/api/cotizador/*`, `/api/auth/[...nextauth]`.
- `/components`:
  - `/layout`: Navbar, Footer, WhatsAppWidget.
  - `/sections`: Secciones del sitio público (Hero, CarsGallery, CotizadorPublico, etc.).
  - `/ui`: Componentes reutilizables (Button, Badge, Card).
  - `/cotizador`: Componentes del cotizador interno (QuoteForm, QuoteResult, Sidebar, etc.).
- `/lib/cotizador`: Motor financiero, tipos, calculadores, usersStore.
- `/public`: Assets estáticos (imágenes en `/img`).
- `/legacy`: Código antiguo que **no debe ser modificado ni usado en producción**.
- `/mocks`: Datos estáticos JSON para popular los componentes.

## 🎨 Guía de Estilos y Diseño
- **Colores primarios:** Negro (`#0a0a0a`) y Dorado (`#e1be4a`).
- **Comportamiento UI:** Diseños minimalistas con efecto Glassmorphism.
- Consultar `tailwind.config.ts` para acceder a la paleta oficial y sombras predefinidas (`boxShadow.gold`).

## 🤖 Instrucciones Obligatorias para IAs
1. **NO leer ni modificar archivos en `/legacy`** a menos que se solicite explícitamente rescatar algún recurso.
2. Al crear o modificar componentes interactivos, recordar usar la directiva `"use client"` de Next.js al inicio del archivo (ej. componentes con animaciones de Framer Motion o hooks de React).
3. Mantener Server Components siempre que sea posible para optimizar el SEO y Performance.
4. Seguir la convención de Git existente (rama `master`).
5. Antes de cualquier refactor mayor, consultar el archivo `PLAN.md` que funge como fuente de la verdad para decisiones arquitectónicas.
6. **Cotizador:** Los usuarios NO están en base de datos — se leen de `process.env.COTIZADOR_USERS` (JSON). No intentar conectar Prisma para autenticación. Ver `COTIZADOR.md` para toda la documentación del módulo.
7. **Red corporativa:** Los comandos `npm`, `vercel` y el build de Next.js requieren `NODE_TLS_REJECT_UNAUTHORIZED=0` o `--strict-ssl false` por el proxy SSL de la empresa.
