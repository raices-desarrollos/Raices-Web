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
    kicker: 'Raíces Developers',
    title: 'Hacemos edificios donde nosotros mismos viviríamos.',
    titleQuiet: 'Hacemos edificios',
    titleEmphasis: 'donde nosotros mismos viviríamos.',
    lead: 'Creemos que un edificio debe estar pensado primero para quien lo va a habitar —y después para quien lo va a vender—.',
    primaryCta: { label: 'Explorar proyectos', href: routes.projects },
    secondaryCta: { label: 'Conocer Raíces', href: routes.about },
    cota: `${brand.name} · ${brand.city}`,
    media: {
      video: process.env.NEXT_PUBLIC_HERO_VIDEO ? asset(process.env.NEXT_PUBLIC_HERO_VIDEO) : '',
      image: heroImage,
      note: 'Imagen de referencia',
    },
  },
  about: {
    kicker: 'Nuestra filosofía',
    title: 'Pensados para quienes los habitan.',
    titleQuiet: 'Pensados para',
    titleEmphasis: 'quienes los habitan.',
    lead: 'Por eso buscamos que cada elección tenga un propósito, que cada espacio funcione bien y que cada proyecto siga teniendo sentido con el paso de los años.',
    bridge: 'Tomamos decisiones con criterio.',
    principles: [
      {
        label: 'Simplicidad',
        text: 'Valoramos la simplicidad.',
      },
      {
        label: 'Durabilidad',
        text: 'Preferimos las soluciones duraderas a las modas.',
      },
      {
        label: 'Funcionalidad',
        text: 'Nos gustan los espacios luminosos, funcionales y fáciles de vivir.',
      },
    ],
    quote:
      'La buena arquitectura y la buena ingeniería tienen algo en común: cuando están bien hechas, no necesitan explicarse.',
    link: { label: 'Conocer Raíces', href: routes.about },
    cota: brand.slogan,
    image: atmosphereImage,
  },
  featured: {
    kicker: 'Proyecto 001 · Saavedra',
    link: { label: 'Descubrir Ceibo Vidal' },
    mediaAriaSuffix: 'descubrir Ceibo Vidal',
  },
  cta: {
    cota: 'Buenos Aires',
    title: 'Construimos espacios donde da placer vivir.',
    text: 'Vamos a construir cada proyecto como si fuera para nosotros.',
    link: { label: 'Conocé nuestros proyectos', href: routes.projects },
    atmosphere: atmosphereImage,
  },
} as const;
