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
    lead: 'Creemos que un edificio debe estar pensado primero para quien lo va a habitar —y después para quien lo va a vender—.',
  },
  philosophy: {
    sectionLabel: 'Qué creemos',
    kicker: '',
    title: 'La confianza se gana cumpliendo.',
    paragraphs: [
      'Comprar una propiedad es una de las decisiones más importantes en la vida de una persona.',
      'Detrás de cada unidad hay años de trabajo, ahorro, esfuerzo y expectativas.',
    ],
    quote: 'Por eso creemos que la confianza no se gana con promesas. Se gana cumpliendo.',
  },
  practice: {
    id: 'construir',
    kicker: 'Nuestra forma de construir',
    title: 'Tomamos decisiones con criterio.',
    lead: 'Creemos que la buena arquitectura y la buena ingeniería tienen algo en común: cuando están bien hechas, no necesitan explicarse.',
    points: [
      'Valoramos la simplicidad.',
      'Preferimos las soluciones duraderas a las modas.',
      'Nos gustan los espacios luminosos, funcionales y fáciles de vivir.',
    ],
  },
  promise: {
    id: 'promesa',
    kicker: 'Nuestra promesa',
    title: 'Vamos a construir cada proyecto como si fuera para nosotros.',
  },
  identity: {
    id: 'identidad',
    kicker: 'Identidad',
    title: 'La naturaleza no es decoración. Es parte del proyecto.',
    lead: 'Cada proyecto toma el nombre de un árbol autóctono y se piensa para un barrio concreto.',
    points: [
      'El verde entra en la decisión de fachada, balcones y terraza. No es decoración: es parte del proyecto.',
      'Edificios con nombre de árbol autóctono y una firma reconocible, pensados para un barrio concreto.',
      'La vegetación se integra a la arquitectura y al entorno urbano.',
    ],
  },
  pageCanonical: `${routes.about}/`,
} as const;
