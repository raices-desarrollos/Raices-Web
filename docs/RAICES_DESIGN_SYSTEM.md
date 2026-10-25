# Raíces Developers · Design System web

Fuente de verdad de la interfaz implementada en este repositorio.
Los valores de color, tipo y motion coinciden con `app/globals.css`, `app/cinematic.css` y `app/layout.jsx`.
La paleta de marca de carpeta de venta sigue documentada en `DESIGN_SYSTEM.md`. Este archivo describe solo lo que la web usa.

---

## A. Identidad de marca

**Nombre:** Raíces Developers. Nombre corto: Raíces.
**Posicionamiento:** desarrolladora inmobiliaria boutique en Buenos Aires. El sitio presenta a la empresa. Ceibo Vidal es el primer desarrollo, no la marca del dominio.

**Personalidad visual:** dark architectural luxury. Editorial, cinematográfica y sobria. Arquitectura contemporánea, atención al detalle, confianza sin lenguaje de inmobiliaria genérica.

**Conceptos:** naturaleza urbana con criterio; edificios con nombre de árbol autóctono; verde pensado desde el proyecto; identidad propia.

**Principios**

- La imagen arquitectónica manda. El texto la enmarca, no la compite.
- Espacio negativo amplio, grillas asimétricas, divisores de 0.75 px.
- Un acento (arena) y un verde profundo. Sin neón, sin gradientes decorativos, sin glass.
- Los logos oficiales no se redibujan. Sobre fondo oscuro se invierten con CSS.
- No se inventan proyectos, años, cifras ni historia. Los datos viven en `app/content/site.js`.

**Rutas**

| Ruta | Rol |
| --- | --- |
| `/` | Home institucional |
| `/proyectos` | Portfolio. Hoy solo Ceibo Vidal |
| `/proyectos/ceibo-vidal` | Ficha del proyecto |
| `/nosotros` | Empresa y filosofía |
| `/contacto` | Formulario y canales |

---

## B. Paleta de colores

### Marca (definida en `:root`, heredada de la carpeta de venta)

| Token | Hex | Uso en la web |
| --- | --- | --- |
| `--tinta` | `#21201E` | Reservado. El fondo real de la web es `--bg`, más profundo. |
| `--blanco` | `#F8F7F4` | Reservado. El texto claro es `--text`. |
| `--lino` | `#F0EDE6` | `--surface-light`. No hay páginas en tema claro. |
| `--arena` | `#C4A97D` | `--accent`. Kickers, cotas, trazo de 2 px bajo títulos. |
| `--liquen` | `#7E8E5F` | `--accent-green`. Definido, sin regla CSS que lo aplique. |
| `--musgo` | `#536245` | `--green-deep`. Hover del botón ghost. |
| `--ceibo` | `#B85C42` | Definido. No se usa como acento de interfaz. |
| `--niebla` | `#6E6F68` | No se usa directo. El metadato es `--muted`. |

### Superficies y texto (los que pinta la interfaz)

| Token | Hex | Uso |
| --- | --- | --- |
| `--bg` | `#0A0D0B` | Fondo de página, header sólido, intro, persianas. `theme-color`. |
| `--bg-alt` | `#101812` | Bandas alternas (CTA, bloques interiores). |
| `--surface` | `#161A17` | Plano detrás de imágenes antes de cargar. |
| `--surface-2` | `#19382C` | Verde bosque. Velos del page header (28 %) y del CTA (55 %) vía `color-mix`. |
| `--text` | `#EAE8DF` | Marfil. Titulares, cuerpo principal, botón fill invertido. |
| `--text-soft` | `rgba(234, 232, 223, 0.78)` | Párrafos secundarios y leads. |
| `--muted` | `#A8A69C` | Labels, metadatos, captions. |
| `--bronze` | `#A58E68` | Definido. No tiene regla propia: el acento aplicado es `--arena`. |
| `--line` | `rgba(234, 232, 223, 0.14)` | Divisores. |
| `--line-strong` | `rgba(234, 232, 223, 0.32)` | Énfasis de línea. |
| `--line-on-light` | `rgba(133, 96, 64, 0.22)` | Reservado para superficies claras. |
| `--wa` | `#25D366` | Solo el botón flotante de WhatsApp. |

