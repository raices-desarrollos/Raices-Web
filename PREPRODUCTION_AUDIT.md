# Auditoría preproducción — Raíces Web

Fecha: 29/10/2026. Solo análisis. No se modificó código, no se instalaron dependencias y no hubo deploy.

Producción confirmada: **https://www.raices.dev/** en **Vercel**, con el repo en GitHub. GitHub Pages no es el hosting de producción. El workflow `.github/workflows/deploy.yml` puede quedar como espejo, no como el sitio oficial.

---

## 1. Problemas críticos

### C1. El build de producción de Vercel no puede heredar `NEXT_PUBLIC_BASE_PATH=/Raices-Web`

Ese prefijo existe solo porque GitHub Pages publica el repo en `https://raices-desarrollos.github.io/Raices-Web/`. Lo fija `.github/workflows/deploy.yml` en el build de Pages. `next.config.mjs` lo copia a `basePath` y `assetPrefix` cuando la variable no está vacía. `app/content/shared.ts` arma `BASE` y `SITE_URL = origen + BASE`.

Si Vercel producción compilara con `/Raices-Web`:

- Las rutas reales serían `/Raices-Web/`, `/Raices-Web/proyectos/`, etc. `https://www.raices.dev/` y `/proyectos` responderían 404.
- Imágenes, fuentes, favicon y logos saldrían con ese prefijo.
- Canonical, Open Graph, sitemap y robots apuntarían a `https://www.raices.dev/Raices-Web/…` (o, peor, al default de GitHub Pages si tampoco se define el origen).

El default de `NEXT_PUBLIC_SITE_URL`, si nadie lo define, es `https://raices-desarrollos.github.io` (`app/content/shared.ts`). Un deploy a Vercel sin esa variable dejaría los canonical en GitHub Pages aunque el sitio se vea en `www.raices.dev`.

**Solución.** En Vercel, entorno Production (y Preview, si el preview es un dominio propio o `*.vercel.app` en la raíz):

- `NEXT_PUBLIC_BASE_PATH` vacío o sin definir.
- `NEXT_PUBLIC_SITE_URL=https://www.raices.dev` solo en Production.

No borrar el soporte de `basePath` del código: el workflow de GitHub Pages lo sigue necesitando. No copiar las env de Pages al proyecto de Vercel.

**Archivos.** Ninguno obligatorio si las env de Vercel quedan bien. Documentar en `README.md` que Pages y Vercel no comparten env. Opcional: un comentario en `deploy.yml` que diga que ese `BASE_PATH` no aplica a `www.raices.dev`.

**Riesgo.** Un preview de Vercel con `SITE_URL` de producción genera canonicals al dominio final. Definir `NEXT_PUBLIC_SITE_URL` solo en Production, o usar la URL de preview que Vercel inyecta.

### C2. LCP mobile de la Home ~5 s en laboratorio

Medición de F5 (Chromium, 390×844, DPR 2, CPU ×4, ~1,6 Mbps, 150 ms de latencia, intro salteada, mediana de 3 corridas). No es dato de usuarios reales.

| Dato | Valor |
| --- | --- |
| Elemento LCP | `<img class="cine-hero-image">` |
| Archivo | `public/assets/images/balcones-tensores.webp` |
| Transferido | 285 KB (291 668 bytes en disco; ya es el archivo, sin recomprimir en el servidor) |
| Resolución descargada | 1536×1024, siempre. No hay `srcset` |
| Formato | WebP lossy VP8 |
| `loading` / `fetchPriority` | `eager` + `high` (`Picture` con `priority` en `CinematicHero.jsx`) |
| Preload | `<link rel="preload" as="image" fetchPriority="high">` que Next emite por ese `img`. Empieza con el HTML |
| Inicio de la solicitud | ~0,17 s después del documento (cascada de laboratorio) |
| Fin de descarga | ~4,99 s. El LCP se registra en ~5,0 s: casi no hay demora de render después de los bytes |
| `next/image` | No se usa. `images.unoptimized: true` y `output: 'export'` impiden el optimizador de Vercel. El aviso de ESLint está apagado a propósito |

En un teléfono de 390 px CSS y DPR 2 alcanzan ~780 px de ancho. Se bajan 1536 px. El preload está bien puesto; el peso y la contención con fuentes, logo y JS alargan la descarga. La intro no explica esos 5 s: la corrida la salteó. En la primera visita real la cortina tapa el hero hasta ~1350 ms (`data-intro=done`) y el logo de la intro también va en preload `high` (`app/layout.jsx`, ~20 KB). Eso compite poco en bytes y sí tapa la foto un segundo y medio. No es el cuello.

**Solución propuesta, sin cambiar el encuadre.** Generar una variante mobile con el script que ya existe (`scripts/optimize-images.mjs`, sharp ya está). Objetivo: WebP ~828 px de ancho, calidad visual equivalente, **80–110 KB**. En el hero:

