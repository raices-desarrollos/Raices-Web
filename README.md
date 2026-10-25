# Raíces Developers — Sitio web

Sitio institucional de Raíces Developers, en tema oscuro. La Home presenta la marca; Ceibo Vidal (Vidal 3849, Saavedra, CABA) tiene su propia página. El contacto es por formulario (email, cuando el worker está activo) y WhatsApp.

## Qué es Raíces

Raíces Developers es una desarrolladora inmobiliaria de Buenos Aires. Cada proyecto toma el nombre de un árbol autóctono y busca dejar algo vivo en su entorno. La idea rectora: **naturaleza urbana con criterio**. El verde no aparece como decoración; entra en la decisión de fachada, balcones, terraza, riego y mantenimiento.

La identidad visual y verbal está documentada en `DESIGN_SYSTEM.md` (versión vigente, copiada desde el Brain de la empresa).

## Stack

- **Next.js 16** (App Router, `output: 'export'`) — sitio 100 % estático, sin servidor.
- **React 19**, componentes funcionales en JSX, sin librería de UI.
- **CSS puro** en `app/globals.css`, con tokens semánticos (`--bg`, `--surface`, `--text`, `--muted`, `--accent`, `--line`…).
- **Tipografía**: M PLUS U (display, servida local desde `app/fonts/` con `next/font/local`) y Montserrat (`next/font/google`). No hay `<link>` a Google Fonts en runtime.
- **Imágenes**: WebP optimizadas con `sharp` (única dependencia de desarrollo extra).

## Cómo correr

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # export estático en out/
```

Para probar el export con el `basePath` de producción:

```bash
NEXT_PUBLIC_BASE_PATH=/Raices-Web npm run build
# servir out/ bajo /Raices-Web, por ejemplo:
mkdir -p /tmp/serve && ln -sfn "$PWD/out" /tmp/serve/Raices-Web && (cd /tmp/serve && python3 -m http.server 8787)
# → http://localhost:8787/Raices-Web/
```

## Variables de entorno

Copiar `.env.example` a `.env.local` y ajustar. Todas son `NEXT_PUBLIC_*` porque se resuelven en build.

| Variable | Uso | Valor por defecto |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | Prefijo de ruta cuando el sitio no vive en la raíz del dominio. Es la **única fuente** del `basePath` (la usan `next.config.mjs`, las rutas de imágenes y la metadata). | vacío (raíz) |
| `NEXT_PUBLIC_SITE_URL` | Origen público, sin basePath. Se usa para canonical, Open Graph y `sitemap.xml`. | `https://raices-desarrollos.github.io` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp en formato internacional sin `+` ni espacios. | `5491136994200` |
| `NEXT_PUBLIC_FORM_ENDPOINT` | URL pública del worker de email (`functions/contact-worker.js`). | vacío |
| `NEXT_PUBLIC_HERO_VIDEO` | Ruta del video del hero institucional, si existe. | vacío |

`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` y `RESEND_API_KEY` **no** van al frontend: se configuran como secrets del worker.

### Formulario de contacto

El sitio se exporta estático. El formulario **no finge un envío**:

- **Con `NEXT_PUBLIC_FORM_ENDPOINT`**: POST JSON al worker, que envía el email con Resend. Éxito solo si el servidor responde OK.
- **Sin endpoint**: el formulario lo dice y WhatsApp sigue disponible.

Pasos para activar el email: `functions/README.md`. `CONTACT_TO_EMAIL` está pendiente de confirmar antes de producción.

Los eventos (clic en WhatsApp, envío del formulario) pasan por `app/lib/analytics.js`. Hoy no envía nada.

## Contenido

Todos los datos (marca, contacto, redes, proyecto, tipologías, ubicación, socios) viven en `app/content/site.js`. Si falta un dato, se deja un `TODO:` ahí; no se inventa.

Pendientes marcados con `TODO:` en ese archivo:

- URL de LinkedIn de Raíces Developers.
- URL de Instagram de Raíces Developers.

Mientras estén vacías, los botones de redes no se renderizan.

## Imágenes

Los originales pesados se reemplazan por WebP con:

```bash
npm run optimize-images          # convierte y borra los originales
npm run optimize-images -- --keep  # conserva los originales
```

Reglas (`scripts/optimize-images.mjs`):

- `public/assets/images/`: WebP, máx. 2400 px de ancho para la fachada (hero) y 1600 px para el resto. Nunca agranda.
- `public/assets/plans/`: WebP sin pérdida, a resolución original (nitidez de líneas y cotas).
- `public/assets/brand/` y `public/assets/partners/`: logos, no se tocan.
- Genera `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` y `og-image.png` en `public/assets/brand/` a partir de los logos oficiales.

Los logos de Raíces son PNG de trazo negro sobre transparente. Sobre fondo oscuro se usan con `filter: brightness(0) invert(1)` (clase `.logo-on-dark`), sin recolorear el archivo.

## Estructura

```
app/
  page.jsx              — Home institucional
  proyectos/            — Portfolio y /proyectos/[slug]
  nosotros/             — Presentación de Raíces
  contacto/             — Formulario y canales
  cinematic.css         — Intro, hero, galería, transiciones
  globals.css           — Tokens y sistema de diseño
  content/site.js       — Única fuente de datos (incluye `projects` para futuros desarrollos)
  components/           — Header, Footer, LogoIntro, CinematicHero, FeaturedProject,
                          ProjectGallery, ContactForm, WhatsAppButton, secciones de Ceibo

public/assets/
  brand/ images/ plans/ partners/ video/

functions/
  contact-worker.js     — Envío real de email con Resend (desplegar aparte)
```

## Deploy

Un push a `master` dispara `.github/workflows/deploy.yml`, que hace el build con `NEXT_PUBLIC_BASE_PATH=/Raices-Web` y publica `out/` en GitHub Pages: <https://raices-desarrollos.github.io/Raices-Web/>.

Para un dominio propio: dejar `NEXT_PUBLIC_BASE_PATH` vacío, definir `NEXT_PUBLIC_SITE_URL` con el dominio y configurar el dominio en GitHub Pages. El sitio funciona desde la raíz sin cambios de código.

## Ceibo Vidal

| Tipología | Cubierto | Balcón | Total |
| --- | --- | --- | --- |
| Monoambiente (Depto. B) | 35,79 m² | 3,27 m² | 39,06 m² |
| 2 ambientes (Depto. C) | 48,39 m² | 7,79 m² | 56,18 m² |
| 3 ambientes (Depto. A) | 68,67 m² | 11,08 m² | 79,75 m² |

PB + 4 pisos + terraza propia. 12 unidades de 1, 2 y 3 ambientes, todas con balcón. Entrega prevista para 2029. Espacios comunes: SUM in-out, cowork y cocheras en planta baja; terraza común con jacuzzi; terrazas privadas, bauleras y bicicletero. Desarrollado en conjunto con G&D Developers y Daimar Developers.

## Contacto

- WhatsApp: +54 9 11 3699-4200
- Email: contacto@raicesdesarrolladores.com.ar
