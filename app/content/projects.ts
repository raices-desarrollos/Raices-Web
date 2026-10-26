import { ceiboVidalContent } from './ceibo-vidal';
import { routes } from './shared';

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
    title: 'Proyectos | Raíces Developers',
    description: 'Conocé los desarrollos inmobiliarios de Raíces Developers en Buenos Aires.',
    ogTitle: 'Proyectos | Raíces Developers',
  },
  header: {
    kicker: 'Proyectos',
    title: 'Nuestros desarrollos.',
    /**
     * Adaptación editorial, no es cita literal del brief.
     * Ver docs/CONTENT_REVIEW.md.
     */
    lead: 'Cada proyecto sigue una idea simple: hacer edificios en los que nosotros mismos viviríamos.',
  },
  listLabel: 'Desarrollos',
  card: {
    viewLabel: 'Descubrir el proyecto',
    ariaSuffix: 'descubrir el proyecto',
  },
  upcoming: {
    label: 'Próximos desarrollos',
    text: 'Los nuevos proyectos de Raíces se publicarán en esta página.',
  },
  pageCanonical: `${routes.projects}/`,
} as const;
