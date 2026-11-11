# Raíces Developers · Design System web

Fuente de verdad de la interfaz implementada en este repositorio.
Los valores de color, tipo y motion coinciden con `app/globals.css`, `app/cinematic.css` y `app/layout.jsx`.
La paleta de marca de carpeta de venta sigue documentada en `DESIGN_SYSTEM.md`. Este archivo describe solo lo que la web usa.
La interfaz parte de Carbón `#101210` y Caliza `#D1C7BA`. El resto de tokens se usa cuando el componente lo pide.

---

## A. Identidad de marca

**Nombre:** Raíces Developers. Nombre corto: Raíces.
**Posicionamiento:** desarrolladora inmobiliaria boutique en Buenos Aires. El sitio presenta a la empresa. Ceibo Vidal es el primer desarrollo, no la marca del dominio.

**Personalidad visual:** dark architectural luxury. Editorial, cinematográfica y sobria. Arquitectura contemporánea, atención al detalle, confianza sin lenguaje de inmobiliaria genérica.

**Conceptos:** hacemos edificios donde nosotros mismos viviríamos; criterio, simplicidad y soluciones duraderas. El footer usa la frase de la Home, «Hacemos edificios / donde nosotros mismos viviríamos.» (`brand.slogan`). «Espacios para habitar» ya no se muestra. **«Espacios para echar raíces» está descartado definitivamente: no reintroducirlo en UI, contenido, SEO ni documentos.** La vegetación integrada sigue en la identidad arquitectónica y no reemplaza ese mensaje.

**Principios**

- La imagen arquitectónica manda. El texto la enmarca, no la compite.
- Espacio negativo amplio, grillas asimétricas, divisores de 0.75 px.
- Un acento (arena) y un verde profundo. Sin neón, sin gradientes decorativos, sin glass.
- Los logos oficiales no se redibujan. Sobre fondo oscuro se invierten con CSS.
- No se inventan proyectos, años, cifras ni historia. Los textos y datos viven en `app/content/`. Ver `docs/CONTENT_GUIDE.md`.

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
| `--tinta` | `#21201E` | Reservado. El fondo real de la web es Carbón. |
| `--carbon` | `#101210` | `--bg`. Fondo de página, header sólido, intro, persianas. |
| `--caliza` | `#D1C7BA` | `--text`. Titulares, cuerpo, logos sobre oscuro, botón fill. |
| `--blanco` | `#F8F7F4` | Reservado. El texto claro es Caliza, no blanco papel. |
| `--lino` | `#F0EDE6` | `--surface-light`. No hay páginas en tema claro. |
| `--arena` | `#C4A97D` | `--accent`. Kickers, cotas, trazo de 2 px bajo títulos. |
| `--liquen` | `#7E8E5F` | `--accent-green`. Definido, sin regla CSS que lo aplique. |
| `--musgo` | `#536245` | `--green-deep`. Hover del botón ghost (relleno que sube). |
| `--ceibo` | `#B85C42` | Definido. No se usa como acento de interfaz. |
| `--niebla` | `#6E6F68` | No se usa directo. El metadato es `--muted`. |

### Superficies y texto (los que pinta la interfaz)

| Token | Hex | Uso |
| --- | --- | --- |
| `--bg` | `#101210` | Carbón. Fondo de página, header sólido, intro, persianas. `theme-color`. |
| `--bg-alt` | `#161714` | Bandas alternas, un paso más claro que Carbón. |
| `--surface` | `#1C1D1A` | Plano detrás de imágenes antes de cargar. |
| `--surface-2` | `#19382C` | Verde bosque. Reservado; el page header ya no lo usa. |
| `--text` | `#D1C7BA` | Caliza. Titulares, cuerpo, botón fill. |
| `--text-soft` | `rgba(209, 199, 186, 0.78)` | Párrafos secundarios y leads. |
| `--muted` | `#A89E90` | Labels, metadatos, captions. |
| `--bronze` | `#A58E68` | Definido. No tiene regla propia: el acento aplicado es `--arena`. |
| `--line` | `rgba(209, 199, 186, 0.16)` | Divisores. |
| `--line-strong` | `rgba(209, 199, 186, 0.34)` | Énfasis de línea. |
| `--line-on-light` | `rgba(133, 96, 64, 0.22)` | Reservado para superficies claras. |
| `--veil` | `16, 18, 16` | RGB de Carbón para velos `rgba(var(--veil), α)`. |
| `--wa` | `#25D366` | Solo el botón flotante de WhatsApp. |

`--radius: 8px` existe como token histórico. Los botones usan `--radius-button: 2px`. Fichas, láminas, formulario y figuras van a radio 0. No redondear tarjetas.

### Contraste (calculado sobre los hex de arriba)

| Par | Ratio | Dónde |
| --- | --- | --- |
| `#D1C7BA` sobre `#101210` | 11.28 | Texto principal, logos sobre oscuro, apple touch icon. AAA. |
| `#A89E90` sobre `#101210` | 7.13 | Labels. AAA. |
| `#C4A97D` sobre `#101210` | 8.35 | Kickers y cotas. AAA. |
| `#D1C7BA` sobre `#19382C` | 7.66 | Texto sobre el verde bosque. AAA. |
| `#F8F7F4` sobre `#536245` | 6.12 | Texto del botón ghost en hover (Blanco sobre Musgo). AA. |
| `#101210` sobre `#D1C7BA` | 11.28 | Botón fill. AAA. |
| `#101210` sobre `#C4A97D` | 8.35 | Hover del botón fill. AAA. |
| `#D1C7BA` sobre `#101210` | 11.28 | Favicon e iconos de inicio (isotipo oficial, ~78 % del cuadrado). AAA. |

### Combinaciones permitidas

- Caliza sobre Carbón, o sobre verde bosque.
- Arena solo para textos cortos (kicker, cota, label de acento), nunca para párrafos.
- Musgo como relleno de hover del botón ghost, con texto Blanco `#F8F7F4`.
- Caliza `#D1C7BA` sobre Carbón `#101210` en interfaz, logos sobre oscuro y apple touch icon.
- Caliza `#D1C7BA` sobre Carbón `#101210` en el favicon y en los iconos de inicio.
- Verde WhatsApp solo en el botón flotante.

No poner liquen, ceibo o bronce como fondos nuevos sin revisar este archivo y el contraste.

---

## C. Tipografía

El logo está compuesto en Montserrat y no se reemplaza. Los titulares de la interfaz usan **M PLUS U** (la misma familia de la carpeta de venta). Fraunces se retiró en F0 (ver K, decisión 23).

| Rol | Familia | Carga | Pesos |
| --- | --- | --- | --- |
| Display | M PLUS U | `next/font/local`, `app/fonts/m-plus-u-latin.woff2` (variable, subset latin), variable `--font-mplus`, token `--font-display` | 300 a 500, solo romana |
| UI y lectura | Montserrat | `next/font/google`, variable `--font-montserrat` | 400, 500, 600 |

`font-display: swap`. Fallback: Helvetica Neue, Arial, sans-serif.

M PLUS U **no tiene itálica**. El énfasis se hace con peso (300 → 400) y color (Caliza → Blanco `#F8F7F4`), nunca con itálica sintética. Métricas medidas: 1ch ≈ 0,667em y el carácter medio ≈ 0,53em, bastante más ancho que Fraunces; los `max-width` en `ch` de los titulares se calibraron con eso.

### Escala aplicada

Tokens `--fs-*` en `:root` de `app/globals.css`. Todos los titulares usan peso 300 (h3 400).

| Token | Valor | Uso |
| --- | --- | --- |
| `--fs-hero` | `clamp(46px, min(4.5vw, 7.6vh), 80px)`; ≤1023px `clamp(44px, 5.8vw, 56px)`; ≤759px `clamp(29px, 8.8vw, 40px)` | h1 del hero (64,8px a 1440×900, 54,7px a 1280×720, 44,5px a 768, 34,3px a 390, 29px a 320) |
| `--fs-display` | `clamp(36px, 5.2vw, 84px)`; ≤759px `clamp(30px, 8.6vw, 36px)` | manifiesto |
| `--fs-h1` | `clamp(36px, 4.6vw, 72px)`; ≤759px `clamp(30px, 8.2vw, 34px)` | h1 de página, h1 de proyecto |
| `--fs-h2` | `clamp(32px, 3.8vw, 56px)`; ≤759px `clamp(26px, 7vw, 30px)` | h2 de sección |
| `--fs-h3` | `clamp(22px, 2vw, 28px)`; ≤759px `20px` | h3 |
| `--fs-metric` | `clamp(28px, 3vw, 44px)` | cifras de las fichas (`.spec-card strong`) |
| `--fs-lead` | `clamp(16px, 1.3vw, 18px)` | lead |
| `--fs-body` | 15.5px | cuerpo |
| `--fs-small` / `--fs-label` / `--fs-kicker` | 13px / 11px / 12px | apoyo, labels, kickers |

