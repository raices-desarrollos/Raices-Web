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
  srcSet: `${asset('/assets/images/balcones-tensores-828.webp')} 828w, ${asset('/assets/images/balcones-tensores.webp')} 1536w`,
  sizes: '100vw',
} as const;

export const homeContent = {
  hero: {
    kicker: 'Raíces Developers',
    title: 'Hacemos edificios donde nosotros mismos viviríamos.',
    titleQuiet: 'Hacemos edificios',
    titleEmphasis: 'donde nosotros mismos viviríamos.',
    lead: 'Creemos que un edificio debe estar pensado primero para quien lo va a habitar y después para quien lo va a vender.',
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
    title: 'Construimos espacios donde da placer vivir.',
    lead: 'Cada elección tiene un propósito, cada espacio funciona bien y cada proyecto sigue teniendo sentido con el paso de los años.',
    link: { label: 'Conocer Raíces', href: routes.about },
  },
  featured: {
    kicker: 'Proyecto 001 · Saavedra',
    link: { label: 'Descubrir Ceibo Vidal' },
    cta: 'Explorar proyecto',
    address: 'Vidal 3849 · Saavedra, Buenos Aires',
    mediaAriaSuffix: 'descubrir Ceibo Vidal',
  },
  cta: {
    title: '¿Hablamos de tu próximo hogar?',
    link: { label: 'Contactanos', href: routes.contact },
  },
} as const;