`--radius: 8px` existe como token histórico. Los botones usan `--radius-button: 2px`. No redondear tarjetas.

### Contraste (calculado sobre los hex de arriba)

| Par | Ratio | Dónde |
| --- | --- | --- |
| `#EAE8DF` sobre `#0A0D0B` | 15.91 | Texto principal. AAA. |
| `#A8A69C` sobre `#0A0D0B` | 8.00 | Labels. AAA. |
| `#C4A97D` sobre `#0A0D0B` | 8.67 | Kickers y cotas. AAA. |
| `#EAE8DF` sobre `#19382C` | 10.41 | Texto sobre el verde bosque. AAA. |
| `#EAE8DF` sobre `#536245` | 5.34 | Texto del botón ghost en hover. AA. |
| `#0A0D0B` sobre `#EAE8DF` | 15.91 | Botón fill. AAA. |
| `#0A0D0B` sobre `#C4A97D` | 8.67 | Hover del botón fill. AAA. |
| `#D1C7BA` sobre `#101210` | 11.28 | Isotipo del favicon. Caliza sobre Carbón. AAA. |

### Combinaciones permitidas

- Marfil sobre negro profundo, carbón o verde bosque.
- Arena solo para textos cortos (kicker, cota, label de acento), nunca para párrafos.
- Musgo como relleno de hover de botón, con texto marfil.
- Caliza `#D1C7BA` sobre Carbón `#101210`, únicamente en el favicon.
- Verde WhatsApp solo en el botón flotante.

No poner liquen, ceibo o bronce como fondos nuevos sin revisar este archivo y el contraste.

---

## C. Tipografía

El logo está compuesto en Montserrat y no se reemplaza. Los titulares de la interfaz usan Fraunces. La carpeta de venta sigue en M PLUS U; ese archivo local ya no se carga en la web.

| Rol | Familia | Carga | Pesos |
| --- | --- | --- | --- |
| Display | Fraunces | `next/font/google`, variable `--font-fraunces` | 300, 400, 500, romana e itálica |
| UI y lectura | Montserrat | `next/font/google`, variable `--font-montserrat` | 400, 500, 600 |

`font-display: swap`. Fallback: Helvetica Neue, Arial, sans-serif.

### Escala aplicada

| Elemento | Familia | Tamaño | Peso | Alto de línea | Tracking |
| --- | --- | --- | --- | --- | --- |
| h1 | Fraunces | `clamp(48px, 7.2vw, 108px)` | 400 | 0.96 | -0.03em |
| Hero, línea chica | Fraunces | `clamp(28px, 3.2vw, 52px)` | 400 | 1.05 | -0.03em |
| Hero, “echar raíces.” | Fraunces itálica | `clamp(46px, 11vw, 138px)` | 400 | 0.88 | -0.04em |
| h2 | Display | `clamp(34px, 4.6vw, 64px)` | 400 | 1.06 | -0.018em |
| h2 del CTA | Display | `clamp(44px, 7vw, 96px)` | 400 | hereda 1.06 | hereda |
| h3 | Display | `clamp(20px, 2vw, 26px)` | 400 | 1.3 | 0.005em |
| Cuerpo | Montserrat | 15.5px | 400 | 1.7 | 0 |
| Lead del hero | Montserrat | `clamp(16px, 1.5vw, 18px)` | 400 | 1.7 | 0 |
| Lead de página | Montserrat | 16.5px | 400 | hereda | 0 |
| Cita `.quote` | Display | `clamp(19px, 1.8vw, 24px)` | 300 | 1.45 | 0 |
| Kicker / label | Montserrat | 11px | 500 | 1.4 | 0.1em, mayúsculas |
| Cota | Montserrat | 10.5px | 500 | hereda | 0.1em, mayúsculas |
| Botón | Montserrat | 12px (10.5 small, 12.5 large) | 500 | 1.2 | 0.1em, mayúsculas |
| Pie | Montserrat | 11.5px | 400 | 1.6 | 0 |