Alto de línea: h1 1,04 (hero 1,1 en mobile, 1,06 en tablet, 1,05 en desktop), h2 1,08, cierre 1 (frase larga 1,06). Cuerpo Montserrat 1,7. Cita `.quote` en M PLUS U 300.

**Escala mobile (≤759px).** No es la de desktop reducida: cada nivel baja un paso (hero 34 → h1 32 → h2 27 → h3 20 → lead 16 → cuerpo 15,5, medidos a 390px) para que un título largo entre en dos o tres líneas y la jerarquía se lea. El menú móvil usa 34px. No volver a fijar `font-size` sueltos de título en mobile: se cambia el token.

Los titulares no van en negrita ni en itálica. Mayúsculas solo en kickers, labels, cotas, botones y el nombre de ubicación del proyecto.

---

## D. Layout

| Token | Valor |
| --- | --- |
| `--container` | 1180px |
| Ancho de portfolio | 1320px |
| Proyecto destacado en Home | 100svh, dos columnas (`1.28fr / 0.72fr`) |
| `--gutter` | `clamp(20px, 5vw, 64px)` |
| `--header-height` | 76px |
| `--line-width` | 0.75px |

**Grilla.** Home institucional: dos columnas (`1.05fr / 0.82fr`) en la presentación. El proyecto destacado es una lámina a `100svh` (`1.28fr / 0.72fr`). Portfolio: una ficha a ancho completo, imagen y texto en dos columnas (`1.15fr / 0.85fr`). No hay grilla de cards de tres columnas.

**Breakpoints (F4, consolidados):** `max-width: 1023px` (tablet: las grillas de dos columnas pasan a una), `max-width: 759px` (mobile), `max-width: 420px` (mobile chico) y `min-width: 1024px` (desktop). Rango de diseño: 1280 / 1024 / 760 / 420. No hay más puntos de corte: no reintroducir 1100, 980, 899 ni 520. El hero suma dos consultas por alto, propias de una pieza a pantalla completa: `(max-width: 759px) and (max-height: 620px)` (teléfono bajo: se compactan los márgenes) y `(min-width: 1024px) and (max-height: 760px)` (notebook baja: el fundido inferior sube un paso).

**Header.** Fijo, altura visual ~76px, padding 20px que baja a 12px al hacer scroll. `scroll-padding-top` igual a `--header-height`.

---

## E. Componentes

### Header (`.site-header`)

- Fijo, transparente sobre el hero de la home. Al scrollear (> 18px), con el menú abierto o fuera de la home: velo `rgba(16,18,16,.78)` con `backdrop-filter: blur(12px)` y borde inferior `--line`. El velo y el blur viven en `.site-header::before`, no en el header: un `backdrop-filter` en el ancestro haría que el menú móvil (`position: fixed`) se midiera contra el header y no contra la ventana.
- Altura 76px arriba y 72px al scrollear (logo 36 → 34px).
- Logo: `raices_logo_texto.png`, clase `logo-on-dark` (Caliza sobre Carbón).
- Links: Proyectos, Nosotros, Contacto. Cada uno lleva un índice `01`–`03` (`.nav-index`, M PLUS U 10px, color `--accent`, `aria-hidden`). Estado activo con `aria-current="page"` y subrayado arena.
- CTA “Consultar” usa `.button.button-small` y va a `/contacto`.
- **Menú móvil (≤ 759px), M14:** overlay a pantalla completa. Se abre con una cortina `clip-path` (520ms `--ease-in-out`), los tres ítems suben escalonados (480ms, 70ms entre uno y otro, desde 160ms) en M PLUS U 300 34px (interlínea 1,2; el ítem activo en Blanco) con el índice, y abajo `WhatsAppLink source="menu"` relleno más `contact.whatsappDisplay`. Cierra con Escape, al navegar (420ms) o si la ventana pasa a 760px o más. Abierto bloquea el scroll del body (`.nav-open`) y deja `inert` `#contenido`, `.site-footer` y `.whatsapp-float-region`: ni el foco del teclado ni un toque caen detrás del overlay. Cerrado queda `visibility: hidden`.
- Botones (M11): el relleno sube con `translateY(101%) → 0` en 320ms `--ease-std`; el color del texto cambia a los 120ms.

### Hero (`.cine-hero`)

Idea de composición: **el texto apoyado sobre el plano de la vereda.** El edificio ocupa la parte alta y el texto descansa en la franja más uniforme del render (la vereda, 78–100 % del alto de la imagen), nunca sobre barandas, ventanas ni vegetación. La legibilidad sale del encuadre y de fundidos progresivos a Carbón, no de una placa detrás del título.

- Grilla de tres filas sobre `min-height: 100svh`: aire para el edificio (`minmax(clamp(200px, 34svh, 340px), 1fr)`; en desktop `1fr`) · texto (`.cine-hero-content`) · base (`.hero-base`). El texto se ancla abajo: en un teléfono bajo (375×553, 320×568) entra completo con la acción visible; en uno alto el edificio gana altura.
- **Imagen** `imagen_fachada_cerca_v0.webp` (1312×1199) a cover. Mobile y tablet: la caja de la imagen cubre la fila 1 más un 28 % (`height: 128%`) para que el fundido termine detrás del título; `object-position: 56% 62%`, `--hero-zoom: 1.1` con origen `56% 78%` (la línea de vereda). Desktop: a pantalla completa, `object-position: 50% 100%` (anclada abajo: la vereda queda bajo el texto), sin zoom. Asienta una vez (`heroMediaSettle`, 1,03 → 1; 1,06 → 1 en desktop; 1400ms `--ease-out-expo`) y, sin intro, entra con `heroMediaFade` (600ms). El parallax suma `--hero-progress × 0.06` a la escala.
- Si existe `NEXT_PUBLIC_HERO_VIDEO`, un `<video>` mudo, en loop, con esa imagen de poster. Hoy no hay video.
- **Velos (`.cine-hero-scrim`, siempre con `--veil`).** Superior, medido en px porque el header no depende del alto de pantalla: `.72` a 0 → `.48` a 56px → `.18` a 116px → 0 a 196px. Inferior en mobile y tablet: 0 a 46 % → `.2` a 58 % → `.52` a 69 % → `.78` a 79 % → `.93` a 89 % → Carbón a 100 %. Inferior en desktop (desde abajo): Carbón → `.94` a 10 % → `.86` a 20 % → `.74` a 30 % → `.56` a 39 % → `.32` a 47 % → `.12` a 55 % → 0 a 64 %, más dos radiales direccionales: abajo a la izquierda (`58% 64%`, `.5` → 0, bajo el titular) y arriba a la izquierda (`30% 26%`, `.46` → 0, bajo el logo). En notebook baja el inferior sube un paso (ver `cinematic.css`). Grano SVG al 10 %, con máscara que lo apaga hacia abajo.
- **h1 con `RevealLines`** (modo static, `immediate`): “Hacemos edificios” (`.hero-line-quiet`, Caliza, peso 350 en mobile y 300 desde 760px) y “donde nosotros mismos viviríamos.” (`.hero-line-strong`, peso 400, Blanco, `text-wrap: balance`). Mobile y tablet: `max-width: 10.4em`, tres líneas («Hacemos edificios / donde nosotros / mismos viviríamos.»), interlínea 1,1 (1,06 en tablet), tracking `-0.015em` (`-0.02em` desde 760px). Desktop: sin ancho máximo, dos líneas (una por tramo), interlínea 1,05 y un halo de Carbón (`text-shadow: 0 0 34px rgba(veil,.62), 0 0 6px rgba(veil,.3)`) que sigue a las letras donde la primera línea roza el zócalo iluminado.
- **Lead** `rgba(231,224,213,.9)`, 15,5px/1,6 en mobile, `--fs-lead` desde 760px, 46ch (50ch en desktop). **Acción** única: `Descubrir Ceibo Vidal` (`.button.button-arrow`, contorno, 48px de alto, ancho según contenido). En desktop el lead va a la izquierda y la acción a la derecha, en la misma fila bajo el título.
- **Base (`HeroBase.jsx`, `.hero-base`).** Reemplaza la tarjeta de contacto y el pie. Una línea fina (`--line-strong`) como línea de tierra, con la nota del render («Imagen de referencia», 10px `--muted`) y el contacto directo: WhatsApp y Email, cada uno con su ícono de 18px, el nombre (Montserrat 13,5px/500) y una flecha `ArrowUpRightIcon`. Sin fondo, sin borde, sin tarjeta. Mobile: nota a la derecha de la línea y, debajo, los dos accesos en dos mitades iguales con 56px de alto táctil. Desde 760px: una sola fila (nota · línea · etiqueta «Contacto» · WhatsApp · Email), 72px de alto (80px en desktop), accesos de 44px. Mismos destinos que antes: `whatsappHref()` con el mensaje oficial (`data-wa-source="hero-contact"`) y `mailtoHref()`. Sin campos: el envío real vive en `/contacto`.
- Jerarquía resultante: 1) arquitectura y título, 2) lead, 3) acción hacia el proyecto, 4) contacto.
- Secuencia (t = 0 es `data-intro="done"` o la carga sin intro): imagen desde 0, líneas del h1 desde 520ms (+90ms por línea), lead 900ms, acción 1000ms, base 1200ms. Todo en `heroIn` (700ms). Con `data-intro="playing"` las animaciones esperan en pausa.
- Al hacer scroll, solo en desktop: `--hero-out` (progreso 0,25 → 0,7) desvanece contenido y base y sube el contenido 32px; con progreso > 0,7 reciben `inert` (`ScrollEffects`). En mobile y tablet el hero es más alto que la foto y el texto se lee mientras se desplaza: no se desvanece ni queda inerte.
- Contraste medido sobre la foto real (texto oculto, percentil 95 del fondo): peor caso entre 15 ventanas de 320×568 a 1920×1080: título blanco 9,6:1, línea Caliza 4,3:1 (texto grande, mínimo AA 3:1), lead 9,7:1, acción 8,1:1, contacto 10,7:1, nota 7:1, menú 6,3:1. Script de medición: `tmp-qa/fable/contrast.mjs` (carpeta ignorada por git).

