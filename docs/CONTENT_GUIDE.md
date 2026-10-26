# Guía de contenido — Raíces Developers

Los textos de la web viven en `app/content/`, separados de los componentes visuales.
Para cambiar un título, un párrafo, un botón o un dato de Ceibo Vidal, editá el archivo de contenido que corresponda. No hace falta tocar React.

Si falta un dato, dejá un `TODO:` en el archivo de contenido. No inventes proyectos, años, superficies, precios ni historia.

---

## 1. Dónde están los textos

| Archivo | Qué contiene |
| --- | --- |
| `app/content/home.ts` | Home: hero, presentación de Raíces, proyecto destacado y atmósfera del cierre. |
| `app/content/about.ts` | Nosotros: cabecera, filosofía e identidad. |
| `app/content/projects.ts` | Portfolio: cabecera de `/proyectos`, textos de las tarjetas y el registro de desarrollos. |
| `app/content/ceibo-vidal.ts` | Todo Ceibo Vidal: ficha, arquitectura, amenities, galería, verde, tipologías, ubicación, SEO y CTAs. |
| `app/content/contact.ts` | Contacto: canales, formulario, mensajes de error/éxito y SEO de `/contacto`. |
| `app/content/shared.ts` | Marca, rutas, menú, footer, etiquetas comunes, CTA compartido, 404 y socios. |
| `app/content/index.ts` | Reexporta todo. Sirve para imports puntuales, no para editar textos. |
| `app/content/site.js` | Compatibilidad. Preferí los archivos de arriba. |

Los nombres de las propiedades describen la sección (`hero.titleQuiet`, `contactContent.form.submit`, `architecture.amenities`). No hay `text1` ni `title2`.

---

## 2. Cómo modificar la página principal

Abrí `app/content/home.ts`.

Ejemplos reales:

- Título del hero: `homeContent.hero.titleQuiet` y `homeContent.hero.titleEmphasis` (las dos líneas del titular).
- Bajada: `homeContent.hero.lead`.
- Botones: `homeContent.hero.primaryCta` y `homeContent.hero.secondaryCta`.
- Tres principios: `homeContent.about.principles`.
- Texto del proyecto destacado (el nombre, la ubicación y el resumen salen de Ceibo Vidal): `homeContent.featured`.

El cierre de la Home está en `homeContent.cta`. El de las páginas interiores está en `app/content/shared.ts`, dentro de `ui.cta`. La voz y las fuentes oficiales están en `docs/CONTENT_STRATEGY.md`. Las cifras en conflicto, en `docs/CONTENT_REVIEW.md`.

```ts
export const homeContent = {
  hero: {
    kicker: 'Desarrolladora inmobiliaria · Buenos Aires',
    titleQuiet: 'Hacemos edificios',
    titleEmphasis: 'donde nosotros mismos viviríamos.',
    lead: 'Creemos que un edificio debe estar pensado primero para quien lo va a habitar —y después para quien lo va a vender—.',
    primaryCta: { label: 'Explorar proyectos', href: routes.projects },
  },
  // ...
} as const;
```

---

## 3. Cómo modificar Ceibo Vidal

Abrí `app/content/ceibo-vidal.ts`. Ahí está toda la ficha, sin mezclarla con el contenido institucional de Raíces.

| Qué cambiar | Dónde |
| --- | --- |
| Nombre, código, estado, dirección | `name`, `code`, `status`, `address`, `neighborhood`, `city` |
| Titular y resumen del hero | `headline`, `summary` |
| SEO (title y description) | `seo` |
| Síntesis (los tres datos bajo el hero) | `intro.items` |
| Texto de arquitectura | `architecture.title`, `architecture.paragraphs` |
| Ficha técnica | `architecture.specs` |
| Amenities | `architecture.amenities` |
| Galería (imagen, pie y nota) | `gallery.items` |
| Verde edilicio | `green` |
| Tipologías y m² | `typologies.units` (los m² se copian tal cual de los planos) |
| Ubicación | `location` |
| Botones del hero | `hero.primaryCta`, `hero.secondaryCta` |
| Bloque de consultas | `contact` |

```ts
export const ceiboVidalContent = {
  slug: 'ceibo-vidal',
  name: 'Ceibo Vidal',
  address: 'Vidal 3849',
  neighborhood: 'Saavedra',
  city: 'CABA',
  headline: 'Un equilibrio entre ciudad y aire libre.',
  deliveryYear: '2029',
  // ...
} as const;
```

