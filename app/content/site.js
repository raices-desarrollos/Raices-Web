/**
 * Única fuente de datos del sitio: marca, contacto, proyecto, navegación y assets.
 * Todo lo que sea un dato (no una frase de párrafo) vive acá.
 *
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

export const asset = (path) => `${BASE}${path}`;

export const brand = {
  name: 'Raíces Developers',
  shortName: 'Raíces',
  claim: 'Naturaleza urbana con criterio.',
  city: 'Buenos Aires',
  logos: {
    full: { src: asset('/assets/brand/raices_logo_completo.png'), width: 789, height: 856 },
    text: { src: asset('/assets/brand/raices_logo_texto.png'), width: 888, height: 258 },
    icon: { src: asset('/assets/brand/raices_logo_icono.png'), width: 749, height: 893 },
  },
  ogImage: `${SITE_URL}/assets/brand/og-image.png`,
};

export const contact = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491136994200',
  whatsappDisplay: '+54 9 11 3699-4200',
  whatsappMessage: 'Hola, quiero recibir información sobre Ceibo Vidal.',
  email: 'contacto@raicesdesarrolladores.com.ar',
  /**
   * Endpoint del worker de email (`functions/contact-worker.js`).
   * Si está vacío, el formulario no finge un envío: avisa que el email no está activo.
   * CONTACT_TO_EMAIL y RESEND_API_KEY viven solo en el worker, nunca en el frontend.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || '',
  /** Motivos del formulario. El primero es el valor por defecto. */
  subjects: ['Ceibo Vidal', 'Consulta general'],
};

export const social = {
  // TODO: URL oficial de LinkedIn de Raíces Developers. Mientras esté vacía, el botón no se muestra.
  linkedin: '',
  // TODO: URL oficial de Instagram de Raíces Developers. Mientras esté vacía, el botón no se muestra.
  instagram: '',
};

/** Rutas internas. Siempre usar <Link> con estas rutas (Next agrega basePath y barra final). */
export const routes = {
  home: '/',
  projects: '/proyectos',
  project: (slug) => `/proyectos/${slug}`,
  about: '/nosotros',
  contact: '/contacto',
};

export const navItems = [
  { href: routes.projects, label: 'Proyectos' },
  { href: routes.about, label: 'Nosotros' },
  { href: routes.contact, label: 'Contacto' },
];

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
};

/**
 * Medios del hero institucional. Sin video final, se usa una imagen de referencia con
 * movimiento de cámara simulado. Para activar el video definitivo: copiarlo a
 * `public/assets/video/` y definir NEXT_PUBLIC_HERO_VIDEO=/assets/video/<archivo>.mp4
 * (H.264, sin audio, ideal ≤ 6 MB). El poster sigue siendo la imagen de abajo.
 */
export const heroMedia = {
  video: process.env.NEXT_PUBLIC_HERO_VIDEO ? asset(process.env.NEXT_PUBLIC_HERO_VIDEO) : '',
  image: {
    src: asset('/assets/images/balcones-tensores.webp'),
    width: 1536,
    height: 1024,
    alt: '',
  },
  note: 'Imagen de referencia',
};

/** Copy de la Home institucional. */
export const home = {
  hero: {
    kicker: 'Desarrolladora inmobiliaria · Buenos Aires',
    title: 'Espacios para echar raíces.',
    lead: 'Desarrollamos espacios donde la arquitectura, el diseño y nuevas formas de habitar se encuentran.',
    primary: { label: 'Explorar proyectos', href: routes.projects },
    secondary: { label: 'Contactanos', href: routes.contact },
  },
  about: {
    kicker: 'Raíces Developers',
    title: 'Arquitectura que deja huella.',
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
  },
  featured: {
    kicker: 'Proyecto destacado',
    link: { label: 'Descubrir el proyecto' },
  },
  cta: {
    title: 'Construyamos lo que viene.',
    text: 'Para compradores e inversores que quieran construir ciudad con más naturaleza.',
    link: { label: 'Hablemos', href: routes.contact },
  },
};

