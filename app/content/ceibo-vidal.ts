import { asset, partners, routes } from './shared';

const renderNote = 'Material comercial. Renders de referencia.';
const referenceNote = 'Imagen de referencia';

/** WebP derivado de `docs/assets/ceibo-vidal`, con el mismo nombre de versión. */
function ceiboShot(file: string, width: number, height: number, alt: string) {
  const src = asset(`/assets/images/${file}.webp`);
  return {
    src,
    width,
    height,
    alt,
    srcSet: `${asset(`/assets/images/${file}-800.webp`)} 800w, ${src} ${width}w`,
  } as const;
}

const facade = {
  ...ceiboShot(
    'imagen_fachada_perfil_v1',
    1600,
    2133,
    'Render de la fachada de Ceibo Vidal desde la vereda: planta baja y cuatro pisos con balcones de hormigón y vegetación colgante',
  ),
  note: renderNote,
} as const;

const facadeClose = {
  ...ceiboShot(
    'imagen_fachada_cerca_v0',
    1312,
    1199,
    'Acceso de Ceibo Vidal, con el nombre en la fachada, la madera del hall y el balcón del primer piso',
  ),
  /** Este render tiene su derivado en 828 px, no en 800: sin esto la banda pedía un archivo inexistente. */
  srcSet: `${asset('/assets/images/imagen_fachada_cerca_v0-828.webp')} 828w, ${asset('/assets/images/imagen_fachada_cerca_v0.webp')} 1312w`,
  note: renderNote,
  position: '50% 58%',
} as const;

const facadeZoom = {
  ...ceiboShot(
    'imagen_fachada_zoom_v0',
    1024,
    1536,
    'Vista cercana de la fachada de Ceibo Vidal, con balcones corridos, barandas negras y plantas colgantes',
  ),
  note: referenceNote,
} as const;

const terrace = {
  ...ceiboShot(
    'imagen_terraza_noche_v0',
    1142,
    1600,
    'Terraza común de noche, con mesa, parrilla encendida, solárium y jacuzzi entre canteros',
  ),
  note: referenceNote,
  /** En la ficha ancha el cielo ocupa la mitad superior; este punto deja mesa, parrilla y jacuzzi. */
  position: '50% 72%',
} as const;

const sum = {
  ...ceiboShot(
    'imagen_sum_v0',
    1600,
    1309,
    'SUM de Ceibo Vidal: cocina integrada, mesa de madera y abertura al patio exterior',
  ),
  note: renderNote,
} as const;

const hall = {
  ...ceiboShot(
    'imagen_hall_v0',
    1600,
    1600,
    'Hall de acceso de Ceibo Vidal, con revestimiento de madera, sillones y jardín interior junto a la escalera',
  ),
  note: renderNote,
} as const;

/**
 * Contenido de Ceibo Vidal. Independiente del contenido institucional de Raíces.
 * No inventar superficies, precios, amenities ni estados que no estén acá.
 */