Los titulares no van en negrita. Mayúsculas solo en kickers, labels, cotas, botones y el nombre de ubicación del proyecto.

---

## D. Layout

| Token | Valor |
| --- | --- |
| `--container` | 1180px |
| Ancho de proyecto destacado y portfolio | 1320px |
| `--gutter` | `clamp(20px, 5vw, 64px)` |
| `--header-height` | 76px |
| `--line-width` | 0.75px |

**Grilla.** Home institucional: dos columnas (`0.95fr / 1.05fr`) en la presentación y (`1.2fr / 0.8fr`) en el proyecto destacado. Portfolio: una ficha a ancho completo, imagen y texto en dos columnas (`1.15fr / 0.85fr`). No hay grilla de cards de tres columnas.

**Breakpoints** (max-width): 1100px, 980px, 760px, 520px. Debajo de 980px las grillas de dos columnas pasan a una columna.

**Header.** Fijo, altura visual ~76px, padding 20px que baja a 12px al hacer scroll. `scroll-padding-top` igual a `--header-height`.

---

## E. Componentes

### Header (`.site-header`)

- Fijo, transparente sobre el hero de la home.
- Al scrollear, con el menú abierto, o fuera de la home: fondo sólido `--bg` y borde inferior `--line`. Sin blur.
- Logo: `raices_logo_texto.png`, alto 36px (se compacta al scrollear), clase `logo-on-dark`.
- Links: Proyectos, Nosotros, Contacto. Estado activo con `aria-current="page"`.
- CTA “Consultar” usa `.button.button-small`.
- Menú móvil: botón de dos trazos, cierra con Escape, al navegar y bloquea el scroll del body (`.nav-open`).

### Hero (`.cine-hero`)

- `min-height: 100svh`. Imagen `balcones-tensores.webp` a cover, Ken Burns de 32s y parallax con `--hero-progress`.
- Si existe `NEXT_PUBLIC_HERO_VIDEO`, un `<video>` mudo, en loop, con esa imagen de poster. Hoy no hay video: no se usa stock.
- Velos lineales hacia `--bg` más un grano SVG al 18 %.
- Kicker, h1, lead y dos botones: “Explorar proyectos” (`.button-fill`) y “Contactanos” (`.button`).
- Pie: cota `Raíces Developers · Buenos Aires` y la nota “Imagen de referencia”.
- Indicador `.scroll-cue` hacia `#raices`.
- El wordmark no se repite dentro del hero: está en el header y en la intro.

### Botones (`.button`)

- Borde 1px marfil, fondo transparente, radio 2px, alto mínimo 46px.
- Hover ghost: fondo y borde `--green-deep`, texto marfil.
- `.button-fill`: fondo marfil, texto `--bg`. Hover: fondo y borde `--accent`, texto `--bg`.
- `.button-arrow`: la flecha se desplaza 4px en hover.
- `.button-small` 36px. `.button-large` 52px.
- Disabled: opacidad 0.55.

### Links (`.text-link`)

- 12px, peso 500, subrayado 0.75px, color `--muted`, hover `--text`.
- `.text-link-arrow` es mayúscula, tracking 0.1em, sin subrayado.

### Proyecto destacado y fichas

- Home: `.featured`. Imagen grande, logo de Ceibo Vidal, nombre, “Saavedra, Buenos Aires”, resumen, dos datos y “Descubrir el proyecto”. No vuelca la ficha comercial.
- Al entrar en vista, seis bandas `.media-shutter` (color `--bg`) se abren de arriba hacia abajo. Ver Motion.
- Portfolio: `.project-card`. Misma lógica, sin persiana. Hover de imagen: escala 1.06.
- Nota visible cuando la imagen es render de referencia.

