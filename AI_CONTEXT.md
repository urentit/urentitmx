# Contexto del Proyecto: urentit.mx (Actualizado para IAs)

Este archivo está diseñado para dar contexto inmediato a cualquier Inteligencia Artificial (Claude, Cursor, Copilot, etc.) sobre el estado actual del proyecto `urentit.mx`.

## 📌 Estado Actual (En qué vamos)
**Fase Actual:** Finalizando el rediseño. Las Fases 1 a 7 descritas en `PLAN.md` ya están marcadas como **COMPLETADAS**. 
El código base, el enrutamiento, y el diseño general (Hero, Catálogo, Formularios, Componentes, SEO base) ya están implementados.
Lo que queda pendiente son tareas de **Verificación Final y QA**:
- Ejecutar y superar auditorías de Lighthouse (Performance >90, SEO >95).
- Pruebas manuales de UI en resoluciones móviles (375px) y Desktop (1440px).
- Validar integración de GTM (Google Tag Manager) y eventos de GA4.
- Validar el esquema JSON-LD.

## 🛠 Stack Tecnológico Principal
- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v3
- **Animaciones:** Framer Motion
- **Formularios:** React Hook Form + Zod
- **UI & Iconos:** Lucide React, Embla Carousel
- **Mails:** Lista para integrar Resend (API Route en `app/api/contact/route.ts`)

## 🏗 Arquitectura de Carpetas
- `/app`: Rutas del App Router (`layout.tsx`, `page.tsx`, `/arrendamiento-puro`, `/aviso-de-privacidad`).
- `/components`: 
  - `/layout`: Navbar, Footer, WhatsAppWidget.
  - `/sections`: Secciones principales (Hero, CarsGallery, ContactForm, etc.).
  - `/ui`: Componentes reutilizables (Button, Badge, Card).
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