export const ceiboVidalContent = {
  slug: 'ceibo-vidal',
  name: 'Ceibo Vidal',
  code: 'Proyecto 001',
  status: 'En desarrollo',
  address: 'Vidal 3849',
  neighborhood: 'Saavedra',
  city: 'CABA',
  locationShort: 'Saavedra, CABA',
  locationLong: 'Vidal 3849 · Saavedra · CABA',
  headline: 'Un equilibrio entre ciudad y aire libre.',
  /** Línea comercial oficial para ir debajo de la identificación (logo + dirección). */
  commercialLine: 'El balance perfecto entre ciudad y aire libre',
  /** Bajada de la ficha en /proyectos. La home usa `homeParagraphs`. */
  summary: 'Ceibo Vidal es un edificio que se propone lograr el balance perfecto entre ciudad y aire libre.',
  homeParagraphs: [
    'En un barrio en crecimiento, conectado y con identidad, decidimos dejar nuestras propias raíces.',
    'Ceibo Vidal es un edificio que se propone lograr el balance perfecto entre ciudad y aire libre.',
  ],
  delivery: 'Entrega prevista para 2029',
  deliveryYear: '2029',
  program: '12 unidades',
  unitsLabel: '1, 2 y 3 ambientes',
  height: 'PB + 4 pisos',
  units: '12 unidades · 1, 2 y 3 ambientes',
  floors: 'Cuatro pisos de tres unidades, cada una con balcón',
  logo: { src: asset('/assets/brand/ceibo_logo_blanco.png'), width: 622, height: 257 },
  cover: facade,
  renderNote,
  seo: {
    title: 'Ceibo Vidal | Departamentos en Saavedra',
    description: 'Ceibo Vidal, Vidal 3849, Saavedra. 12 unidades de 1, 2 y 3 ambientes. Entrega prevista para 2029.',
    ogTitle: 'Ceibo Vidal | Departamentos en Saavedra',
  },
  hero: {
    lead: 'En un barrio en crecimiento, conectado y con identidad, decidimos dejar nuestras propias raíces.',
    primaryCta: { label: 'Explorar tipologías', href: '#tipologias' },
    secondaryCta: {
      label: 'Solicitar información',
      href: `${routes.contact}?asunto=${encodeURIComponent('Ceibo Vidal')}&mensaje=${encodeURIComponent('Quiero recibir información sobre el proyecto Ceibo Vidal')}#formulario`,
    },
  },
  /**
   * Carpeta comercial descargable (copia optimizada para web de docs/commercial/). Al actualizar
   * la carpeta, reemplazar el PDF en `public/downloads/` conservando este nombre.
   */
  brochure: {
    label: 'Descargar brochure',
    href: asset('/downloads/Ceibo-Vidal-Brochure.pdf'),
    filename: 'Ceibo-Vidal-Brochure.pdf',
  },
  intro: {
    label: 'Síntesis del proyecto',
    items: [
      { label: 'Dirección', text: 'Vidal 3849' },
      { label: 'Unidades', text: '12 · 1, 2 y 3 ambientes' },
      { label: 'Entrega', text: 'Prevista para 2029' },
    ],
  },
  architecture: {
    sectionLabel: 'El proyecto',
    kicker: 'Ceibo Vidal',
    title: 'Sobre el proyecto',
    paragraphs: [
      'En un barrio en crecimiento, conectado y con identidad, decidimos dejar nuestras propias raíces.',
      'Ceibo Vidal es un edificio que se propone lograr el balance perfecto entre ciudad y aire libre.',
    ],
    band: facadeClose,
    characteristics: [
      'Planta baja con SUM interior–exterior y estacionamiento para seis vehículos.',
      'Cuatro pisos de tres unidades, cada una con balcón.',
      'Terraza común con jacuzzi, solárium y parrilla.',
      'Terrazas privadas, bauleras y bicicletero.',
    ],
    tags: ['En desarrollo', 'PB + 4', '12 unidades', 'Entrega 2029'],
    tagsLabel: 'Datos del edificio',
    specsLabel: 'El edificio',
    specsAriaLabel: 'Ficha técnica de Ceibo Vidal',
    amenitiesLabel: 'Espacios comunes',
    extrasLabel: 'Disponibles',
    specs: [
      { label: 'Niveles', value: 'PB + 4', note: 'Planta baja y cuatro pisos' },
      { label: 'Unidades', value: '12', note: 'Tres por planta' },
      { label: 'Balcones', value: 'Todas', note: 'Una por unidad' },
      { label: 'Terrazas', value: '1 + 3', note: 'Común y privadas' },
    ],
    amenities: [
      {
        label: 'Terraza común',
        text: 'Terraza común de 76 m² con jacuzzi, solárium y parrilla.',
      },
      {
        label: 'SUM interior–exterior',
        text: 'Planta baja. Espacio de uso mixto con cocina.',
      },
      {
        label: 'Bicicletero',
        text: 'Espacio de guardado de bicicletas de uso común.',
      },
    ],
    extras: ['Cocheras', 'Bauleras', 'Terrazas privadas'],
  },
  gallery: {
    title: 'Galería',
    items: [
      { ...facade, caption: 'Fachada sobre Vidal', note: renderNote },
      { ...terrace, caption: 'Terraza común', note: referenceNote },
      { ...sum, caption: 'SUM', note: renderNote },
    ],
  },
  /**
   * Adelanto visual de la Home (galería horizontal). Configuración central: para sumar o
   * reemplazar renders, agregar una entrada con `order` y el archivo en `public/assets/images/`.
   * Solo renders reales de Ceibo Vidal; la galería completa vive en la página del proyecto.
   * Las imágenes conservan su proporción: cada slide comparte altura y toma su ancho natural.
   */
  homeGallery: [
    { order: 1, title: 'Fachada', ...facade },
    { order: 2, title: 'SUM', ...sum },
    { order: 3, title: 'Terraza', ...terrace },
    { order: 4, title: 'Hall', ...hall },
    { order: 5, title: 'Balcones', ...facadeZoom },
  ],
  green: {
    sectionLabel: 'Aire libre',
    kicker: 'Ceibo Vidal',
    title: 'Terraza común.',
    features: [
      {
        id: 'terrace',
        wide: true,
        label: 'Terraza común',
        title: 'Jacuzzi, solárium y parrilla.',
        text: 'Terraza común de 76 m² con jacuzzi, solárium y parrilla.',
        image: terrace,
        note: referenceNote,
      },
    ],
  },
  typologies: {
    kicker: 'Tipologías',
    title: 'Tres tipologías.',
    areaNote: 'Superficies aproximadas, sujetas a planos finales.',
    lead: 'Tres unidades por piso, todas con balcón, alrededor de un palier central.',
    floorPlan: {
      src: asset('/assets/plans/plano_tipo_v1.webp'),
      width: 1560,
      height: 1008,
      alt: 'Planta tipo de Ceibo Vidal sobre Vidal, con la unidad A de tres ambientes, la B monoambiente y la C de dos ambientes',
    },
    floorPlanCaption: 'Planta tipo · Unidad A 3 ambientes · B monoambiente · C 2 ambientes',
    units: [
      {
        id: 'tres-ambientes',
        code: 'A',
        inquiry: 'Hola, quiero información sobre la unidad A (3 ambientes) de Ceibo Vidal.',
        department: 'Unidad A · Frente',
        title: '3 ambientes',
        program: 'Living comedor al frente con balcón corrido, dormitorio en suite, segundo dormitorio y dos baños completos.',
        plan: {
          src: asset('/assets/plans/tipologia-a.webp'),
          width: 1200,
          height: 893,
          alt: 'Planta amoblada de la unidad A de tres ambientes, con estar-comedor, dos dormitorios, dos baños y balcón',
        },
        render: {
          ...ceiboShot(
            'imagen_3amb_v1',
            1600,
            544,
            'Render del estar-comedor del tres ambientes, con living, mesa y salida al balcón',
          ),
        },
        areas: [
          { label: 'Cubierto', value: '71 m²' },
          { label: 'Balcón', value: '11 m²' },
          { label: 'Total', value: '82 m²' },
        ],
      },
      {
        id: 'monoambiente',
        code: 'B',
        inquiry: 'Hola, quiero información sobre la unidad B (Monoambiente) de Ceibo Vidal.',
        department: 'Unidad B · Contrafrente',
        title: 'Monoambiente',
        program: 'Ambiente integrado con cocina completa, baño completo, espacio de guardado y balcón propio.',
        plan: {
          src: asset('/assets/plans/tipologia-b.webp'),
          width: 1200,
          height: 485,
          alt: 'Planta amoblada del monoambiente, unidad B, con estar, dormitorio, cocina, baño y balcón',
        },
        render: {
          ...ceiboShot(
            'imagen_mono_v1',
            1448,
            1086,
            'Render del monoambiente, con estar, cama y salida al balcón al fondo',
          ),
        },
        areas: [
          { label: 'Cubierto', value: '34 m²' },
          { label: 'Balcón', value: '3 m²' },
          { label: 'Total', value: '37 m²' },
        ],
      },
      {
        id: 'dos-ambientes',
        code: 'C',
        inquiry: 'Hola, quiero información sobre la unidad C (2 ambientes) de Ceibo Vidal.',
        department: 'Unidad C · Contrafrente',
        title: '2 ambientes',
        program: 'Living-comedor con cocina, dormitorio en suite, toilette, baño completo y balcón corrido.',
        plan: {
          src: asset('/assets/plans/tipologia-c.webp'),
          width: 1200,
          height: 767,
          alt: 'Planta amoblada de la unidad C de dos ambientes, con estar-comedor, dormitorio, baño y balcón',
        },
        render: {
          ...ceiboShot(
            'imagen_2amb_v0',
            1600,
            600,
            'Render del estar-comedor del dos ambientes, con living, mesa, cocina integrada y balcón',
          ),
        },
        areas: [
          { label: 'Cubierto', value: '48 m²' },
          { label: 'Balcón', value: '6 m²' },
          { label: 'Total', value: '54 m²' },
        ],
      },
    ],
  },
  location: {
    sectionLabel: 'Ubicación',
    kicker: 'Vidal 3849 · Saavedra',
    intro: '¿Por qué Saavedra?',
    lead: 'Un barrio tranquilo, verde y conectado, donde la naturaleza convive con comercios, servicios y espacios de encuentro, en pleno corredor norte de CABA.',
    points: [
      {
        label: 'Naturaleza',
        text: 'Parque Saavedra a 4 cuadras y Boulevard García del Río a media cuadra, con verde y aire libre.',
      },
      {
        label: 'Vida de barrio',
        text: 'Bares, restaurantes, comercios y cultura, en una vida de barrio cercana.',
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
    mapCota: 'Saavedra · CABA',
  },
  partners: {
    label: 'Desarrollado en conjunto con',
    ariaLabel: 'Socios del proyecto',
    items: partners,
  },
  contact: {
    id: 'consultas',
    kicker: 'Siguiente paso',
    title: 'Coordiná tu reunión.',
    text: 'Unidades disponibles y forma de pago. Un solo canal.',
    note: 'Material comercial. Renders de referencia.',
    defaultSubject: 'Ceibo Vidal',
  },
  /**
   * Forma de pago de la carpeta comercial. No se publica: la sección no está en la web.
   * No incluye montos de preventa ni comparativa de mercado.
   */
  commercial: {
    published: false,
    title: 'Un esquema simple, en pesos.',
    text: 'Un anticipo al firmar y el saldo en cuotas durante la obra, ajustadas por CAC.',
    advance: '30% de anticipo al boleto.',
    balance: '70% restante en 18 cuotas.',
    adjustment: 'Cuotas en pesos ajustadas por CAC.',
    delivery: 'Entrega prevista para 2029.',
  },
  pageCanonical: `${routes.project('ceibo-vidal')}/`,
} as const;