### Galería (`.gallery-strip`)

- Carril horizontal con scroll-snap. Cada ítem `min(78vw, 720px)`.
- Hover: escala 1.04 en 900ms.
- Click abre lightbox. Caption con índice.
- Los renders de Ceibo Vidal se tratan como referencia, no como fotografía de obra.

### Formulario de contacto

- Campos: nombre, email, asunto (`Ceibo Vidal` o `Consulta general`), mensaje, consentimiento.
- Con `NEXT_PUBLIC_FORM_ENDPOINT`: POST JSON al worker `functions/contact-worker.js` (Resend). El éxito depende de la respuesta del servidor.
- Sin esa variable: estado `unconfigured`. No simula el envío. WhatsApp sigue disponible.
- Honeypot y tiempo mínimo de completado (3s) en el cliente. `RESEND_API_KEY` y `CONTACT_TO_EMAIL` no viven en el frontend.

### WhatsApp

- Flotante `.whatsapp-float`: 52px, círculo, fondo `#25D366`, logo oficial de WhatsApp en `Icons.jsx`.
- Enlace directo `https://wa.me/` con el número de `contact.whatsappNumber` (`NEXT_PUBLIC_WHATSAPP_NUMBER`, fallback `5491136994200`). Sin panel intermedio.
- Es el único control circular del sitio: tiene que reconocerse como WhatsApp.

### Footer (`.site-footer`)

- Logo completo en blanco (`logo-on-dark`), claim, navegación, email, WhatsApp, dirección de Ceibo Vidal.
- Línea legal: los renders son ilustrativos.

### Intro (`.logo-intro`)

- Solo en la home, una vez por sesión (`sessionStorage` `raices-intro-seen`).
- Se puede saltar con click, Enter, Espacio o Escape.
- No corre si `prefers-reduced-motion: reduce`.

---

## F. Motion System

No hay GSAP ni Motion. Todo es CSS más `ScrollEffects` (IntersectionObserver y `--hero-progress`).