Los metros cuadrados, la entrega y los amenities no se redondean ni se “completan”. Si un dato no está confirmado, no se publica.

---

## 4. Cómo agregar un nuevo proyecto inmobiliario

1. Copiá `app/content/ceibo-vidal.ts` a un archivo nuevo, por ejemplo `app/content/jacaranda.ts`.
2. Cambiá el `slug` (la URL será `/proyectos/<slug>`), el nombre y todos los campos con información real del desarrollo.
3. Registralo en `app/content/projects.ts`:

```ts
import { ceiboVidalContent } from './ceibo-vidal';
import { jacarandaContent } from './jacaranda';

export const projectBySlug = {
  'ceibo-vidal': ceiboVidalContent,
  jacaranda: jacarandaContent,
} as const;
```

4. Agregá la ruta de anclas viejas en `legacyHashRoutes` de `shared.ts` solo si hace falta.
5. No inventes el proyecto si todavía no está confirmado. El portfolio (`/proyectos`) y `/proyectos/[slug]` se generan solos a partir del registro.

La Home destaca el primer proyecto de esa lista (`featuredProject`). Si el nuevo desarrollo debe ser el destacado, ponelo primero o cambiá el orden de `projectBySlug`.

Si el nuevo proyecto todavía no tiene tipologías o galería, esas secciones se pueden omitir: la página del proyecto solo renderiza las partes que existan en el archivo de contenido.

---

## 5. Cómo agregar una nueva sección de contenido

1. Sumá el bloque al archivo de la página o del proyecto, con un nombre semántico:

```ts
export const aboutContent = {
  // ...
  workshop: {
    kicker: 'Oficio',
    title: '…',
    lead: '…',
  },
} as const;
```

2. En la página o el componente, leé esas propiedades. No escribas el texto otra vez en el JSX.
3. Si la sección se repite en varias páginas (como el CTA final), agregala en `shared.ts` (`ui`) para no duplicarla.

---

## 6. Qué va en contenido y qué se queda en los componentes

**Centralizar (editable acá):**

- Títulos, bajadas, párrafos, citas y kickers.
- Botones, navegación, footer y 404.
- Placeholders, validaciones y estados del formulario.
- Alt text de imágenes, pies de foto y notas (“Render de referencia”).
- Metadatos SEO (title, description, Open Graph).
- Datos de proyecto: dirección, programa, entrega, amenities, tipologías.
- Labels de accesibilidad visibles o leídos por lector de pantalla (“Abrir menú”, “Consultar por WhatsApp”).

**Dejar en los componentes (no es copy):**

- Clases CSS / nombres de animación.
- IDs de sección (`#tipologias`, `#verde`) que anclan la navegación.
- Nombres internos de campos del formulario (`nombre`, `email`, `mensaje`) que viajan al worker.
- Tiempos de la intro, claves de `sessionStorage`, patrones técnicos.
- Flechas decorativas (`→`, `←`) y numeración `01`, `02`.
- El año del footer: se calcula solo (`new Date().getFullYear()`).

---

## 7. Qué cambios requieren un nuevo deploy en Vercel

La web es estática. Cualquier cambio en `app/content/` entra en el HTML en el próximo build.

- **Sí, hay que deployar** (o esperar el deploy automático del push): textos, datos, imágenes nuevas, SEO, destinos de botones.
- **No alcanza con guardar el archivo en la computadora**: el sitio publicado no se actualiza hasta el build.
- **Variables de entorno** (`NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_FORM_ENDPOINT`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_HERO_VIDEO`) se resuelven en el build. Si las cambiás en Vercel, hace falta un redeploy.

Para revisar en local:

```bash
npm run dev        # http://localhost:3000
npm run build      # export estático en out/
```

---

## Referencia rápida

| Quiero cambiar… | Archivo |
| --- | --- |
| Mensaje principal del hero | `home.ts` → `hero` |
| Slogan secundario del footer | `shared.ts` → `brand.claim` |
| Filosofía de Nosotros | `about.ts` |
| “Nuestros desarrollos.” | `projects.ts` → `header.title` |
| Superficies del monoambiente | `ceibo-vidal.ts` → `typologies.units` |
| WhatsApp o email | `contact.ts` → `contact` |
| Ítems del menú | `shared.ts` → `navItems` |
| Cierre de la Home | `home.ts` → `cta` |
| Cierre de páginas interiores | `shared.ts` → `ui.cta` |
| Mensaje de “página no encontrada” | `shared.ts` → `ui.notFound` |