export const project = {
  name: 'Ceibo Vidal',
  code: 'Proyecto 001',
  address: 'Vidal 3849',
  neighborhood: 'Saavedra',
  city: 'CABA',
  height: 'PB + 4 pisos + terraza propia',
  units: '12 unidades · 1, 2 y 3 ambientes',
  floors: 'Cuatro pisos de tres unidades, cada una con balcón',
  delivery: 'Entrega prevista para 2029',
  deliveryYear: '2029',
  status: 'En desarrollo',
  logo: { src: asset('/assets/brand/ceibo_logo_blanco.png'), width: 622, height: 257 },
  facade: {
    src: asset('/assets/images/ceibo-vidal-fachada.webp'),
    width: 682,
    height: 1024,
    alt: 'Render de la fachada de Ceibo Vidal: edificio de planta baja y cuatro pisos con balcones corridos y vegetación colgante en cada nivel',
  },
  renderNote: 'Render de referencia',
  amenities: {
    groundFloor: ['SUM in-out', 'Cowork', 'Cocheras'],
    terrace: ['Terraza común con jacuzzi'],
    others: ['Terrazas privadas', 'Bauleras', 'Bicicletero'],
  },
};

/** Ficha técnica. Los valores de m² se mantienen tal cual figuran en los planos. */
export const specs = [
  { label: 'Ubicación', value: 'Vidal 3849', note: 'Saavedra, CABA' },
  { label: 'Altura', value: 'PB + 4', note: 'Más terraza propia' },
  { label: 'Unidades', value: '12', note: '1, 2 y 3 ambientes' },
  { label: 'Entrega', value: '2029', note: 'Prevista' },
];

export const floorPlan = {
  src: asset('/assets/plans/ceibo-planta-tipo.webp'),
  width: 2382,
  height: 1474,
  alt: 'Planta tipo de Ceibo Vidal con los departamentos A de tres ambientes, B monoambiente y C de dos ambientes alrededor del núcleo de circulación',
};

export const typologies = [
  {
    id: 'monoambiente',
    department: 'Departamento B',
    title: 'Monoambiente',
    plan: {
      src: asset('/assets/plans/ceibo-tipologia-monoambiente.webp'),
      width: 2382,
      height: 1474,
      alt: 'Plano del monoambiente, departamento B, con baño, cocina integrada, estar-dormitorio y balcón',
    },
    render: {
      src: asset('/assets/images/unidad-b-mono.webp'),
      width: 1024,
      height: 682,
      alt: 'Render en planta del monoambiente amoblado, con cocina, estar, cama y balcón con plantas',
    },
    areas: [
      ['Cubierto', '35,79 m²'],
      ['Balcón', '3,27 m²'],
      ['Total', '39,06 m²'],
    ],
  },
  {
    id: 'dos-ambientes',
    department: 'Departamento C',
    title: '2 ambientes',
    plan: {
      src: asset('/assets/plans/ceibo-tipologia-2-ambientes.webp'),
      width: 2382,
      height: 1474,
      alt: 'Plano del departamento C de dos ambientes, con dormitorio, baño, estar-comedor con cocina integrada y balcón',
    },
    render: {
      src: asset('/assets/images/unidad-c-2amb.webp'),
      width: 1024,
      height: 768,
      alt: 'Render en planta del dos ambientes amoblado, con dormitorio, estar-comedor y balcón',
    },
    areas: [
      ['Cubierto', '48,39 m²'],
      ['Balcón', '7,79 m²'],
      ['Total', '56,18 m²'],
    ],
  },
  {
    id: 'tres-ambientes',
    department: 'Departamento A',
    title: '3 ambientes',
    plan: {
      src: asset('/assets/plans/ceibo-tipologia-3-ambientes.webp'),
      width: 2382,
      height: 1474,
      alt: 'Plano del departamento A de tres ambientes, con dos dormitorios, dos baños, estar-comedor con cocina integrada y balcón corrido',
    },
    render: {
      src: asset('/assets/images/unidad-a-3amb.webp'),
      width: 1024,
      height: 1024,
      alt: 'Render en planta del tres ambientes amoblado, con dos dormitorios, dos baños, estar-comedor y balcón corrido con plantas',
    },
    areas: [
      ['Cubierto', '68,67 m²'],
      ['Balcón', '11,08 m²'],
      ['Total', '79,75 m²'],
    ],
  },
];