| Token | Valor |
| --- | --- |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--dur` | 600ms |
| `--dur-fast` | 320ms |
| Persiana | 900ms, `cubic-bezier(0.76, 0, 0.24, 1)`, stagger 80ms |

**Intro.** ~2.3s: isotipo con `clip-path` desde la base (900ms), wordmark (700ms, delay 720ms), trazo arena (500ms, delay 1100ms). Hold 1600ms y el telón sube en 700ms. El script inline de `app/layout.jsx` pone `data-intro` antes del primer pintado para evitar el parpadeo.

**Entradas.** `.reveal` y `.reveal-stagger` suben 18px y aparecen en 600ms. `.reveal-text` revela palabra por palabra. `.page-enter` (en `app/template.jsx`) funde cada navegación en 700ms.

**Scroll.** Parallax leve del hero. Sin scroll hijacking.

**Hover.** Imagen de ficha 1.06, galería 1.04, flecha de botón +4px, WhatsApp −2px y escala 1.04.

**Reduced motion.** El script no muestra la intro. CSS anula animaciones, deja el texto y las imágenes visibles y oculta `.media-shutter`.

---

## G. Imágenes y recursos

- Fotos y renders: WebP en `public/assets/images/`. Planos en `public/assets/plans/`.
- Hero y fachadas a `object-fit: cover`. Galería con alto `clamp(280px, 48vh, 560px)`.
- Overlays: gradiente a `--bg` en el hero; velo inferior en la imagen destacada.
- Video solo si `NEXT_PUBLIC_HERO_VIDEO` apunta a un archivo real en `public/assets/video/`. H.264, sin audio, ideal ≤ 6 MB. No hay video genérico cargado.
- Pipeline: `npm run optimize-images`. Logos PNG no se recomprimen si no achican.
- Oficiales: logos en `public/assets/brand/` y logos de socios en `public/assets/partners/`.
- Placeholders: cualquier render o vista de Ceibo Vidal lleva nota de “referencia” y el pie legal del footer. No presentarlos como fotografía de obra terminada.

---

## H. Buenas prácticas

- **Accesibilidad.** `lang="es"`, skip link, foco visible arena 2px, `aria-current`, labels de formulario, botones con nombre accesible. Contraste AA o superior en los pares de la sección B.
- **SEO.** Metadata en `app/layout.jsx`, títulos por página, canonical, Open Graph, `app/sitemap.js`, `app/robots.js`. Un h1 por vista.
- **Performance.** Server Components por defecto. Cliente solo en header, intro, formulario, WhatsApp, scroll y lightbox. Imágenes WebP. Sin librería de animación.
- **Responsive.** Probar 1440, 768 y 390. Sin overflow horizontal. El menú móvil reemplaza la fila de links.
- **Export estático.** `output: 'export'` y `trailingSlash`. `NEXT_PUBLIC_BASE_PATH` prefija assets cuando el sitio no está en la raíz.

---

## I. Anti-patterns

- Tema claro de página, cards de SaaS, radios grandes, glassmorphism, neones, gradientes llamativos.
- Iconos decorativos sin función. El círculo verde es solo WhatsApp.
- Una tercera familia además de Fraunces y Montserrat. Peso black en titulares. Tracking de labels por encima de 0.14em.
- Preloader falso, intro en cada ruta, scroll que secuestra la rueda.
- Inventar desarrollos, amenities o años que no estén en `app/content/site.js`.
- Redibujar o recolorear los PNG de marca. La versión blanca es `filter: brightness(0) invert(1)`.
- Simular el envío del formulario cuando no hay endpoint.
- Video de stock para “dar movimiento”.

---

## J. Referencias de diseño

21st.dev se usó como biblioteca de criterio, no como kit para instalar. El sitio no tiene Tailwind ni shadcn. No se copiaron identidades.

| Referencia | id | Qué se tomó | Qué no |
| --- | --- | --- | --- |
| Shutter Reveal (dhileepkumargm) | 9326 | Código leído. Persiana de 6 bandas, 900ms, stagger 80ms, easing `cubic-bezier(0.76, 0, 0.24, 1)`, color `--bg`, solo en el proyecto destacado y una sola vez al entrar en vista. | No se instaló el componente. No tapa la imagen si el usuario pide menos movimiento. |
| PrismaHero (rahil1202) | 12200 | Código leído. Confirmó el hero a pantalla, el revelado por palabras y el contenido apoyado abajo. Eso ya estaba resuelto con CSS. | No se trajo el video de stock, la navbar píldora, el radio de 2rem ni Framer Motion. |
| Interactive Blur Reveal | 26931 | Solo ficha. Descartado: WebGL y desenfoque permanente compiten con la fachada. | — |
| Cinematic Orbit Hero | 32357 | Solo ficha. Descartado: órbita 3D de muchas imágenes. Hay un solo proyecto. | — |
| Hero Scroll Video Pin | 25482 | Solo ficha. Descartado: pin de scroll y GSAP sin un video propio. | — |
| Horizontal Feature Reveal | 26062 | Solo ficha. Descartado: track horizontal que secuestra el scroll. | — |
| Immersive Full Screen Navigation | 27229 | Solo ficha. El header editorial actual es más directo para cuatro destinos. | — |

Otras fichas vistas y no implementadas: Cinematic landing Hero (11494), Cinematic Product Scroll (17441), Immersive Scroll Gallery (2025), ImgText Reveal (25481).

---

## K. Registro de decisiones

1. **Se trabajó sobre el sitio existente** (Next.js, App Router, export estático), no sobre un proyecto nuevo. Punto de recuperación git: rama `backup/pre-premium-pass` en `d658f12`.
2. **Fraunces en los titulares.** M PLUS U se mantiene en la carpeta de venta y en el archivo de marca, pero en la web los títulos pasaron a Fraunces (itálica solo en la frase principal del hero) para que la Home se lea como pieza editorial. Montserrat sigue en navegación, botones, párrafos y en el wordmark.
3. **Fondo `#0A0D0B`, no `#21201E`.** El tinta de carpeta queda como token de marca. La web usa el negro más profundo pedido para la dirección cinematográfica.
4. **Acento arena, no bronce.** `--bronze` (`#A58E68`) está declarado y no pinta componentes. El acento real es `--arena` (`#C4A97D`), que además cumple AAA sobre `--bg`.
5. **Header sólido.** Se quitó el `backdrop-filter`. El vidrio no aporta y contradice la dirección.
6. **Persiana solo en Ceibo Vidal de la home.** Es el momento que el brief pedía más cuidado. El resto entra con el reveal de 18px para no repetir el efecto.
7. **Sin video de hero.** No hay un archivo de calidad en el repo. La imagen de balcones lleva deriva lenta. El video se activa con variable de entorno, no con stock.
8. **Favicon en Caliza sobre Carbón**, generado desde `raices_logo_icono.png` sin redibujar la forma. Ver la sección siguiente.
9. **Formulario.** Sigue exigiendo endpoint real. Documentado como pendiente de entorno si `NEXT_PUBLIC_FORM_ENDPOINT` está vacío.

