# Cotizador de Arrendamiento — Documentación

Herramienta interna migrada de `cotiza.urentit.mx` (Laravel/PHP) al mismo repo de `urentit.mx` (Next.js 14), bajo la ruta protegida `/cotizador`.

---

## Acceso

| Entorno | URL |
|---|---|
| Pruebas (Vercel) | `https://urentitmx-two.vercel.app/cotizador/login` |
| Producción (futuro) | `https://urentit.mx/cotizador/login` |

La ruta `/cotizador` sin login redirige automáticamente a `/cotizador/login`.

---

## Credenciales iniciales

| Campo | Valor |
|---|---|
| Correo | `ti@urentit.mx` |
| Contraseña | `Urentit2024!` |

---

## Tipos de cotización disponibles

| Ruta | Tipo | Plazos |
|---|---|---|
| `/cotizador/auto` | Auto estándar | 36 / 48 meses |
| `/cotizador/vip` | Auto VIP | 36 / 48 meses |
| `/cotizador/carga` | Carga ligera | 36 / 48 meses |
| `/cotizador/carga-pesada` | Carga pesada | 36 / 48 meses |
| `/cotizador/electrico` | Eléctrico | 36 / 48 meses |
| `/cotizador/foraneo` | Foráneo | 36 / 48 meses |
| `/cotizador/usado` | Usado | 36 / 48 meses |
| `/cotizador/flotilla` | Flotilla | 24 / 36 / 48 meses |
| `/cotizador/refinanciamiento` | Refinanciamiento | 12 / 24 meses |

---

## Gestión de usuarios

Los usuarios NO están en base de datos. Se almacenan en la variable de entorno `COTIZADOR_USERS` como un arreglo JSON en Vercel.

### Estructura de un usuario

```json
{
  "id": "1",
  "name": "Nombre Apellido",
  "email": "usuario@urentit.mx",
  "password": "$2b$12$hash_bcrypt_aqui",
  "admin": true,
  "comision": 0.03,
  "manualServices": true
}
```

| Campo | Descripción |
|---|---|
| `id` | Identificador único (string, incremental) |
| `name` | Nombre que aparece en el header |
| `email` | Correo para login |
| `password` | Hash bcrypt (NO texto plano) |
| `admin` | `true` da acceso completo |
| `comision` | Porcentaje de comisión del asesor (ej. `0.03` = 3%) |
| `manualServices` | `true` permite ingresar servicios preventivos manualmente |

### Generar un hash de contraseña

```bash
node -e "require('bcryptjs').hash('TuContraseña', 12).then(console.log)"
```

### Agregar un usuario nuevo

1. Genera el hash con el comando de arriba.
2. Abre la consola de Vercel o usa la CLI:

```bash
# Con CLI (requiere NODE_TLS_REJECT_UNAUTHORIZED=0 en red corporativa)
NODE_TLS_REJECT_UNAUTHORIZED=0 vercel env rm COTIZADOR_USERS production --yes
NODE_TLS_REJECT_UNAUTHORIZED=0 vercel env add COTIZADOR_USERS production
# Pega el JSON completo del arreglo actualizado cuando lo pida
```

3. Haz un redeploy para que tome efecto:

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 vercel --prod
```

### Ejemplo con 2 usuarios

```json
[
  {
    "id": "1",
    "name": "Admin",
    "email": "ti@urentit.mx",
    "password": "$2b$12$IZ2fhKQN9OZs03d9ihKeUOMlST./QZDxeVAHF2B4oD1gkaLoEhv8W",
    "admin": true,
    "comision": 0.03,
    "manualServices": true
  },
  {
    "id": "2",
    "name": "Asesor Ventas",
    "email": "ventas@urentit.mx",
    "password": "$2b$12$HASH_GENERADO_AQUI",
    "admin": false,
    "comision": 0.04,
    "manualServices": false
  }
]
```

---

## Variables de entorno en Vercel

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NEXTAUTH_SECRET` | Clave secreta para firmar JWT | String aleatorio 32+ chars |
| `NEXTAUTH_URL` | URL base del entorno activo | `https://urentitmx-two.vercel.app` |
| `COTIZADOR_USERS` | Arreglo JSON de usuarios | Ver sección anterior |

Cuando se pase a producción, cambiar `NEXTAUTH_URL` a `https://urentit.mx`.

---

## Arquitectura del módulo

