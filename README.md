# Cotizador U Rent It

Cotizador interno de arrendamiento vehicular. Proyecto **independiente** del sitio público `urentit.mx`
(rama `cotizador-standalone`), pensado para desplegarse por separado en Vercel e integrarse a la nueva
página web de U Rent It.

- Documentación funcional y técnica: [COTIZADOR.md](COTIZADOR.md)
- Fórmulas de cálculo: [docs/cotizador-calculos.md](docs/cotizador-calculos.md)

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS v3 · NextAuth v4 (Auth0/Google + contraseña) ·
Prisma 5 + MySQL (EC2) · @react-pdf/renderer · Zod.

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Redirige a `/cotizador` |
| `/cotizador/login` | Login (Google vía Auth0 o correo/contraseña) |
| `/cotizador/*` | Secciones del cotizador (protegidas por `middleware.ts`) |
| `/cotizador/historial` | Historial de cotizaciones |
| `/cotizador/usuarios`, `/cotizador/tasas` | Administración (solo admins) |
| `/api/auth/*` | NextAuth |
| `/api/cotizador/*` | APIs de cálculo, PDF, historial, usuarios y tasas |

Se conserva el prefijo `/cotizador` en todas las rutas para no tocar enlaces, redirecciones ni
callbacks de Auth0. Si más adelante se quiere servir en la raíz del dominio, es un cambio aparte.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # llenar valores
npx prisma generate
npm run dev                  # http://localhost:3000 → /cotizador/login
```

La base de datos es la misma MySQL (EC2) que usa producción; `DATABASE_URL` va en `.env` o `.env.local`.
Sin `DATABASE_URL` el cotizador opera en modo fallback con `COTIZADOR_USERS` y no guarda historial.

## Variables de entorno

Ver [.env.example](.env.example). Son las mismas que ya existen en el proyecto `urentitmx` de Vercel:

`NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, `AUTH0_ISSUER`,
`DATABASE_URL`, `COTIZADOR_USERS` (legacy).

`NEXTAUTH_URL` debe ser el dominio donde vive **este** proyecto (sin slash final).

## Despliegue en Vercel (proyecto nuevo)

1. **Vercel → Add New Project** → importar el repo `urentit/urentitmx`.
2. En *Settings → Git*, poner `cotizador-standalone` como **Production Branch**
   (o, si se prefiere, crear un fork/repo nuevo solo con esta rama y usar `main`).
3. Framework: Next.js (detectado). Build command por defecto (`npm run build` ya ejecuta `prisma generate`).
4. Agregar las variables de entorno de arriba (Production y Preview).
5. Deploy. La URL temporal será algo como `https://urentit-cotizador.vercel.app`.

### Auth0

En la aplicación de Auth0 (Regular Web Application) agregar:

- **Allowed Callback URLs:** `https://<dominio-del-cotizador>/api/auth/callback/auth0`
- **Allowed Logout URLs:** `https://<dominio-del-cotizador>/cotizador/login`
- **Allowed Web Origins:** `https://<dominio-del-cotizador>`

Incluir también la URL `*.vercel.app` del proyecto si se va a probar antes de apuntar el dominio.

### Dominio (Cloudflare → Vercel)

1. Vercel → *Settings → Domains* → agregar p. ej. `cotiza.urentit.mx`.
2. Cloudflare → DNS → registro `CNAME cotiza → cname.vercel-dns.com`, **Proxy status: DNS only** (nube gris)
   al menos hasta que Vercel emita el certificado SSL.
3. Actualizar `NEXTAUTH_URL` en Vercel al dominio final y hacer redeploy.

## Integración con la nueva página

La nueva página solo necesita enlazar a `https://<dominio-del-cotizador>/cotizador/login`
(por ejemplo desde un botón "Acceso colaboradores"). No comparte código ni base de datos con el sitio.