---

## Favicon e identidad digital

El favicon es el isotipo de Raíces Developers, no el de Ceibo Vidal.

**Original.** `public/assets/brand/raices_logo_icono.png`. PNG de paleta, 749×893, trazo negro (`#000000`) sobre transparencia. No es vectorial: no hay `favicon.svg`.

**Generados** por `scripts/optimize-images.mjs` (`npm run optimize-images -- --favicons-only`). El script no redibuja la forma. Toma el alfa del PNG, pinta ese trazo en Caliza `#D1C7BA` y lo compone sobre Carbón `#101210`, los tokens de `DESIGN_SYSTEM.md`.

El trazo del original mide unos 18 px. A 180 px sigue ocupando más de un píxel y se escala con Lanczos, con antialias. A 16, 32 y 48 px esa misma tinta cubriría una fracción de píxel y se apagaría. En esos tamaños cada píxel que el trazo cubre pasa a Caliza sólida. Es el mismo mapa de tinta cuantizado a la grilla.

| Archivo | Tamaño | Notas |
| --- | --- | --- |
| `public/favicon.ico` | 16, 32 y 48 | PNG embebidos. Lo pide el navegador aunque no haya `<link>`. |
| `public/favicon-32x32.png` | 32×32 | Icono de la pestaña. Padding 6 %. |
| `public/apple-touch-icon.png` | 180×180 | Fondo opaco, padding 18 % para el recorte de iOS. |

**Configuración.** `metadata.icons` en `app/layout.jsx` apunta a esos tres archivos, con `BASE` para respetar `basePath`. El layout raíz cubre Home, Proyectos, Ceibo Vidal, Nosotros y Contacto. No hay `app/favicon.ico` ni iconos de Vercel, Next.js u otra plantilla.

**Reglas**

- Regenerar desde el isotipo oficial. No sustituir por el logo de Ceibo ni por un icono de plantilla.
- El trazo del favicon es Caliza y el fondo es Carbón. La versión blanca del logo es para header, footer e intro.
- A 32 y 48 px se leen la torre, el vano y las raíces. A 16 px el vano no entra en la grilla: queda la silueta de la torre sobre la masa de raíces. No engrosar el dibujo a mano para “mejorar” el 16.
- Open Graph sigue aparte: `public/assets/brand/og-image.png`, logo completo en blanco sobre `#21201E`.