### Hero de proyecto (`.pj-hero`)

- Dos paneles de igual ancho (`1fr 1fr`, 100svh). Izquierda, sobre Carbón: `ProjectMark` (logo Ceibo 180px con `alt` = nombre, «Vidal 3849» debajo; sin kicker con el nombre), H1 `project.headline` con `RevealLines` en modo split (M PLUS U 300, `--fs-h1`, ancho máximo 11em), trazo Arena de 28 × 2px, lead, acciones y pie con cota `locationShort` («Saavedra, CABA»; la dirección ya figura bajo el logo). Derecha: la fachada vertical a sangre hasta el borde, con cortina (`.img-curtain`), `object-position: 50% 30%` y velo inferior que sostiene la nota de render. A 1440px cada panel mide 720px y la fachada se renderiza a 720px de ancho (nativo 682px: 1,06×).
- Acciones: `WhatsAppLink source="project-hero"` relleno y “Explorar tipologías” en contorno (`.button-arrow`). Una sola acción rellena.
- Secuencia: kicker 200ms, líneas del H1 desde 280ms (+90ms por línea), trazo 700ms, lead 800ms, acciones 900ms, pie 1100ms (`heroIn`).
- Mobile (< 900px): la fachada va arriba a `max(360px, 62svh)`, el texto debajo (logo 144px, H1 `clamp(32px, 9vw, 40px)`). Las acciones quedan bajo el primer pantallazo: ahí el WhatsApp flotante está visible desde el inicio (ver WhatsApp).

### Síntesis, arquitectura y banda fotográfica

- Síntesis (`.intro-band`): tres datos en M PLUS U `clamp(22px, 2.3vw, 32px)`, separados por líneas de 0,75px; en mobile una columna.
- Arquitectura (`.project-section`): grilla 5 / 7. Título por `RevealLines`. Las características son una lista con índice `01`–`04` en Arena y líneas entre ítems. Etiquetas, fichas (`.spec-card` con cifra a `clamp(32px, 3.6vw, 52px)`) y espacios comunes se conservan.
- **Banda fotográfica (`PhotoBand`, M08).** A sangre (`margin-inline: calc(var(--gutter) * -1)`), alto `clamp(340px, 70vh, 760px)` (mobile `clamp(300px, 56svh, 520px)`), con cortina. La imagen vive en `.photo-band-shift` (inset −6 % vertical) que, con `animation-timeline: view()`, se desplaza ±5 % (±2,5 % en mobile) mientras la banda cruza la ventana; sin soporte o con reduced motion queda estática. Usa `imagen_fachada_cerca_v0.webp` (1312 × 1199), con `object-position: 50% 58%`. La nota de render va debajo.

### Botones (`.button`)

- Borde 1px Caliza, fondo transparente, radio 2px, alto mínimo 46px.
- Hover ghost: el relleno de Musgo sube desde la base (`::before`, `scaleY`), texto Blanco.
- `.button-fill`: fondo Caliza, texto Carbón. Hover: el relleno de Arena sube igual, texto Carbón.
- `.button-arrow`: la flecha se desplaza 4px en hover.
- `.button-small` 36px. `.button-large` 52px.
- Disabled: opacidad 0.55.

### Links (`.text-link`)

- 12px, peso 500, subrayado 0.75px, color `--muted`, hover `--text`.
- `.text-link-arrow` es mayúscula, tracking 0.1em, sin subrayado.

### Manifiesto (`.manifesto`, `#manifiesto`)

- Una frase a gran escala: `homeContent.cta.title` (“Construimos espacios donde da placer vivir.”) con `RevealLines` en modo split, `--fs-display`, `max-width: 14em`, empieza en la columna 2 de 12. Trazo arena de 28 × 2px encima. Debajo, a la derecha (columnas 8–12), `homeContent.about.lead` en Montserrat 17px. Fondo `--bg-alt`, padding vertical `clamp(88px, 13vw, 184px)`. No crea texto: reubica el existente (P07).

### Filosofía en la Home (`.about-teaser`, `#raices`)

- Grilla 5 / 7 a pantalla completa (alto mínimo `min(100svh, 1000px)`). Texto a la izquierda: kicker, título por líneas (`about.titleQuiet` peso 300 + `about.titleEmphasis` peso 400 Blanco, modo static, `--fs-h2`), `about.bridge`, tres principios con índice `01`–`03` en Arena (label Montserrat 500 mayúscula, texto `--text-soft`, líneas de 0,75px) y `text-link` a `/nosotros`. A la derecha, `terraza-verde.webp` sangra hasta el borde de la ventana (cortina `.img-curtain-left`), con “Imagen de referencia” sobre un velo inferior. Se retiró la cita larga de la Home; sigue en `app/content/home.ts`.
- Bajo 1024px la imagen pasa primero (relación 4 / 3, 3 / 2 en mobile) y el texto debajo.

### Capítulo destacado (`.featured-chapter`, `#proyecto-destacado`)

- **Desktop (≥ 1024px y ≥ 641px de alto):** el capítulo mide `--featured-height` (**280vh**) y su bloque interior `.featured-sticky` queda fijo bajo el header (`top: var(--header-height)`, alto `100svh - header`). Columnas 5 / 7: a la izquierda la ficha (kicker, `ProjectMark` (logo de Ceibo 190px, 150px en mobile; «Vidal 3849»; línea comercial oficial; sin título «Ceibo Vidal» ni ubicación repetida), dos datos con regla superior, `Descubrir Ceibo Vidal` en contorno y `Consultar por WhatsApp` como `text-link`, sin botón relleno); a la derecha el escenario (`FeaturedStage`) sangra al borde de la ventana y recorre tres imágenes de `project.gallery.items`: fachada, terraza común y balcones.
- **Estados.** `data-active` 0 / 1 / 2 según el avance del tramo fijo (tercios). Fundido cruzado de 720ms `cubic-bezier(.45, 0, .55, 1)`: el panel entrante aparece encima y el saliente se apaga cuando termina (sin hueco ni dip). Antes de activar un panel se hace `img.decode()`. Es reversible al subir. La imagen activa lleva su nota (“Imagen de referencia”) abajo a la derecha, dejando libre el WhatsApp flotante.
- **Captions por estado (`.featured-states`).** Bajo el resumen y sobre los datos, una regla `--line` y el caption de la imagen activa: índice `01 / 03` (M PLUS U 12px), nombre en mayúsculas Arena y una línea descriptiva (14px). Solo reutilizan textos ya aprobados de `ceibo-vidal.ts` (`featuredStates`): “Fachada sobre Vidal · Planta baja con SUM in-out, cowork y cocheras.”, “Terraza común · Terraza común de 76 m². Jacuzzi y estar al aire libre.”, “Balcones con tensores · Cuatro pisos de tres unidades, cada una con balcón.”. Los tres viven en una sola celda de grilla (alto del más alto: no hay saltos) y se desplazan con máscara vertical: cada uno se posiciona con `--o = índice − --active` (`translateY(o × 105%)`), la fija `FeaturedStage` en el capítulo y la máscara es el `overflow: hidden` del contenedor. El que sale sube y se apaga en 560ms; el que entra espera 180ms y sube desde abajo (hacia atrás, al revés). Nombre, datos y acciones no se mueven. Sin sticky el bloque no se muestra.
- **Cálculo del scroll.** `FeaturedStage` mide la geometría una vez (carga, resize, `ResizeObserver` del body) y el handler de scroll, limitado a un frame, solo compara `scrollY`: cero lecturas de layout por evento.
- **Tablet (760–1023px):** sin sticky, dos columnas (imagen y ficha), una sola imagen. **Mobile (< 760px):** sin sticky, fachada arriba (relación 1 / 1,1 y como máximo 56svh de alto, ~430px a 390 × 844 y ~375px a 375 × 667) y ficha debajo con el logo a 116px y menos aire (padding superior 30px): el nombre queda a ~130px de la foto, visible en el primer pantallazo a 390 y 375px. La nota de render va abajo a la izquierda. Las otras dos imágenes no se muestran (quedan en la galería de Ceibo Vidal). `@media (max-height: 640px)` también desactiva el sticky.
- **Prototipo de altura (Plan F2.4, medido con Playwright; recorrido ≈ 3 × px por estado).** Recorrido fijo = alto del capítulo − alto de la pieza fija; cada estado dura un tercio.

