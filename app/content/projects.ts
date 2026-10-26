import { ceiboVidalContent } from './ceibo-vidal';
import { brand, routes } from './shared';

/**
 * Registry de desarrollos. Cada entrada es un archivo propio en `app/content/`.
 * Hoy existe un único proyecto. No agregar desarrollos que no estén confirmados.
 */
export const projectBySlug = {
  'ceibo-vidal': ceiboVidalContent,
} as const;

export type ProjectSlug = keyof typeof projectBySlug;
export type ProjectContent = (typeof projectBySlug)[ProjectSlug];

export const projects: ProjectContent[] = Object.values(projectBySlug);
export const featuredProject = projects[0];

export function getProject(slug: string): ProjectContent | undefined {
  if (slug in projectBySlug) {
    return projectBySlug[slug as ProjectSlug];
  }
  return undefined;
}

export const projectsContent = {
  seo: {
    title: 'Proyectos',
    description:
      'Desarrollos de Raíces Developers en Buenos Aires. Ceibo Vidal, en Saavedra: planta baja y cuatro pisos con balcones, terraza propia y verde integrado desde el proyecto.',
    ogTitle: `Proyectos · ${brand.name}`,
  },
  header: {
    kicker: 'Proyectos',
    title: 'Edificios con nombre propio.',
    lead: 'Cada desarrollo de Raíces toma el nombre de un árbol autóctono y se piensa para un barrio concreto. Hoy, Ceibo Vidal en Saavedra.',
  },
  listLabel: 'Desarrollos',
  card: {
    viewLabel: 'Ver el proyecto',
    ariaSuffix: 'ver el proyecto',
  },
  upcoming: {
    label: 'Próximos desarrollos',
    text: 'Los nuevos proyectos de Raíces se publicarán en esta página.',
  },
  pageCanonical: `${routes.projects}/`,
} as const;
