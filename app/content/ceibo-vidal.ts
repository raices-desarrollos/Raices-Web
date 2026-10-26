import { asset, partners, routes } from './shared';

const renderNote = 'Material comercial. Renders de referencia.';
const referenceNote = 'Imagen de referencia';

const facade = {
  src: asset('/assets/images/ceibo-vidal-fachada.webp'),
  width: 682,
  height: 1024,
  alt: 'Render de la fachada de Ceibo Vidal: edificio de planta baja y cuatro pisos con balcones corridos y vegetación colgante en cada nivel',
  note: renderNote,
} as const;

const terrace = {
  src: asset('/assets/images/terraza-verde.webp'),
  width: 1536,
  height: 1024,
  alt: 'Terraza con jacuzzi, canteros con vegetación densa, árboles y reposeras, con la ciudad de fondo',
} as const;

const balconies = {
  src: asset('/assets/images/balcones-tensores.webp'),
  width: 1536,
  height: 1024,
  alt: 'Balcones con plantas trepadoras guiadas por tensores verticales de acero',
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
    kicker: 'Ceibo Vidal · Saavedra',
    lead: 'En un barrio en crecimiento, conectado y con identidad, decidimos dejar nuestras propias raíces.',
    primaryCta: { label: 'Explorar tipologías', href: '#tipologias' },
    secondaryCta: { label: 'Consultar por WhatsApp' },
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
    characteristics: [
      'Planta baja con SUM in-out, cowork y cocheras.',
      'Cuatro pisos de tres unidades, cada una con balcón.',
      'Terraza común con jacuzzi.',
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
        text: 'Terraza común de 76 m². Jacuzzi y estar al aire libre.',
      },
      {
        label: 'SUM y cowork',
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
      { ...balconies, caption: 'Balcones con tensores', note: referenceNote },
    ],
  },
  green: {
    sectionLabel: 'Aire libre',
    kicker: 'Ceibo Vidal',
    title: 'Terraza común y balcones.',
    features: [
      {
        id: 'terrace',
        wide: true,
        label: 'Terraza común',
        title: 'Jacuzzi y estar al aire libre.',
        text: 'Terraza común de 76 m². Jacuzzi y estar al aire libre.',
        image: terrace,
        note: referenceNote,
      },
      {
        id: 'balconies',
        wide: false,
        label: 'Balcones',
        title: 'Una por unidad.',
        text: 'Cuatro pisos de tres unidades, cada una con balcón.',
        image: balconies,
        note: referenceNote,
      },
      {
        id: 'private',
        wide: false,
        system: true,
        label: 'Terrazas privadas',
        title: 'Tres terrazas privadas.',
        text: 'Una terraza común con jacuzzi y estar al aire libre, más tres terrazas privadas.',
      },
    ],
  },
  typologies: {
    kicker: 'Tipologías',
    title: 'Tres tipologías.',
    lead: 'Tres unidades por piso, todas con balcón, alrededor de un palier central.',
    floorPlan: {
      src: asset('/assets/plans/ceibo-planta-tipo.webp'),
      width: 2382,
      height: 1474,
      alt: 'Planta tipo de Ceibo Vidal con los departamentos A de tres ambientes, B monoambiente y C de dos ambientes alrededor del núcleo de circulación',
    },
    floorPlanCaption: 'Planta tipo · Unidad A 3 ambientes · B monoambiente · C 2 ambientes',
    units: [
      {
        id: 'tres-ambientes',
        department: 'Unidad A · Frente',
        title: '3 ambientes',
        program: 'Living-comedor al frente, suite y segundo dormitorio, baño social.',
        plan: {
          src: asset('/assets/plans/ceibo-tipologia-3-ambientes.webp'),
          width: 2382,
          height: 1474,
          alt: 'Plano del departamento A de tres ambientes, con dos dormitorios, dos baños, estar-comedor con cocina integrada y balcón',
        },
        render: {
          src: asset('/assets/images/unidad-a-3amb.webp'),
          width: 1024,
          height: 1024,
          alt: 'Render en planta del tres ambientes amoblado, con dos dormitorios, dos baños, estar-comedor y balcón corrido con plantas',
        },
        areas: [
          { label: 'Cubierto', value: '68,67 m²' },
          { label: 'Balcón', value: '11,08 m²' },
          { label: 'Total', value: '79,75 m²' },
        ],
      },
      {
        id: 'monoambiente',
        department: 'Unidad B · Contrafrente',
        title: 'Monoambiente',
        program: 'Ambiente integrado · baño completo · balcón propio.',
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
          { label: 'Cubierto', value: '35,79 m²' },
          { label: 'Balcón', value: '3,27 m²' },
          { label: 'Total', value: '39,06 m²' },
        ],
      },
      {
        id: 'dos-ambientes',
        department: 'Unidad C · Contrafrente',
        title: '2 ambientes',
        program: 'Living-comedor con cocina, dormitorio en suite, baño social.',
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
          { label: 'Cubierto', value: '48,39 m²' },
          { label: 'Balcón', value: '7,79 m²' },
          { label: 'Total', value: '56,18 m²' },
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