| Altura | 1440×900: recorrido / por estado | 1280×720: recorrido / por estado |
| --- | --- | --- |
| 180vh | ≈796px / **265px** | ≈652px / **217px** |
| 220vh | ≈1156px / **385px** | ≈940px / **313px** |
| 260vh | ≈1516px / 505px | ≈1228px / **409px** |
| **280vh** | ≈1696px / **565px** | ≈1372px / **457px** |

180vh y 220vh no llegan a 450px por estado en ninguno de los dos viewports (el recorrido fijo es `H − (100svh − header)`, no `H`: el criterio de 450–700px era incompatible con esas alturas). Con 260vh el viewport de 1280×720 queda corto (409px). Se fija **280vh**: 565px y 457px por estado, y a 1920×1080 serían ~670px, todavía bajo el límite de 800px a partir del cual la sección se siente detenida. Las capturas a 0 / 25 / 50 / 75 / 100 % de cada combinación están en `docs/qa/f2/sticky/`.
- Portfolio: `.project-card`. Misma ficha de datos; la imagen entra con `.img-curtain`. Hover de imagen: escala 1.06.
- Programa: “PB + 4 pisos” y “12 unidades” en `.fact-sub` (Montserrat 12px, mayúsculas).
- Nota visible cuando la imagen es render de referencia.

### Galería (`ProjectGallery`, `.gallery-immersive`)

- Desktop: escenario 16 / 10 (columnas 9 de 12, ancho máximo 1560px) con fundido cruzado de 720ms `cubic-bezier(.45, 0, .55, 1)` entre las tres imágenes de `gallery.items`; a la derecha contador `01 / 03`, caption (`RevealLines` static, `immediate`, vuelve a subir en cada cambio), nota, flechas y miniaturas verticales (72px de alto, la activa a opacidad 1 y con línea Arena que crece en 320ms).
- Fachada (`imagen_fachada_zoom_v0`) y terraza (`imagen_terraza_noche_v0`) son verticales: se muestran enteras (`object-fit: contain`) sobre una copia oscurecida y desenfocada (`blur(36px) brightness(.38)`). El SUM (`imagen_sum_v0`) usa `cover`.
- Cambio de imagen: espera `img.decode()`; mientras dura el fundido la saliente sigue en opacidad 1, de modo que nunca hay un frame sin imagen (verificado muestreando cada frame). Se ignoran clics durante el decode; la siguiente imagen se precarga. Sin autoplay.
- Teclado: ← → con el foco en la galería (`role="group"`, `aria-roledescription="carrusel"`). Táctil: swipe horizontal con umbral de 40px (pointer events). Clic o Enter sobre el escenario abre el `<dialog class="lightbox">` (←/→/Escape, foco nativo).
- Mobile (< 900px): escenario 4 / 3 a sangre, contador, caption y flechas debajo, miniaturas en fila de tres (56px).
- Los renders de Ceibo Vidal se tratan como referencia, no como fotografía de obra.

### Láminas Lino y tipologías (`.sheet`, `TypologySelector`)

- `.sheet`: bloque Lino (`--surface-light`) con texto `--tinta`, radio 0 como el resto de las placas. Los planos son líneas oscuras: la imagen usa `mix-blend-mode: multiply` y las cortinas dentro de una lámina son transparentes (si no, multiplican contra el fondo oscuro de la cortina y el mapa queda negro).
- Planta tipo: una lámina de ancho completo (padding `clamp(16px, 3vw, 44px)`) con su cota debajo.
- **Selector (M12).** `role="tablist"` con tres pestañas “A 3 ambientes · B Monoambiente · C 2 ambientes” (código en Montserrat 12px Arena, nombre en M PLUS U 300 `clamp(18px, 1.8vw, 24px)`). El subrayado Arena de 2px (`.tabs-ink`) se desliza a la pestaña activa en 360ms `--ease-std`, calculado con `offsetLeft/offsetWidth`. Las flechas, Inicio y Fin cambian de pestaña y mueven el foco. Las tres fichas están en el HTML (`hidden` en las inactivas); `#tipologia-{id}` activa la pestaña al cargar y al cambiar el hash. El panel entrante aparece en 420ms desde 16px, con 120ms de espera.
- Panel (`.typology-panel`, 55 / 45) sobre Carbón. El plano va a la izquierda, sobre `--surface-light`, sin recorte. A la derecha: unidad, título (M PLUS U 300 `--fs-h2`, Blanco), programa, superficies en tres columnas (etiqueta Montserrat 11px, cifra M PLUS U 300; el total en Blanco), render con radio 4px, nota y el enlace “Escribinos →”. Los datos salen de `app/content/ceibo-vidal.ts`.
- Por debajo de 1024px el orden es texto, superficies, plano, render y acciones.  La barra de pestañas se desplaza en horizontal con `scroll-snap-type: x proximity`.

### Verde, ubicación y contacto en Ceibo Vidal

- Los títulos de Aire libre, Ubicación, Tipologías y Contacto usan `RevealLines`. Las imágenes de Aire libre entran con cortina (la ancha `-left`, las angostas hacia arriba) y el mapa con cortina sobre su lámina.
- Diagrama de raíces: las tres líneas crecen con `scale: 1 0 → 1 1` (900ms `--ease-in-out`, 160ms de escalón) al entrar la tarjeta; las ramas aparecen después con un fundido de 600ms. Sin JS queda dibujado.
- Formulario (M17): la línea inferior de cada campo se subraya en Arena de izquierda a derecha al enfocar (360ms). Los campos ya eran solo línea.

### Formulario de contacto

- Campos: nombre, email, asunto (`Ceibo Vidal` o `Consulta general`), mensaje, consentimiento.
- Campos sobre fondo transparente, separados por una regla superior `--line`. Sin caja ni radio.
- Con `NEXT_PUBLIC_FORM_ENDPOINT`: POST JSON al worker `functions/contact-worker.js` (Resend). El éxito depende de la respuesta del servidor.
- Sin esa variable: estado `unconfigured`. No simula el envío. WhatsApp sigue disponible.
- Honeypot y tiempo mínimo de completado (3s) en el cliente. `RESEND_API_KEY` y `CONTACT_TO_EMAIL` no viven en el frontend.

### WhatsApp

- Flotante `.whatsapp-float`: 52px (cumple los 44px táctiles), círculo **Carbón** (`rgba(16, 18, 16, .9)` con blur 8px), trazo `--line-strong` e icono oficial de WhatsApp (`Icons.jsx`, 24px) en **Caliza**. Contraste del icono 11,3:1 (mínimo AA 3:1; AAA 7:1). Hover y foco por teclado: se invierte (fondo Caliza, icono Carbón, 11,3:1); el foco usa además el anillo Arena de 2px (`:focus-visible`, contraste 8,4:1 con Carbón). Ya no usa el verde `#25D366`; `--wa` queda definido pero sin uso.
- Visibilidad: en la Home aparece pasado el hero (`body.past-hero`); en la página del proyecto el hero no es una portada y aparece desde el inicio. Sale mientras otro WhatsApp se ve completo en pantalla (`body.wa-covered`): `WhatsAppButton` observa con un `IntersectionObserver` (umbral 0,9) los enlaces con `data-wa-source` que no sean el flotante, el menú móvil ni los del hero, y vuelve en cuanto ese botón sale. Oculto queda `visibility: hidden` (no recibe foco). El contacto rápido nunca queda a más de un scroll.
- Enlace directo `https://wa.me/` con el número de `contact.whatsappNumber` (`NEXT_PUBLIC_WHATSAPP_NUMBER`, fallback `5491136994200`). Sin panel intermedio. `WhatsAppLink` marca cada enlace con `data-wa-source`.
- Es el único control circular del sitio: el icono lo hace reconocible sin depender del verde.

### Footer (`.site-footer`)

- Logo completo en Caliza (`logo-on-dark`) a 120px de alto, la frase «Hacemos edificios / donde nosotros mismos viviríamos.» (`brand.slogan`), navegación, email, WhatsApp, dirección de Ceibo Vidal. El pie ya no lleva la leyenda de renders. Tres columnas iguales (4 / 4 / 4).
- Línea legal en Montserrat 500 11px mayúscula (`0.06em`); “Volver arriba ↑”.

### Cierre (`.cta-band`)

