import { routes } from './shared';

/**
 * Filosofía institucional. Las frases de criterio, confianza y promesa son del brief GAMISU.
 * La sección de identidad reutiliza textos ya publicados en el sitio: no están en ese brief.
 */
export const aboutContent = {
  seo: {
    title: 'Nosotros | Raíces Developers',
    description:
      'Conocé nuestra filosofía: criterio, simplicidad y decisiones pensadas para quienes van a habitar nuestros edificios.',
    ogTitle: 'Nosotros | Raíces Developers',
  },
  header: {
    kicker: 'Nosotros',
    title: 'Hacemos edificios donde nosotros mismos viviríamos.',
    lead: [
      'Somos una desarrolladora inmobiliaria situada en Buenos Aires.',
      'En cada proyecto partimos de una pregunta: ¿cómo se va a vivir acá?',
      'A partir de eso, diseñamos espacios luminosos, funcionales y duraderos, pensados para acompañar la vida cotidiana. Porque el verdadero valor de un lugar empieza cuando alguien lo habita.',
    ],
  },
  philosophy: {
    sectionLabel: 'Qué creemos',
    kicker: '',
    title: 'La confianza se gana cumpliendo.',
    paragraphs: [
      'Comprar una propiedad es una de las decisiones más importantes en la vida de una persona. Detrás de cada unidad hay años de trabajo, ahorro, esfuerzo y expectativas.',
      'Por eso, entendemos que construir también es asumir una responsabilidad con quienes confían en nosotros.',
    ],
    quote: 'Creemos en hacer las cosas bien, cuidar cada decisión y cumplir con lo que prometemos.',
  },
  practice: {
    id: 'construir',
    kicker: 'Nuestra forma de construir',
    title: 'Tomamos decisiones con criterio.',
    lead: 'Cada proyecto nace de la búsqueda de un equilibrio entre diseño, funcionalidad y durabilidad. ',
    points: [
      { label: 'Simplicidad', text: 'Elegimos soluciones claras y espacios que no necesitan excesos para sentirse bien. Creemos que la belleza no es un agregado: es parte de nuestra forma de construir.' },
      { label: 'Funcionalidad', text: 'Diseñamos espacios luminosos, cómodos y fáciles de vivir. Cada decisión tiene un propósito: mejorar la experiencia cotidiana de quienes los habitan.' },
      { label: 'Durabilidad', text: 'Preferimos las soluciones duraderas. Buscamos crear espacios que tengan sentido hoy y sigan teniéndolo mañana.' },
    ],
  },
  promise: {
    id: 'promesa',
    kicker: 'Nuestra promesa',
    title: 'Construimos cada proyecto como si fuera para nosotros.',
    paragraphs: [
      'Con atención a los detalles, respeto por el entorno y compromiso hacia las personas que lo van a habitar.',
      'Diseñado para vivir hoy. Construido para perdurar.',
    ],
  },
  identity: {
    id: 'identidad',
    kicker: 'Identidad',
    title: 'La naturaleza no es decoración. Es parte del proyecto.',
    lead: 'Cada lugar tiene una identidad y cada proyecto, una forma de respetarla. Por eso, nuestros edificios toman el nombre de árboles autóctonos y se piensan para el barrio del que van a formar parte.',
    points: [
      {
        label: 'El verde como parte del diseño',
        text: 'La vegetación participa en las decisiones de fachada, balcones y terrazas. No se suma al final: se integra desde el inicio.',
      },
      {
        label: 'Una identidad propia',
        text: 'Cada edificio lleva el nombre de un árbol autóctono y expresa una firma reconocible, sin perder de vista el carácter de su barrio.',
      },
      {
        label: 'Un diálogo con el entorno',
        text: 'Integramos naturaleza y arquitectura para crear espacios que acompañen la vida cotidiana y se vinculen con la ciudad.',
      },
    ],
    close: 'Construimos pensando en la ciudad que queremos habitar mañana.',
  },
  pageCanonical: `${routes.about}/`,
} as const;
