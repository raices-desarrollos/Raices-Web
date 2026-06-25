# Raíces Desarrolladores — Sitio web

## Qué es Raíces

Raíces Desarrolladores es una empresa de desarrollo inmobiliario radicada en Buenos Aires. Creamos edificios que no se sienten como piezas repetidas del mercado: cada proyecto toma el nombre de un árbol autóctono y busca dejar algo vivo en su entorno.

La filosofía central es simple: **expandir naturaleza a través de la ciudad**. El verde no aparece como decoración de última hora; entra en la decisión de fachada, balcones, terraza, riego, mantenimiento e identidad de cada obra.

## Filosofía

Raíces trabaja con la metáfora de las raíces que se extienden y los árboles que crecen allí donde la desarrolladora interviene. Eso define tres compromisos:

1. **Naturaleza urbana con criterio.** Las plantas se diseñan con tensores, drenajes y riego automatizado desde el inicio del proyecto, no como agregado posterior.
2. **Identidad propia.** Cada edificio tiene nombre de árbol autóctono (Ceibo, Jacarandá, Ombú…) y una marca reconocible que se construye proyecto a proyecto.
3. **Rentabilidad con propósito.** Si invertir en verde reduce margen, sigue siendo parte del camino correcto. La meta es crear una desarrolladora con criterio propio y futuro, no optimizar una sola operación.

## Para qué existe este sitio

Este sitio web es el punto de contacto público de Raíces. Cumple tres funciones:

- **Presentar la marca y su filosofía** a potenciales compradores, inversores y socios que todavía no nos conocen.
- **Mostrar el primer proyecto, Ceibo Vidal** (Vidal 3849, CABA): fachada, tipologías, superficies y el sistema de verde edilicio que lo define.
- **Generar consultas directas** vía WhatsApp o email, sin intermediarios.

La web está hecha para durar y escalar: cuando llegue el segundo proyecto (Jacarandá, Ombú u otro), el sistema visual y la estructura del sitio deben poder incorporarlo sin romper la identidad que ya se construyó.

## Stack técnico

- **Next.js 14** (App Router)
- **React** — componentes funcionales, sin librería de UI externa
- **CSS puro** — sistema de diseño propio definido en `DESIGN_SYSTEM.md`
- **Google Fonts** — Noto Serif JP (display) + Inter (interfaz)

## Estructura del proyecto

```
app/
  layout.jsx          — Metadata, fuentes y estructura HTML raíz
  page.jsx            — Entry point del sitio
  globals.css         — Sistema de diseño completo en CSS
  components/
    LandingPage.jsx   — Toda la landing: hero, filosofía, proyecto, tipologías, verde, contacto

public/
  assets/
    images/           — Imágenes del proyecto (fachada, terrazas, balcones, logo)
    plans/            — Planos de tipologías

assets/
  images/             — Originales de imágenes (fuente local, no servidas directamente)
  plans/              — Originales de planos

DESIGN_SYSTEM.md      — Identidad visual: paleta, tipografía, tono y componentes
```

## Primer proyecto: Ceibo Vidal

| Tipología    | Total    |
| ------------ | -------- |
| Monoambiente | 39,06 m² |
| 2 ambientes  | 56,18 m² |
| 3 ambientes  | 79,75 m² |

Planta baja + 4 pisos. Tres tipologías por nivel, todas con balcón. Terraza verde con jacuzzi en el remate del edificio.

## Contacto

- **Email:** contacto@raicesdesarrolladores.com.ar
- **WhatsApp:** disponible en el sitio