- Fondo Carbón puro (`--bg`), un escalón por debajo del footer (`--bg-alt`): el cierre y el pie ya no se funden. Sin fotografía ni degradados.
- Composición: cota arriba (opcional), título monumental (`clamp(44px, 7.2vw, 112px)`, peso 300, interlínea 1, ancho máximo 9,5em), un espacio de `clamp(48px, 7vw, 96px)` y, debajo, una línea Arena que se traza de izquierda a derecha (1100ms `--ease-in-out`, 200ms de espera) al revelarse. Bajo la línea, la frase a la izquierda (34ch, `--text-soft`) y las acciones a la derecha; sin frase, la acción ocupa todo el pie y cierra contra el final de la línea (`.cta-actions:only-child`). Padding `clamp(88px, 14vw, 200px)` arriba y `clamp(80px, 11vw, 160px)` abajo.
- Acciones: con la prop `whatsapp`, `WhatsAppLink` relleno y `link` en contorno; sin ella, `link` es el único botón. Entra con `RevealLines` (split). Los títulos de más de 28 caracteres (`.cta-band-long`, hoy «¿Hablamos de tu próximo hogar?») bajan a `clamp(32px, 5.6vw, 88px)`, interlínea 1,06, 12em y `text-wrap: balance`: el cierre no compite con el hero.
- Bajo 1024px la frase y las acciones se apilan, alineadas a la izquierda.
- La atmósfera fotográfica (`has-atmosphere`) ya no se usa: queda el soporte en el componente.
- La cota de la Home es “Buenos Aires”.

### Cabecera de página (`.page-header`)

- Alto mínimo `min(56vh, 520px)`, contenido abajo. Trazo arena bajo el h1. Polvo de Caliza al 7 %, no verde bosque. Bajo 760px el mínimo se anula.
- **`aside` opcional (F4, solo ≥ 1024px).** Cota a la derecha del título (`.page-header-aside`: regla Arena de 28px, WhatsApp con icono y email como `text-link`). Hoy solo `/contacto`: deja el dato en la primera pantalla (a 1440×900 queda entre y=368 y 448). Bajo 1024px se oculta porque el canal está justo debajo.

### Intro (`.logo-intro`)

- Solo en la home, una vez por sesión (`sessionStorage` `raices-intro-seen`). Entrar directo a otra ruta no la dispara ni bloquea el scroll.
- Usa **solo el logo oficial completo** (`brand.logos.full`, `raices_logo_completo.png`) en Caliza sobre Carbón (`logo-on-dark`). Un único `<img>`: ni isotipo ni wordmark por separado, ni trazo decorativo. Se precarga en `<head>` (`fetchPriority="high"`).
- Tamaño (+12 % sobre F1, sin deformar: se compararon 1,00, 1,12 y 1,15): desktop `clamp(291px, 42.5vh, 448px)` (383px de alto a 1440×900, 353px de ancho), tablet `clamp(246px, 35.8vh, 358px)`, mobile `min(69.5vw, 40.3svh)` (271px de alto, 250px de ancho a 390). A 1,15 el logo empieza a apretar los bordes en mobile; a 1,00 queda tímido en desktop. Centrado óptico: el bloque sube `4svh` (centro al 49 % de la altura).
- Se puede saltar con click, Enter, Espacio, Escape o el botón “Saltar”. Saltar antes del inicio de la cortina libera el hero a los 200ms y cierra en 600ms. El overlay pasa a `pointer-events: none` en cuanto `data-intro` es `done`, así el header y los links responden mientras la cortina termina.
- No corre con `prefers-reduced-motion: reduce` (el script inline fija `data-intro="seen"`).
- Componente cliente en `app/layout.jsx` (no en `page.jsx`: un ancestro con `transform` rompería el `position: fixed`).

---

---

## F. Motion System

GSAP (`^3.15.0`) se usa únicamente para el corte por líneas de `RevealLines` en modo split (`SplitText`, `autoSplit`, `mask: 'lines'`). Se importa de forma dinámica solo ahí: no está en el bundle inicial (chunks aparte de ~70 KB y ~7 KB), se pide después de la hidratación y no se descarga con `prefers-reduced-motion: reduce`. Todo lo demás es CSS más `ScrollEffects`. No hay Motion/Framer.