- `srcset` con la variante y el 1536.
- `sizes="100vw"`.
- Preload con `imagesrcset` / `media` para que el móvil no pida el archivo grande.

A ~1,6 Mbps, 100 KB son ~0,5 s de transferencia más RTT y contención. Con el preload correcto, el LCP mobile puede acercarse a 2,5 s. Desktop sigue con el 1536. No sustituir el máster ni bajarle calidad a ciegas: 285 KB para 1536×1024 ya está comprimido.

No activar `next/image` mientras siga `output: 'export'`. El componente no redimensiona si `unoptimized` está en true.

**Archivos.** `scripts/optimize-images.mjs`, `public/assets/images/` (archivo nuevo, no reemplazar el actual), `app/content/home.ts` o `Picture` / `CinematicHero.jsx` para `srcset`. Medir de nuevo la cascada mobile antes de dar por cerrado el 2,5 s.

**Riesgo.** Un `srcset` mal armado con `basePath` rompe el mirror de GitHub Pages. Las URLs tienen que salir de `asset()`.

---

## 2. Problemas importantes

### I1. Canonical, sitemap y robots salen del build, no del dominio en runtime

`metadataBase` es `SITE_URL`. `sitemap.js` y `robots.js` concatenan `SITE_URL` + ruta con barra final. Con Production bien configurado quedarían:

- `https://www.raices.dev/`
- `https://www.raices.dev/proyectos/`
- `https://www.raices.dev/proyectos/ceibo-vidal/`
- `https://www.raices.dev/nosotros/`
- `https://www.raices.dev/contacto/`
- Sitemap: `https://www.raices.dev/sitemap.xml`

`trailingSlash: true` exige la barra final. Un canonical sin barra no coincide con la ruta servida.

El build local sin env apunta a `https://raices-desarrollos.github.io/…` sin `/Raices-Web`. El build de Pages, con el prefijo, sí incluye `/Raices-Web`. Los dos son correctos para su host. Vercel producción tiene que ser un tercer build, raíz + `www.raices.dev`.

**Archivos.** Ninguno si las env están bien. Verificar el HTML desplegado, no el `out/` local.

### I2. El formulario no envía mail

`NEXT_PUBLIC_FORM_ENDPOINT` vacío. `ContactForm.jsx` no simula éxito: estado `unconfigured` y WhatsApp sigue activo.

El worker es `functions/contact-worker.js` (Cloudflare Workers + Resend), no una función de Vercel. Con `output: 'export'` no hay `app/api`.

Falta, sin inventar secretos:

| Dónde | Variable |
| --- | --- |
| Worker (secret) | `RESEND_API_KEY` |
| Worker | `CONTACT_TO_EMAIL` (un solo destinatario, todavía sin confirmar) |
| Worker | `CONTACT_FROM_EMAIL` (remitente verificado en Resend) |
| Worker | `ALLOWED_ORIGIN=https://www.raices.dev` |
| Vercel Production | `NEXT_PUBLIC_FORM_ENDPOINT` = URL pública del worker |

Validación en el cliente: nombre, email, mensaje, consentimiento. El servidor repite nombre, email y mensaje. El motivo solo entra al asunto `Consulta Raíces · {asunto}`.

Spam: honeypot `website` (responde 200 y no envía) y `elapsedMs` &lt; 3000 ms (igual). No hay tope de envíos ni captcha. El 200 falso del honeypot es intencional.

Errores: 422 validación, 403 origen, 503 sin secrets, 502 si Resend falla. El cliente solo distingue ok / error genérico. `reply_to` es el email de quien escribe. No hay elección de destinatario por motivo.

**Solución.** Desplegar el worker, verificar el dominio en Resend, confirmar el buzón, cargar el endpoint en Vercel Production y rebuild. No hace falta pasar el formulario a una ruta de Next si se mantiene el export estático.

**Archivos.** Secrets del worker y env de Vercel. Texto de `functions/README.md` todavía dice GitHub Pages como origen: actualizar `ALLOWED_ORIGIN` a `https://www.raices.dev` cuando se documente, sin desplegar ahora.

**Riesgo.** `NEXT_PUBLIC_*` queda en el JS público. La API key de Resend no debe ir ahí. Un endpoint abierto sin límite puede recibir spam aunque el honeypot filtre bots simples.

### I3. Superficies publicadas distintas de la referencia comercial

`docs/CONTENT_REVIEW.md` las conserva. No se tocaron en el código.

| Tipología | Publicado hoy | Ficha redondeada (referencia elegida) | Nota de planos |
| --- | --- | --- | --- |
| 3 ambientes, A | 79,75 m² | 82 m² | 82,37 m² |
| Monoambiente, B | 39,06 m² | 37 m² | 36,92 m² |
| 2 ambientes, C | 56,18 m² | 54 m² | 54,26 m² |

