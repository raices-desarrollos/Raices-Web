import { brand, routes } from './shared';

export const aboutContent = {
  seo: {
    title: 'Nosotros',
    description:
      'Raíces Developers es una desarrolladora inmobiliaria de Buenos Aires. Edificios con nombre de árbol autóctono, verde integrado desde el proyecto y mirada de largo plazo.',
    ogTitle: `Nosotros · ${brand.name}`,
  },
  header: {
    kicker: 'Nosotros',
    title: 'La ciudad también puede echar raíces.',
    lead: 'Somos una desarrolladora inmobiliaria de Buenos Aires. Hacemos edificios con identidad propia, verde integrado desde el proyecto y escala de barrio.',
  },
  philosophy: {
    sectionLabel: 'Filosofía',
    kicker: 'Naturaleza urbana',
    title: 'La naturaleza no es decoración. Es parte del proyecto.',
    paragraphs: [
      'Raíces nace para desarrollar edificios que no se sientan como piezas repetidas del mercado. Cada proyecto toma el nombre de un árbol autóctono y busca dejar algo vivo en su entorno.',
      'El verde entra en la decisión de fachada, balcones, terraza, riego y mantenimiento. Invertir en verde es una decisión de largo plazo, y la sostenemos en cada edificio.',
    ],
    quote: 'Raíces construye edificios que tienen historia antes de inaugurarse.',
  },
  identity: {
    kicker: 'Por qué Raíces',
    title: 'Menos repetición. Más identidad propia.',
    lead: 'Tres decisiones que definen cada proyecto de Raíces.',
    points: [
      'Cada edificio se nombra como un árbol autóctono: Ceibo, Jacarandá, Ombú y los que vengan.',
      'El verde es una decisión de proyecto y de marca: mejora la vida cotidiana y deja una firma reconocible.',
      'Construimos con mirada de largo plazo: edificios que ganan valor con el tiempo y una desarrolladora con criterio propio.',
    ],
  },
  pageCanonical: `${routes.about}/`,
} as const;
