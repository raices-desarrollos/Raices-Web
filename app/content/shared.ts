/**
 * Contenido y datos compartidos: marca, rutas, navegación, chrome de UI y socios.
 * Si falta un dato, dejar un `TODO:` y no inventarlo.
 */

export const BASE = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');

/** Origen público del sitio (sin basePath). Con dominio propio, definir NEXT_PUBLIC_SITE_URL. */
const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || 'https://raices-desarrollos.github.io').replace(
  /\/$/,
  '',
);

/** URL pública completa del sitio, con basePath incluido. */
export const SITE_URL = `${SITE_ORIGIN}${BASE}`;

export const asset = (path: string) => `${BASE}${path}`;

export const brand = {
  name: 'Raíces Developers',
  shortName: 'Raíces',
  /** Mensaje principal. Brief GAMISU. */
  idea: 'Hacemos edificios donde nosotros mismos viviríamos.',
  /** Slogan secundario. No compite con el mensaje principal. */
  slogan: 'Espacios para echar raíces.',
  claim: 'Espacios para echar raíces.',
  city: 'Buenos Aires',
  logos: {
    full: { src: asset('/assets/brand/raices_logo_completo.png'), width: 789, height: 856 },
    text: { src: asset('/assets/brand/raices_logo_texto.png'), width: 888, height: 258 },
    icon: { src: asset('/assets/brand/raices_logo_icono.png'), width: 749, height: 893 },
  },
  ogImage: `${SITE_URL}/assets/brand/og-image.png`,
} as const;

/** Rutas internas. Siempre usar <Link> con estas rutas (Next agrega basePath y barra final). */
export const routes = {
  home: '/',
  projects: '/proyectos',
  project: (slug: string) => `/proyectos/${slug}`,
  about: '/nosotros',
  contact: '/contacto',
} as const;

export const navItems = [
  { href: routes.projects, label: 'Proyectos' },
  { href: routes.about, label: 'Nosotros' },
  { href: routes.contact, label: 'Contacto' },
] as const;

/**
 * Anclas de la landing anterior → rutas nuevas. Un enlace viejo como `/#tipologias`
 * sigue llegando a destino (ver components/LegacyHashRedirect.jsx).
 */
export const legacyHashRoutes = {
  '#inicio': routes.home,
  '#filosofia': routes.about,
  '#identidad': `${routes.about}#identidad`,
  '#ceibo-vidal': routes.project('ceibo-vidal'),
  '#tipologias': `${routes.project('ceibo-vidal')}#tipologias`,
  '#verde': `${routes.project('ceibo-vidal')}#verde`,
  '#ubicacion': `${routes.project('ceibo-vidal')}#ubicacion`,
  '#contacto': routes.contact,
} as const;

export const seo = {
  defaultTitle: 'Raíces Developers | Desarrolladora inmobiliaria en Buenos Aires',
  description:
    'Hacemos edificios donde nosotros mismos viviríamos. Conocé Raíces Developers y nuestros desarrollos en Buenos Aires.',
  locale: 'es_AR',
  ogImageAlt: `Logo de ${brand.name}`,
} as const;

export const ui = {
  skipToContent: 'Saltar al contenido',
  header: {
    navLabel: 'Navegación principal',
    brandHomeLabel: `${brand.name}, ir al inicio`,
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    consultCta: 'Consultar',
  },
  footer: {
    sectionsLabel: 'Secciones del sitio',
    homeLink: 'Inicio',
    contactLabel: 'Contacto',
    disclaimer: 'Renders de referencia. Las imágenes son ilustrativas y pueden variar en obra.',
    backToTop: 'Volver arriba',
  },
  labels: {
    program: 'Programa',
    delivery: 'Entrega',
    deliveryPrefixed: (year: string) => `Prevista para ${year}`,
    location: 'Ubicación',
    synthesis: 'Síntesis',
  },
  cta: {
    title: 'Hablemos.',
    text: 'Te respondemos con información del proyecto, planos y unidades disponibles.',
    link: { label: 'Contacto', href: routes.contact },
  },
  notFound: {
    kicker: 'Error 404',
    title: 'Esta página no existe.',
    lead: 'El enlace puede haber cambiado con la nueva estructura del sitio.',
    seoTitle: 'Página no encontrada',
    homeLabel: 'Ir al inicio',
    projectsLabel: 'Ver proyectos',
  },
  gallery: {
    title: 'Galería',
    stripLabel: 'Imágenes del proyecto',
    enlargePrefix: 'Ampliar:',
    previous: 'Anterior',
    next: 'Siguiente',
    lightbox: 'Imagen ampliada',
    close: 'Cerrar',
  },
  whatsapp: {
    consultLabel: 'Consultar por WhatsApp',
  },
  intro: {
    skip: 'Saltar',
  },
  scroll: {
    label: 'Scroll',
    ariaLabel: 'Bajar al contenido',
  },
  partners: {
    label: 'Desarrollado en conjunto con',
    ariaLabel: 'Socios del proyecto',
  },
} as const;

export const partners = [
  {
    name: 'G&D Developers',
    logo: { src: asset('/assets/partners/gyd-wordmark-white.png'), width: 1416, height: 701 },
  },
  {
    name: 'Daimar Developers',
    logo: { src: asset('/assets/partners/daimar-developers-white.png'), width: 1348, height: 274 },
  },
] as const;
