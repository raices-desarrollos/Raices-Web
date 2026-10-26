import { asset, brand, routes } from './shared';

/**
 * Medios del hero institucional. Sin video final, se usa una imagen de referencia con
 * movimiento de cámara simulado. Para activar el video definitivo: copiarlo a
 * `public/assets/video/` y definir NEXT_PUBLIC_HERO_VIDEO=/assets/video/<archivo>.mp4
 * (H.264, sin audio, ideal ≤ 6 MB). El poster sigue siendo la imagen de abajo.
 */
const heroImage = {
  src: asset('/assets/images/balcones-tensores.webp'),
  width: 1536,
  height: 1024,
  alt: '',
} as const;

const atmosphereImage = {
  src: asset('/assets/images/terraza-verde.webp'),
  width: 1536,
  height: 1024,
  alt: 'Terraza con jacuzzi, canteros con vegetación densa, árboles y reposeras, con la ciudad de fondo',
  note: 'Imagen de referencia',
} as const;

export const homeContent = {
  hero: {
    kicker: 'Desarrolladora inmobiliaria · Buenos Aires',
    title: 'Espacios para echar raíces.',
    titleQuiet: 'Espacios para',
    titleEmphasis: 'echar raíces.',
    lead: 'Desarrollamos espacios que integran arquitectura, diseño y nuevas formas de habitar.',
    primaryCta: { label: 'Explorar proyectos', href: routes.projects },
    secondaryCta: { label: 'Contactanos', href: routes.contact },
    cota: `${brand.name} · ${brand.city}`,
    media: {
      video: process.env.NEXT_PUBLIC_HERO_VIDEO ? asset(process.env.NEXT_PUBLIC_HERO_VIDEO) : '',
      image: heroImage,
      note: 'Imagen de referencia',
    },
  },
  about: {
    kicker: 'Raíces Developers',
    title: 'Arquitectura que deja huella.',
    titleQuiet: 'Arquitectura que',
    titleEmphasis: 'deja huella.',
    lead: 'Raíces nace para desarrollar edificios que no se sientan como piezas repetidas del mercado. Cada proyecto toma el nombre de un árbol autóctono y busca dejar algo vivo en su entorno.',
    principles: [
      {
        label: 'Naturaleza integrada',
        text: 'El verde entra en la decisión de fachada, balcones, terraza, riego y mantenimiento. No es decoración: es parte del proyecto.',
      },
      {
        label: 'Identidad propia',
        text: 'Edificios con nombre de árbol autóctono y una firma reconocible, pensados para un barrio concreto y no para repetirse.',
      },
      {
        label: 'Largo plazo',
        text: 'Construimos con mirada de largo plazo: edificios que ganan valor con el tiempo y una desarrolladora con criterio propio.',
      },
    ],
    link: { label: 'Conocer Raíces', href: routes.about },
    cota: 'Naturaleza urbana con criterio',
    image: atmosphereImage,
  },
  featured: {
    kicker: 'Proyecto destacado',
    link: { label: 'Descubrir el proyecto' },
    mediaAriaSuffix: 'descubrir el proyecto',
  },
  cta: {
    cota: 'Buenos Aires',
    atmosphere: atmosphereImage,
  },
} as const;