| Token | Valor |
| --- | --- |
| `--ease` / `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)`: reveals de bloque, hover largo |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)`: líneas, hero, asentado de imagen |
| `--ease-in-out` | `cubic-bezier(0.76, 0, 0.24, 1)`: cortinas |
| `--ease-std` | `cubic-bezier(0.4, 0, 0.2, 1)`: hover y UI |
| `--dur` / `--dur-fast` | 600ms / 320ms (históricos) |
| `--dur-ui` / `--dur-reveal` / `--dur-image` / `--dur-curtain` / `--dur-page` | 240 / 800 / 950 / 900 / 600ms |
| `--stagger` | 90ms |
| `--rise` | 28px (20px bajo 760px) |

**Intro (M01).** Línea de tiempo en ms, desde que el componente arranca: 0–800 el logo completo se revela de arriba hacia abajo mientras asienta (`introMark`), 800–2500 reposo, 2500–3200 la cortina sube (`introCurtain`, 700ms `--ease-in-out`). A 2700ms `data-intro` pasa a `done` y el hero arranca mientras la cortina aún se levanta. A 3200ms el overlay se desmonta y se guarda `raices-intro-seen` (una vez por sesión, solo en la Home, nunca con reduced motion). Se salta con clic, tecla, rueda o gesto. Constantes en `app/components/LogoIntro.jsx`, espejadas en `cinematic.css`. El script inline de `app/layout.jsx` fija `data-intro` = `playing | seen` antes del primer pintado.

**`RevealLines` (M04).** Componente cliente que revela titulares línea por línea. Cada línea vive en `.rl-line-mask`, que recorta con `clip-path: inset(-.2em -.08em -.22em -.08em)` y `overflow: visible` (no con `overflow`): así no se cortan los acentos de una capital (Í) ni los descendentes (g, p, y) y no hace falta un contenedor flex (SplitText mide líneas sobre hijos en flujo normal). Por eso la línea oculta parte de `translateY(150%)`, no de 105 %. Dos modos:
- *static* (`lines=[…]`): líneas explícitas, sin JS de GSAP. Transición CSS al recibir `.is-visible` (lo marca `ScrollEffects`), o keyframe `rlRise` si lleva `immediate` (hero, `PageHeader`).
- *split* (`text="…"`): SplitText corta por líneas reales y se vuelve a cortar solo si cambia el ancho (`autoSplit`). Oculto con `visibility: hidden` hasta `data-ready`; failsafe de 3,5s; reveal con `expo.out`, 800ms, stagger 90ms, al 20 % de visibilidad. Con reduced motion queda en `data-ready="plain"`, sin GSAP.
Usado en: hero, `PageHeader` (h1), `Manifesto`, `AboutTeaser`, `FeaturedProject`, `CtaBand`, `Philosophy`, `Statement`. `RevealText` (palabra por palabra), `.rt-word` y `.reveal-text` se eliminaron en F4: todo título animado usa `RevealLines`.

**Cortina de imagen (M05).** `.img-curtain` descubre la pieza con `clip-path` (950ms `--ease-in-out`: vertical `inset(100% 0 0 0)` → `inset(0)`; `-left`: `inset(0 100% 0 0)`) mientras la imagen asienta de 1,08 a 1 (1400ms `--ease-out-expo`). Una sola vez. Usada en `AboutTeaser`, el escenario de `FeaturedProject` y las tarjetas de `/proyectos`. Reemplaza a `.mask-reveal`, `.img-reveal` y `.media-shutter`. **No se observa con IntersectionObserver**: Chromium descuenta el clip-path del propio elemento y una cortina cerrada tiene área visible cero, así que nunca se dispararía. `ScrollEffects` la resuelve con `getBoundingClientRect`, pero **sin leer layout en cada scroll** (`createCurtainTracker`): la geometría (`top` absoluto y alto) se mide una vez al montar, al hacer resize, al cargar y con un `ResizeObserver` del body; el handler de scroll, limitado a un frame con `requestAnimationFrame`, solo compara `scrollY`. Dispara con el 15 % visible (tope 25 % del alto de ventana, margen inferior 4 %); al revelarse, la cortina deja de seguirse y, cuando no queda ninguna, se quita el listener. Con reduced motion se revelan de inmediato.

**Galería (M09) y selector (M12).** Ver Componentes. El fundido de la galería usa el mismo easing y tiempos que el capítulo sticky; el panel de tipologías entra en 420ms desde 16px y el subrayado se desliza en 360ms.

**Cierre.** La línea Arena se traza en 1100ms (`--ease-in-out`).

**Capítulo sticky (M07).** Ver Componentes › Capítulo destacado. `FeaturedStage` solo escribe `data-active` cuando cambia de estado; el fundido es CSS.

**Base del hero.** No tiene recorrido propio: en desktop se desvanece con `--hero-out` junto con el contenido; en mobile y tablet queda fija en su lugar.

**Entradas.** `.reveal` y `.reveal-stagger` suben `--rise` y aparecen en 800ms; el stagger es `--stagger` por posición (1 a 5). Las fotos de la galería se descubren con clip-path (1100ms, 0 / 120 / 240ms). `.page-enter` (`app/template.jsx`) funde cada navegación en 600ms desde opacidad 0 y 12px.

**Scroll.** Parallax y fundido del hero con `--hero-progress`. `ScrollEffects` observa `.reveal`, `.reveal-stagger > *` y las líneas *static* con IntersectionObserver, y las cortinas con rect. Sin scroll hijacking.

**Hover.** Imagen de ficha 1.06, galería 1.04, `.img-curtain` 1.03 (una vez revelada), flecha de botón +4px, WhatsApp −2px y escala 1.04.

**Reduced motion.** El script no muestra la intro. CSS aplica `animation: none !important` (cero animaciones activas), transiciones de 0,01ms, deja títulos, imágenes y reveals visibles y no carga GSAP.

**Sin JavaScript.** `@media (scripting: none)` muestra reveals, cortinas, líneas, el hero y los titulares split, y oculta la intro.

---

## G. Imágenes y recursos

- Fotos y renders: WebP en `public/assets/images/`. Planos en `public/assets/plans/`.
- Hero y fachadas a `object-fit: cover`. Galería con alto `clamp(280px, 48vh, 560px)`.
- Overlays: gradiente a Carbón en el hero; velo liviano superior en la lámina de Ceibo; velo inferior `rgba(var(--veil), 0.78)` en la terraza de la Home.
- `body` usa `overflow-x: clip`.
- Video solo si `NEXT_PUBLIC_HERO_VIDEO` apunta a un archivo real en `public/assets/video/`. H.264, sin audio, ideal ≤ 6 MB. No hay video genérico cargado.
- Pipeline: `npm run optimize-images`. Logos PNG no se recomprimen si no achican.
- Oficiales: logos en `public/assets/brand/` y logos de socios en `public/assets/partners/`.
- Placeholders: cualquier render o vista de Ceibo Vidal lleva nota de “referencia” y el pie legal del footer. No presentarlos como fotografía de obra terminada.

---

## H. Buenas prácticas

- **Accesibilidad.** `lang="es"`, skip link, foco visible arena 2px, `aria-current`, labels de formulario, botones con nombre accesible. Contraste AA o superior en los pares de la sección B. El `<html>` lleva `data-scroll-behavior="smooth"` para que Next no avise por el scroll suave.
- **SEO.** Metadata en `app/layout.jsx`, títulos por página, canonical, Open Graph, `app/sitemap.js`, `app/robots.js`. Un h1 por vista.
- **Performance.** Server Components por defecto. Cliente solo en header, intro, formulario, WhatsApp, scroll, lightbox y `RevealLines`. Imágenes WebP. GSAP solo en `RevealLines`, cargado de forma diferida.
- **Responsive.** Probar 1440, 768 y 390. Sin overflow horizontal. El menú móvil reemplaza la fila de links.
- **Export estático.** `output: 'export'` y `trailingSlash`. `NEXT_PUBLIC_BASE_PATH` prefija assets cuando el sitio no está en la raíz.

---

## I. Anti-patterns

- Tema claro de página, cards de SaaS, radios grandes, glassmorphism, neones, gradientes llamativos.
- Iconos decorativos sin función. El círculo verde es solo WhatsApp.
- Una tercera familia además de M PLUS U y Montserrat. Itálica sintética en M PLUS U. Peso black en titulares. Tracking de labels por encima de 0.14em.
- Preloader falso, intro en cada ruta, GSAP fuera de `RevealLines`, scroll que secuestra la rueda.
- Inventar desarrollos, amenities o años que no estén en `app/content/`.
- Redibujar o recolorear los PNG de marca. Sobre Carbón, `logo-on-dark` lleva el trazo a Caliza con un filtro CSS; no se sustituye el archivo.
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
| Mask Reveal (balick) | 39591 | Solo ficha. `clip-path` desde abajo, 1100ms, en la terraza de la Home y en la galería. El velo de la intro usa el mismo gesto, de abajo hacia arriba. | No se instaló. Sin zoom de settle ni Framer Motion. |
| Featured Project Hero (ibrandify) | 37282 | Solo ficha. Confirmó la lectura de lámina: fachada limpia + ficha editorial, no overlay. | No se instaló. Sin navbar extra ni Framer Motion. |
| Reveal Image Mask | 10905 | Solo ficha. Confirmó el asentamiento de escala del hero cuando se levanta el velo. | No se instaló. Sin scroll-driven Framer Motion. |
| Vertical Cut Reveal (cnippet-dev) | 18595 | Solo ficha. El titular del hero sube línea por línea desde una máscara (`RevealLines`, `rlRise`). | No es por carácter. No se instaló. |
| lumina-interactive-list | 9952 | Solo ficha. Los índices `01`–`03` de la navegación. | No hay lista que cambie de foto: hay un solo proyecto. |
| Soft Blur In | 19835 | Solo ficha. Descartado: el blur por letra ablanda el titular editorial. | — |
| Editorial service list | 37530 | Solo ficha. Los principios ya tenían número y regla. | — |
| Sterling Gate: Kinetic Navigation | 10003 | Solo ficha. Descartado: menú a pantalla para cuatro destinos. | — |

Otras fichas vistas y no implementadas: Cinematic landing Hero (11494), Cinematic Product Scroll (17441), Immersive Scroll Gallery (2025), ImgText Reveal (25481), Hero Shutter Text (9989), Real Estate Search Hero, Hero Scrub, Cinematic Orbit Hero (daiwiikharihar), Black Metal Logo Preloader (34917), Cinema Grain Preloader (28824), Horizontal Scroll Gallery (20139), 3D Parallax Unfurling Gallery (20039).

---

## K. Registro de decisiones

1. **Se trabajó sobre el sitio existente** (Next.js, App Router, export estático), no sobre un proyecto nuevo. Puntos de recuperación: `backup/pre-premium-pass` en `d658f12` y `backup/pre-art-direction-2026-10-25` en `95ed0a2`.
2. **Titulares en M PLUS U** (revisado en F0; antes Fraunces, ver decisión 23). Montserrat sigue en navegación, botones, párrafos y en el wordmark.
3. **Fondo Carbón `#101210`, texto Caliza `#D1C7BA`.** El negro más profundo `#0A0D0B` y el marfil `#EAE8DF` se abandonaron: alejaban la web del lockup oficial. El tinta de carpeta sigue como token de marca.
4. **Acento arena, no bronce.** `--bronze` (`#A58E68`) está declarado y no pinta componentes. El acento real es `--arena` (`#C4A97D`), que además cumple AAA sobre `--bg`.
5. **Header sólido.** Se quitó el `backdrop-filter`. El vidrio no aporta y contradice la dirección.
6. **Persiana solo en Ceibo Vidal de la home.** Es el momento que el brief pedía más cuidado. El resto entra con el reveal de 18px para no repetir el efecto.
7. **Sin video de hero.** No hay un archivo de calidad en el repo. La imagen de balcones lleva deriva lenta. El video se activa con variable de entorno, no con stock.
8. **Favicon desde el isotipo oficial.** `raices_logo_icono.png` se escala, sin redibujar, en Caliza sobre Carbón y ocupa ~78 % del cuadrado. No hay SVG de origen. Ver la sección siguiente.
9. **Formulario.** Sigue exigiendo endpoint real. Documentado como pendiente de entorno si `NEXT_PUBLIC_FORM_ENDPOINT` está vacío.
10. **La Home institucional no puede ser solo texto.** La terraza de referencia ocupa la columna derecha. Sigue marcada como imagen de referencia.
11. **Ceibo Vidal abre a pantalla completa.** El hero partido dejaba la fachada en una columna y se leía como ficha, no como proyecto.
12. **El dato de unidades va en una segunda línea** (`.fact-sub`), con los textos ya verificados: “PB + 4 pisos” y “12 unidades”.
13. **No se instaló código de 21st.dev.** La cuota diaria de recuperación estaba en 0/2. Las máscaras, la persiana, el velo de la intro y el corte del titular se escribieron en CSS a partir de las fichas.
14. **Ceibo Vidal en la Home es una lámina partida.** El overlay al 82 % escondía el render y se leía como ficha oscura. La fachada queda limpia; el texto es una columna editorial. En mobile se apila, con recorte bajo para mostrar el acceso.
15. **El velo de la intro se levanta, no se desliza.** `clip-path` deja ver la arquitectura y el medio del hero asienta de 1.12 a 1.
16. **El hero deja ver más edificio.** El velo del centro bajó y el grano pasó de 18 % a 12 %. No se repite el isotipo: alcanza la intro y el header.
17. **Placas a radio 0.** El formulario, las fichas técnicas, tipologías y láminas dejaron el radio de 8px. El único círculo sigue siendo WhatsApp.
18. **El CTA de la Home lleva atmósfera fotográfica.** `terraza-verde.webp` al 34 %. En páginas internas el cierre queda tipográfico, sin repetir la foto.
19. **Referencias de dirección.** MERSI Architecture (Awwwards SOTD, FLOT NOIR): lujo silencioso, ritmo editorial, imágenes que mandan. No se copió la navegación horizontal ni la identidad.
20. **El `clip-path` de `.mask-reveal` recorta la imagen, no la caja.** Un clip a 0 px hacía que IntersectionObserver no viera la terraza de la Home.
21. **Logos sobre oscuro en Caliza.** `logo-on-dark` ya no invierte a blanco puro. El PNG oficial no se toca.
22. **No se instaló código de 21st.dev en esta pasada.** La cuota libre quedó en 1/2. Se leyeron fichas y se adaptó el criterio a CSS propio.
23. **F0: M PLUS U reemplaza a Fraunces** (plan `WEBSITE_REDESIGN_PLAN.md` rev. 2). Sin itálicas: el énfasis es peso y color. Se recalibraron los anchos en `ch` porque M PLUS U es más ancha.
24. **F1: motion base consolidado.** Tokens `--ease-*`, `--dur-*`, `--stagger`, `--rise`. GSAP restringido a `RevealLines`. Intro con el logo completo oficial únicamente; el hero arranca a 1350ms, 400ms antes de que termine la cortina. `.mask-reveal`, `.img-reveal`, `.media-shutter` y el Ken Burns se retiraron a favor de `.img-curtain` y `heroMediaSettle`.
25. **Las cortinas de imagen no usan IntersectionObserver** (supera la decisión 20): Chromium descuenta el clip-path propio. Se resuelven por rect en el scroll.
26. **`RevealLines` recorta con clip-path extendido, no con overflow ni flex.** SplitText mide líneas sobre hijos en flujo normal; un contenedor flex rompía cada palabra en su propia línea.
27. **F2: tarjeta de contacto en el hero desde 1024px (antes 1100; F4).** El botón flotante no alcanza en desktop: la consulta por WhatsApp está en la primera pantalla. Entre 760 y 1023px el h1 chocaría con la tarjeta, así que queda el botón inline. Siempre hay un solo botón relleno visible.
28. **F2: 280vh para el capítulo sticky.** Medido: 180vh y 220vh dejan 265 y 385px por estado a 1440×900 (217 y 313 a 1280×720). 280vh da 565 y 457px. No hay sticky bajo 1024px ni con menos de 641px de alto: scroll nativo.
29. **F2: manifiesto como pausa tipográfica.** Reutiliza `cta.title` y `about.lead`; la Filosofía de la Home abandona `lead`, cita y cota para dejar que mande la imagen. No se escribió texto nuevo.
30. **F2: solo imágenes del proyecto.** El capítulo destacado usa las tres primeras de `project.gallery.items`. Ninguna imagen de referencia externa (Azimute, Loam House) entra al sitio: se tomó el criterio de composición, no el material.
31. **F2: el cierre de la Home sin atmósfera fotográfica** (revierte la 18). La terraza ya se usa dos veces; el cierre es tipográfico con WhatsApp y proyectos.
32. **F2: header con velo y blur en `::before`.** Un `backdrop-filter` en el header rompería el menú móvil fijo.
33. **F2: intro con el logo +12 %.** Entre 1,00, 1,12 y 1,15 gana 1,12: 1,15 aprieta mobile y 1,00 queda corto en desktop.