```
middleware.ts                        # Protege /cotizador/* excepto /login

app/cotizador/
├── login/page.tsx                   # Formulario de acceso (sin auth requerida)
├── page.tsx                         # Redirect a /cotizador/auto
└── (protected)/
    ├── layout.tsx                   # Verifica sesión + Sidebar + Header
    ├── auto/page.tsx
    ├── vip/page.tsx
    ├── carga/page.tsx
    ├── carga-pesada/page.tsx
    ├── electrico/page.tsx
    ├── foraneo/page.tsx
    ├── usado/page.tsx
    ├── flotilla/page.tsx
    ├── refinanciamiento/page.tsx
    └── historial/page.tsx           # Pendiente (requiere BD)

app/api/cotizador/
├── auto/route.ts                    # POST — calcula y devuelve cotización
├── vip/route.ts
├── carga/route.ts
├── carga-pesada/route.ts
├── electrico/route.ts
├── foraneo/route.ts
├── usado/route.ts
├── flotilla/route.ts
├── refinanciamiento/route.ts
├── pdf/route.ts                     # POST — genera PDF descargable
└── publico/route.ts                 # POST — sin auth, para homepage

lib/cotizador/
├── types.ts                         # Interfaces TypeScript
├── variables.ts                     # Constantes financieras
├── placas.ts                        # Precios de trámites por estado
├── engine.ts                        # PMT + helpers financieros
├── usersStore.ts                    # Lee usuarios de COTIZADOR_USERS
├── apiHelper.ts                     # getSessionUser, saveQuote, unauthorized
└── calculators/
    ├── auto.ts
    ├── vip.ts
    ├── carga.ts
    ├── cargaPesada.ts
    ├── electrico.ts
    ├── foraneo.ts
    ├── usado.ts
    ├── flotilla.ts
    └── refinanciamiento.ts

components/cotizador/
├── layout/
│   ├── Sidebar.tsx
│   └── InternalHeader.tsx
├── QuoteForm.tsx                    # Formulario genérico (todos los tipos)
├── QuoteResult.tsx                  # Tabla de resultados + PDF
├── PDFTemplate.tsx                  # Template React PDF
└── SessionProvider.tsx
```

---

## Motor financiero

El cálculo se basa en la fórmula PMT (Payment) portada del PHP original:

```
mensualidad = PMT(tasa_mensual, meses, -valor_presente)
```

Los archivos de referencia son:
- [lib/cotizador/engine.ts](lib/cotizador/engine.ts) — función `pmt()` y helpers
- [lib/cotizador/variables.ts](lib/cotizador/variables.ts) — tasas, IVA, GPS, VERI, etc.
- [lib/cotizador/placas.ts](lib/cotizador/placas.ts) — costos de trámites por estado (CDMX, EDOMEX, Morelos, etc.)

---

## Cotizador público (homepage)

Además del cotizador interno, hay un estimador simplificado en la homepage visible para todos:

- **Componente:** [components/sections/CotizadorPublico.tsx](components/sections/CotizadorPublico.tsx)
- **API:** `POST /api/cotizador/publico` (sin autenticación)
- Solo calcula cotizaciones tipo "auto"
- Muestra mensualidad a 36 y 48 meses
- CTA a WhatsApp con el resultado pre-cargado

---

## Historial de cotizaciones

Actualmente el historial está pendiente de implementación. La página `/cotizador/historial` muestra un placeholder.

**Plan futuro:**
1. Corto plazo: Google Sheets (cuando se autorice)
2. Largo plazo: MySQL en AWS EC2 (cuando se apruebe la cuenta AWS)

La función `saveQuote()` en [lib/cotizador/apiHelper.ts](lib/cotizador/apiHelper.ts) está preparada como no-op y se conectará cuando la BD esté disponible.

---

## Comandos útiles (red corporativa)

Todos los comandos que hacen peticiones HTTPS necesitan el prefijo `NODE_TLS_REJECT_UNAUTHORIZED=0` por el proxy SSL corporativo:

```bash
# Build local
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run build

# Deploy a Vercel
NODE_TLS_REJECT_UNAUTHORIZED=0 vercel --prod

# Ver variables de entorno
NODE_TLS_REJECT_UNAUTHORIZED=0 vercel env ls production

# Instalar dependencias
npm install --strict-ssl false
```

---

## Despliegue a producción (checklist)

Cuando se migre de entorno de pruebas a `urentit.mx`:

- [ ] Actualizar `NEXTAUTH_URL` en Vercel a `https://urentit.mx`
- [ ] Hacer redeploy: `NODE_TLS_REJECT_UNAUTHORIZED=0 vercel --prod`
- [ ] Verificar login en `https://urentit.mx/cotizador/login`
- [ ] Verificar que rutas públicas (/, /referidos) no se vean afectadas
