import { asset, brand, partners, routes } from './shared';

const renderNote = 'Render de referencia';
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
  locationLong: 'Vidal 3849, Saavedra, CABA',
  headline: 'Un edificio bajo, claro y vegetal.',
  summary:
    'Planta baja y cuatro pisos de tres unidades con balcón, rematados por una terraza propia. Verde integrado desde el proyecto, a cuatro cuadras del Parque Saavedra.',
  delivery: 'Entrega prevista para 2029',
  deliveryYear: '2029',
  program: 'PB + 4 pisos',
  unitsLabel: '12 unidades',
  height: 'PB + 4 pisos + terraza propia',
  units: '12 unidades · 1, 2 y 3 ambientes',
  floors: 'Cuatro pisos de tres unidades, cada una con balcón',
  logo: { src: asset('/assets/brand/ceibo_logo_blanco.png'), width: 622, height: 257 },
  cover: facade,
  renderNote,
  seo: {
    title: 'Ceibo Vidal',
    description:
      'Ceibo Vidal, Vidal 3849, Saavedra, CABA. Planta baja y cuatro pisos de tres unidades con balcón, rematados por una terraza propia. Verde integrado desde el proyecto, a cuatro cuadras del Parque Saavedra. Entrega prevista para 2029.',
    ogTitle: `Ceibo Vidal · ${brand.name}`,
  },
  hero: {
    primaryCta: { label: 'Ver tipologías', href: '#tipologias' },
    secondaryCta: { label: 'Consultar por WhatsApp' },
  },
  intro: {
    label: 'Síntesis del proyecto',
    items: [
      { label: 'Ubicación', text: 'Vidal 3849 · Saavedra, CABA' },
      { label: 'Programa', text: 'PB + 4 pisos + terraza propia · 12 unidades · 1, 2 y 3 ambientes' },
      { label: 'Entrega', text: 'Entrega prevista para 2029' },
    ],
  },
  architecture: {
    sectionLabel: 'Presentación',
    kicker: 'Arquitectura',
    title: 'Dejar nuestras propias raíces en Saavedra.',
    paragraphs: [
      'En un barrio en crecimiento, conectado y con identidad, decidimos dejar nuestras propias raíces. Ceibo Vidal es un edificio que busca el equilibrio entre ciudad y aire libre.',
      'Planta baja y cuatro pisos de tres unidades, cada una con balcón: cuatro niveles de balcones visibles desde la calle, rematados por una terraza propia.',
    ],
    tags: ['En desarrollo', 'PB + 4 pisos', '12 unidades', 'Entrega 2029'],
    tagsLabel: 'Características del proyecto',
    specsLabel: 'Ficha técnica',
    specsAriaLabel: 'Ficha técnica de Ceibo Vidal',
    amenitiesLabel: 'Espacios comunes',
    specs: [
      { label: 'Ubicación', value: 'Vidal 3849', note: 'Saavedra, CABA' },
      { label: 'Altura', value: 'PB + 4', note: 'Más terraza propia' },
      { label: 'Unidades', value: '12', note: '1, 2 y 3 ambientes' },
      { label: 'Entrega', value: '2029', note: 'Prevista' },
    ],
    amenities: {
      groundFloor: ['SUM in-out', 'Cowork', 'Cocheras'],
      terrace: ['Terraza común con jacuzzi'],
      others: ['Terrazas privadas', 'Bauleras', 'Bicicletero'],
    },
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
    sectionLabel: 'Verde edilicio',
    kicker: 'Del balcón a la escala del edificio',
    title: 'Un sistema vivo, no una maceta suelta.',
    features: [
      {
        id: 'terrace',
        wide: true,
        label: 'Terraza común',
        title: 'Agua, sombra y vegetación en la cubierta.',
        text: 'Terraza común con jacuzzi, jardineras y sombra natural. El remate del edificio también se habita.',
        image: terrace,
        note: referenceNote,
      },
      {
        id: 'balconies',
        wide: false,
        label: 'Balcones vivos',
        title: 'Trepadoras y tensores como fachada.',
        text: 'Plantas guiadas a escala edilicia, con estructura prevista desde el proyecto y no agregada al final.',
        image: balconies,
        note: referenceNote,
      },
      {
        id: 'system',
        wide: false,
        system: true,
        label: 'Sistema natural',
        title: 'Riego, mantenimiento e identidad.',
        text: 'La vegetación se piensa con tensores, drenajes y riego automatizado: un sistema sostenible para quienes viven el edificio y para su administración.',
      },
    ],
  },
  typologies: {
    kicker: 'Planos',
    title: 'Tres tipologías por planta, todas con balcón.',
    lead: 'La planta tipo organiza un monoambiente, un dos ambientes y un tres ambientes alrededor del núcleo de circulación. Cada unidad incorpora expansión exterior hacia frente o contrafrente.',
    floorPlan: {
      src: asset('/assets/plans/ceibo-planta-tipo.webp'),
      width: 2382,
      height: 1474,
      alt: 'Planta tipo de Ceibo Vidal con los departamentos A de tres ambientes, B monoambiente y C de dos ambientes alrededor del núcleo de circulación',
    },
    floorPlanCaption: 'Planta tipo · Departamento A 3 ambientes · B monoambiente · C 2 ambientes',
    units: [
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
          { label: 'Cubierto', value: '35,79 m²' },
          { label: 'Balcón', value: '3,27 m²' },
          { label: 'Total', value: '39,06 m²' },
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
          { label: 'Cubierto', value: '48,39 m²' },
          { label: 'Balcón', value: '7,79 m²' },
          { label: 'Total', value: '56,18 m²' },
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
    ],
  },
  location: {
    sectionLabel: 'Ubicación',
    kicker: 'Vidal 3849 · Saavedra',
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
    mapCota: 'Saavedra · CABA',
  },
  partners: {
    label: 'Desarrollado en conjunto con',
    ariaLabel: 'Socios del proyecto',
    items: partners,
  },
  contact: {
    id: 'consultas',
    kicker: 'Consultas comerciales',
    title: 'Hablemos de Ceibo Vidal.',
    defaultSubject: 'Ceibo Vidal',
  },
  pageCanonical: `${routes.project('ceibo-vidal')}/`,
} as const;