34. **F2 · ajuste A: captions por estado en la ficha.** Se movieron del escenario a la ficha, con máscara vertical, y solo usan textos ya aprobados. El escenario conserva solo la nota de render.
35. **F2 · ajuste B: foto del capítulo más baja en mobile** (1 / 1,1, máx. 56svh) y ficha pegada a ella; la fachada se sigue viendo completa.
36. **F2 · ajuste C: cierre tipográfico sobre Carbón puro**, con línea que se traza y frase y acciones en dos columnas. Revierte la composición de F2 (todo a la izquierda sobre `--bg-alt`).
37. **F2 · ajuste D: WhatsApp flotante Carbón/Caliza** con retirada automática mientras otro WhatsApp se ve en pantalla. El verde `#25D366` deja de usarse en el flotante.
38. **F3: hero de proyecto en dos paneles** (plan 5.2.1), con una sola acción rellena. El logo y los renders oficiales no se tocan.
39. **F3: la banda fotográfica usa `balcones-tensores.webp`**, no `presentacion-ceibo.webp` (afiche vertical con logo incrustado, no sirve a sangre).
40. **F3: la fachada vertical en la galería se muestra entera** sobre su copia desenfocada, no recortada.
41. **F3: láminas Lino a radio 0**, coherente con la decisión 17 (el plan sugería 8px).
42. **F3: sin dependencias nuevas.** Selector, galería, banda, subrayado y diagrama son React y CSS; GSAP sigue solo dentro de `RevealLines`.
43. **F3: la limpieza del CSS heredado (`.hero*`, `.gallery-strip`, `.typology-card`…) queda para F4**, como indica el plan; hoy no hay JSX que lo use.
44. **Branding: «Espacios para echar raíces» eliminado.** El slogan vigente es «Espacios para habitar» (`brand.slogan`, solo en el footer y como cota de Filosofía). `brand.claim` ya no existe. El cierre de la Home usa `homeContent.cta.title` («Construimos espacios donde da placer vivir.»). El H1 del hero sigue siendo «Hacemos edificios donde nosotros mismos viviríamos.». **Prohibido** reintroducir el slogan descartado.
45. **Branding: sin título «Ceibo Vidal» bajo el logo de CEIBO.** Composición única `ProjectMark`: logo oficial (sin tocar) → «Vidal 3849» (Montserrat chica, espaciada) → línea comercial oficial cuando corresponde. Se usa en el capítulo destacado de la Home y en el hero de `/proyectos/ceibo-vidal`. La tarjeta del portfolio muestra el nombre como texto porque no lleva el logo debajo ni arriba. Si se agrega el logo a una tarjeta, hay que usar `ProjectMark`, no sumar un título.
46. **F3b: ritmo vertical mobile (< 760px).** Entre Galería, Aire libre, Tipologías, Ubicación y Contacto se recortaron solo los espacios muertos: `.gallery-section` padding-bottom 32px, `.green-section` 48px arriba y abajo, `.plans-section` padding-bottom 44px, `.location-section` padding-top 52px (resto sin cambios; fotos y tipografía intactas). El resto de secciones conserva `clamp(72px, 9vw, 120px)`.
47. **F3b: galería desktop sin cambios.** Las horizontales ya ocupan ~951px de un escenario de 9fr (≈ 66% del viewport a 1440) con la fachada vertical completa; ensancharlas obligaría a recortar la fachada o a achicar los controles y no hay una mejora clara. Se conserva la implementación.
48. **F3b: `hero.kicker` eliminado** de `ceibo-vidal.ts`. El hero de proyecto no muestra «Ceibo Vidal · Saavedra»: solo `ProjectMark` («Vidal 3849»). No volver a agregar un kicker con el nombre.
49. **F4: consolidación de CSS y breakpoints.** Se eliminaron `RevealText`, `.rt-word`, el `.hero` legado (`.hero-media`, `.hero-image`, `.hero-scrim`, `.hero-content`, `.hero-logo`, `.hero-foot`), `.gallery-strip`/`.gallery-item`/`.gallery-trigger`, `.typology-card` y compañía, `.project-layout`/`.project-figure`, `.featured-summary`, `.featured-hover-meta`, `.field-optional` y `.whatsapp-float-label` (reglas muertas: ninguna clase existe en el JSX; verificado con postcss). Los cortes 1100 / 980 / 899 pasaron a 1023, 760 a 759 y 520 a 420. La tarjeta de contacto del hero arranca ahora en 1024px (antes 1100): sin choque con el H1 a 1024, 1050 y 1100.
50. **F4: portfolio.** El título de la tarjeta usa `RevealLines` (`.project-card-title`). Se mantiene el nombre como texto porque la tarjeta no lleva el logo (regla de marca, decisión 45).
51. **F4: `/contacto` con cota en la cabecera** (`PageHeader aside`). El flotante de WhatsApp sigue la regla `wa-covered`: se oculta cuando otro CTA de WhatsApp está visible.
52. **F4: las superficies de las tipologías NO cambiaron.** La decisión comercial sobre 82 / 37 / 54 m² contra 79,75 / 39,06 / 56,18 m² sigue pendiente (ver `docs/CONTENT_REVIEW.md`).
53. **F5: GSAP solo al entrar en vista.** `RevealLines` en modo `split` no importa `gsap` hasta que el título cruza el `IntersectionObserver` (o de inmediato si `immediate`). El H1 del hero sigue en modo `static` y no pide GSAP. Con `prefers-reduced-motion` no se importa.
54. **F5: la primera imagen del capítulo destacado va en `loading="lazy"`.** `eager` la precargaba en el HTML de la Home y, por el prefetch de Next, Chromium avisaba «preloaded but not used» en las demás páginas y bajaba esa imagen (107 KB) antes del LCP. El capítulo queda bajo el hero: lazy no cambia lo que se ve al llegar.
55. **F5: contraste sobre Lino.** `--niebla` (`#6e6f68`) da 4,34:1 sobre `#F0EDE6` y no pasa AA en labels de 11 px. El texto de las fichas de tipología usa `--niebla-ink` (`#65665f`, 4,96:1). `--niebla` sigue para trazos y notas que no son texto.
56. **F5: accesibilidad puntual, sin rediseño.** El panel de tipología es un `div role="tabpanel"` (un `article` no admite ese rol). El manifiesto no lleva `aria-labelledby` porque su título repite el del cierre. El WhatsApp flotante vive en un `aside` con nombre. En mobile, `.text-link` y los enlaces del footer tienen `min-height: 28px`. El `select` de Motivo usa la misma línea inferior que el resto del formulario. `RevealLines` en modo split publica `aria-label` con el texto oficial, porque SplitText puede vaciar el nombre accesible mientras anima.
57. **F5: el WhatsApp del footer usa `whatsappHref()`.** Antes era `https://wa.me/<número>` sin mensaje. El resto de los CTA ya llevaba el texto oficial.
58. **F5: laboratorio, no usuarios reales.** Medido con Chromium, CPU ×4 y red ~1,6 Mbps / 150 ms de latencia (Slow 4G de laboratorio), mediana de 3 corridas, intro salteada. CLS 0 en las 5 rutas. En mobile el LCP de la Home es la foto del hero (~5 s, 285 KB, prioridad alta) y el de Ceibo es la fachada (~2,4 s). No hay datos de campo (INP, CrUX). No se desactivó el prefetch de Next.
59. **Refinamiento final: el hero se compone, no se tapa.** El título dejó de flotar sobre la losa clara. El edificio va arriba y el texto se apoya en la vereda, con la foto fundiéndose en Carbón. Sin placa detrás del título. Tres líneas en mobile y tablet, dos en desktop. `--fs-hero` bajó (80,6 → 64,8px a 1440; 36 → 34,3px a 390) y en desktop depende también del alto (`7.6vh`) para no invadir la fachada en notebooks bajas.
60. **Refinamiento final: la tarjeta de contacto del hero se eliminó** (`HeroContactCard`, `.hero-card`, `.cine-hero-foot`). La reemplaza `HeroBase`: una línea de tierra con la nota del render y WhatsApp + Email como accesos livianos, en todos los cortes. Mismos destinos, cero pasos nuevos. No volver a una tarjeta con fondo en el hero.
61. **Refinamiento final: el hero no se desvanece al scrollear en mobile ni tablet.** Ahí el contenido se sigue leyendo mientras sube; el fundido y el `inert` quedan solo desde 1024px.
62. **Refinamiento final: escala tipográfica propia de mobile** (tokens bajo 759px, ver Tipografía). «Declaración» y el hero de proyecto siguen al token. El cierre largo baja un paso.
63. **Refinamiento final: `ProjectMark` no hereda el `max-width` de los títulos.** La dirección de la Home («Vidal 3849 · Saavedra, Buenos Aires») se partía en tres líneas dentro de una caja de 185px. Ahora va en una línea; en mobile, 11px con `letter-spacing: .18em` y `text-wrap: balance`.
64. **Refinamiento final: la banda fotográfica de Ceibo pedía un archivo inexistente** (`imagen_fachada_cerca_v0-800.webp`; el derivado real es `-828`). En mobile se veía el texto alternativo en lugar de la foto. `facadeClose` declara su `srcSet`.
65. **Refinamiento final: los slides del carrusel no superan el ancho útil** (`max-width: calc(100vw - var(--gutter) * 2 - 24px)`, alto mínimo 320px): en mobile una imagen apaisada se recorta apenas a los lados en vez de salirse de la pantalla.
66. **Refinamiento final: la intro no se tocó.** Dura 3,2 s con 1,7 s de reposo. Es larga para una primera lectura, pero es una decisión de marca posterior a F1 (antes 1,75 s) y se muestra una vez por sesión. Si se quiere acortar, alcanza con `HOLD_MS` en `LogoIntro.jsx` y el delay de `introCurtain` en `cinematic.css`.