La decisión del 28/10/2026 deja 82 / 37 / 54 como referencia de diseño y prohíbe cambiar `typologies.units[].areas` hasta una aprobación explícita. Sigue pendiente.

### I4. Export estático y Vercel

Hoy el proyecto está preparado para **los dos hosts**, con builds distintos:

- Pages: `output: 'export'`, `NEXT_PUBLIC_BASE_PATH=/Raices-Web`, origen GitHub.
- Vercel en la raíz: el mismo export, `BASE_PATH` vacío, `SITE_URL=https://www.raices.dev`.

No hay `vercel.json`. Vercel detecta Next y puede o bien correr `next build` (y publicar el export) o intentar un servidor Node. Con `output: 'export'` el resultado es estático. No hay middleware, ni rutas de API, ni optimización de imágenes de Vercel.

Limitaciones que ya acepta el sitio: formulario externo, sin ISR, imágenes servidas tal cual están en `public/`.

No sacar `output: 'export'` en el primer deploy a Vercel. Pages y el `out/` local dependen de eso. Si más adelante se quiere el optimizador de imágenes de Vercel, es un cambio de arquitectura aparte, no un requisito para abrir `www.raices.dev`.

---

## 3. Optimizaciones opcionales

- Variante mobile del hero (C2) es la que más acerca el LCP a 2,5 s. El resto es menor.
- El logo completo se preload dos veces en el HTML de la Home (layout + descubrimiento de Next). Un solo preload alcanza.
- Suite en `tests/` (abajo). No versionar `docs/qa/` (~79 MB de capturas y videos).
- Tope de envíos en el worker cuando haya tráfico real.
- Redirigir `raices.dev` → `https://www.raices.dev` en el dominio de Vercel.

---

## 4. Playwright

No mover `docs/qa/` ni `tmp-qa/` al repo. Conviene una suite chica en `tests/` con `@playwright/test` (ya es devDependency), contra `out/` servido en local, Chromium y WebKit, 1440 y 390:

1. Home: un solo `h1`, texto del H1, sin «echar raíces», sin overflow.
2. Home: logo Ceibo sin el texto «Ceibo Vidal» dentro de `.project-mark`.
3. Ceibo: galería avanza con el botón Siguiente; tipologías muestran 79,75 / 39,06 / 56,18 hasta que se apruebe el cambio.
4. Contacto: sin endpoint, el submit no dice que el mensaje se envió.
5. 404 del export: título «Esta página no existe.» (el servidor de prueba tiene que devolver `404.html`).
6. `prefers-reduced-motion`: la Home no pide un chunk que contenga `SplitText` antes del scroll, o las animaciones infinitas son 0.

Eso cubre marca, regresión comercial, formulario y overflow. No grabar video en CI.

---

## 5. Orden recomendado

1. Proyecto Vercel: Production con `NEXT_PUBLIC_SITE_URL=https://www.raices.dev` y sin `BASE_PATH`. Preview sin el prefijo de Pages. Dominio `www` y redirección del ápice. **No promover a producción** hasta revisar el HTML.
2. Build de prueba (local o preview) y leer canonical, `og:url`, una imagen y `sitemap.xml`.
3. Recién después, variante mobile del hero y nueva medición LCP.
4. Worker de Resend y endpoint, con buzón confirmado.
5. Superficies solo con un sí explícito.
6. Suite corta en `tests/` cuando el deploy de prueba esté estable.

---

## 6. Lista para Sonnet

Hacer en este orden. No hacer deploy a producción. No cambiar logos, textos institucionales ni superficies.

1. **Vercel, solo configuración y una nota en el README.** Dejar escrito: Production `NEXT_PUBLIC_SITE_URL=https://www.raices.dev`, `NEXT_PUBLIC_BASE_PATH` vacío; el workflow de Pages conserva `/Raices-Web`. No crear env de Production con el prefijo. No borrar `output: 'export'`.
2. **Build de verificación** con esas env (sin publicar) y comprobar rutas `/`, `/proyectos/`, `/nosotros/`, `/contacto/`, `/proyectos/ceibo-vidal/`, canonical, sitemap y que un asset no empiece por `/Raices-Web`.
3. **LCP.** Añadir WebP mobile del hero (~828 px, 80–110 KB), `srcset` y preload condicional. No reemplazar `balcones-tensores.webp`. Volver a medir 390 px en red lenta. Meta: LCP hacia 2,5 s sin cambiar el encuadre.
4. **Formulario.** No desplegar Resend salvo pedido. Dejar en el README el checklist: dominio verificado, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `RESEND_API_KEY`, `ALLOWED_ORIGIN=https://www.raices.dev`, y `NEXT_PUBLIC_FORM_ENDPOINT` solo en Production.
5. **Tests.** Crear `tests/` con los 6 casos de la sección 4. No copiar capturas.
6. **Parar** y mostrar URLs canónicas del build de prueba, el peso de la variante mobile y el LCP medido.