export const greenFeatures = {
  terrace: {
    src: asset('/assets/images/terraza-verde.webp'),
    width: 1536,
    height: 1024,
    alt: 'Terraza con jacuzzi, canteros con vegetación densa, árboles y reposeras, con la ciudad de fondo',
  },
  balconies: {
    src: asset('/assets/images/balcones-tensores.webp'),
    width: 1536,
    height: 1024,
    alt: 'Balcones con plantas trepadoras guiadas por tensores verticales de acero',
  },
  referenceNote: 'Imagen de referencia',
};

export const location = {
  intro: 'A media cuadra del Boulevard García del Río y a cuatro cuadras del Parque Saavedra.',
  points: [
    {
      label: 'Naturaleza',
      text: 'Parque Saavedra a 4 cuadras y Boulevard García del Río a media cuadra.',
    },
    {
      label: 'Vida de barrio',
      text: 'Bares, restaurantes, comercios y cultura.',
    },
    {
      label: 'Conectividad',
      text: 'Av. Cabildo, Subte D, Metrobús y General Paz, con acceso rápido hacia la provincia.',
    },
    {
      label: 'Servicios',
      text: 'Shopping DOT, comercios y supermercados a pocos minutos.',
    },
  ],
  map: {
    src: asset('/assets/images/mapa-barrio-ceibo.webp'),
    width: 1600,
    height: 957,
    alt: 'Mapa ilustrado de Saavedra con la ubicación de Ceibo Vidal sobre Vidal, cerca del Boulevard García del Río, el Parque Saavedra, Av. Cabildo, el Shopping DOT y la estación Congreso de Tucumán del Subte D',
  },
};

export const partners = [
  {
    name: 'G&D Developers',
    logo: { src: asset('/assets/partners/gyd-wordmark-white.png'), width: 1416, height: 701 },
  },
  {
    name: 'Daimar Developers',
    logo: { src: asset('/assets/partners/daimar-developers-white.png'), width: 1348, height: 274 },
  },
];

export const identityPoints = [
  'Cada edificio se nombra como un árbol autóctono: Ceibo, Jacarandá, Ombú y los que vengan.',
  'El verde es una decisión de proyecto y de marca: mejora la vida cotidiana y deja una firma reconocible.',
  'Construimos con mirada de largo plazo: edificios que ganan valor con el tiempo y una desarrolladora con criterio propio.',
];

/**
 * Galería de Ceibo Vidal. Para reemplazar renders: cambiar `src`, `width`, `height` y `alt`.
 * Las piezas sobre fondo blanco (renders de unidades) viven en Tipologías, sobre lámina Lino.
 */
export const gallery = [
  { ...project.facade, caption: 'Fachada sobre Vidal', note: project.renderNote },
  { ...greenFeatures.terrace, caption: 'Terraza común', note: greenFeatures.referenceNote },
  { ...greenFeatures.balconies, caption: 'Balcones con tensores', note: greenFeatures.referenceNote },
];

/**
 * Portfolio. Cada desarrollo es una entrada; `/proyectos/[slug]` se genera a partir de acá.
 * Hoy existe un único proyecto. No agregar desarrollos que no estén confirmados.
 */
export const projects = [
  {
    slug: 'ceibo-vidal',
    name: project.name,
    code: project.code,
    status: project.status,
    location: `${project.neighborhood}, ${project.city}`,
    locationLong: `${project.address}, ${project.neighborhood}, ${project.city}`,
    headline: 'Un edificio bajo, claro y vegetal.',
    summary:
      'Planta baja y cuatro pisos de tres unidades con balcón, rematados por una terraza propia. Verde integrado desde el proyecto, a cuatro cuadras del Parque Saavedra.',
    delivery: project.delivery,
    deliveryYear: project.deliveryYear,
    logo: project.logo,
    cover: project.facade,
    gallery,
    specs,
  },
];

export const getProject = (slug) => projects.find((entry) => entry.slug === slug);