- **Marca de proyecto (`ProjectMark.jsx`).** Debajo del logo oficial de CEIBO va únicamente «Vidal 3849» (Montserrat 12px/500, mayúscula, `letter-spacing: .32em`, `--text-soft`, 22px bajo el logo) y, cuando corresponde, la línea comercial oficial `project.commercialLine` («El balance perfecto entre ciudad y aire libre», M PLUS U 300 `clamp(18px,1.5vw,22px)`, 28px bajo la dirección). El nombre «Ceibo Vidal» NO se repite como título visible bajo el logo: vive en el `alt` del logo (que es el nombre accesible del encabezado), en SEO, navegación y textos corridos.

---

## Favicon e identidad digital

El favicon es el isotipo de Raíces Developers, no el de Ceibo Vidal.

**Original.** `public/assets/brand/raices_logo_icono.png`. PNG de paleta, 749×893, trazo negro (`#000000`) sobre transparencia. No es vectorial: no hay `favicon.svg`.

**Generados** por `scripts/optimize-images.mjs` (`npm run optimize-images -- --favicons-only`). El script no redibuja la forma. Toma el alfa del PNG y lo pinta en Caliza `#D1C7BA` sobre Carbón `#101210`. El símbolo ocupa ~78 % del lado (`MARK_PADDING` 0,11) y queda centrado. A 16 y 32 px el trazo se cuantiza a tinta sólida porque el original mide ~18 px sobre 893.

| Archivo | Tamaño | Notas |
| --- | --- | --- |
| `public/favicon.ico` | 16, 32 y 48 | PNG embebidos. `metadata.icons` lo pide con `?v=6`. |
| `public/favicon-32x32.png` | 32×32 | Misma placa. |
| `public/icon-192.png` | 192×192 | Misma placa. |
| `public/icon-512.png` | 512×512 | Misma placa. |
| `public/apple-touch-icon.png` | 180×180 | Misma placa. |

**Configuración.** `metadata.icons` en `app/layout.jsx` apunta a esos archivos, con `BASE` para respetar `basePath`. No hay manifest ni `favicon.svg`. El layout raíz cubre Home, Proyectos, Ceibo Vidal, Nosotros y Contacto. No hay `app/favicon.ico` ni iconos de Vercel, Next.js u otra plantilla.

**Reglas**

- Regenerar desde el isotipo oficial. No sustituir por el logo de Ceibo ni por un icono de plantilla. No redibujar la geometría: solo escala y margen.
- Caliza sobre Carbón en todos los tamaños. No usar invert puro a blanco.
- Open Graph sigue aparte: `public/assets/brand/og-image.png`, logo completo en blanco sobre `#21201E`.

## Actualización: refinamiento del hero, botones y favicon

- **Hero (Home):** sustituido por el refinamiento final (ver «Hero (`.cine-hero`)» y decisiones 59–61): sin tarjeta, sin indicador Scroll ni isotipo inferior; contacto en `HeroBase`.
- **Navbar:** logo 41 px (38 px con scroll, 32 px bajo 420 px); enlaces a `rgba(231,224,213,.94)` con velo superior en la Home sin scroll.
- **Botones:** primario `.button-fill` (caliza/carbón), secundario `.button` (contorno `--line-strong`, también `.button-download` con `DownloadIcon`), terciario `.text-link.text-link-arrow` (flecha y subrayado animado en hover/foco, 44 px de alto táctil).
- **Favicon:** isotipo sin fondo en SVG (`public/icon-dark.svg` para pestañas claras, `public/icon-light.svg` para oscuras), trazo reforzado para 16/32 px; PNG/ICO en caliza transparente y `apple-touch-icon`/`icon-192/512` en caliza sobre Carbón. Versiones de marca: `public/assets/brand/raices_isotipo_negro.svg` y `raices_isotipo_caliza.svg`.
- **Brochure:** `public/downloads/Ceibo-Vidal-Brochure.pdf`, copia optimizada de `docs/commercial/`; configurado en `ceiboVidalContent.brochure`.

## Actualización: galería editorial de Ceibo Vidal en la Home

`FeaturedProject` ya no es un capítulo con sticky: muestra logo, «Saavedra · Buenos Aires», la línea vigente del proyecto y «Explorar proyecto →», y debajo `ProjectCarousel` (scroll nativo con `scroll-snap`, flechas con animación de 560 ms, contador `01 / 05`, sin autoplay ni loop, instantáneo con `prefers-reduced-motion`). Las imágenes salen de `ceiboVidalContent.homeGallery` (`order`, `title`, `src`, `alt`); cada slide comparte altura (`--pc-h`) y conserva su proporción. Hoy, en este orden: `imagen_fachada_perfil_v1`, `imagen_sum_v0`, `imagen_terraza_noche_v0`, `imagen_hall_v0` e `imagen_fachada_zoom_v0`.
