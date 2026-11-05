import Link from 'next/link';
import { homeContent } from '@/content/home';
import { routes } from '@/content/shared';
import ProjectCarousel from './ProjectCarousel';
import ProjectMark from './ProjectMark';

/**
 * Presentación de Ceibo Vidal en la Home: identificación del proyecto (logo, lugar, una línea
 * del texto vigente y CTA) y, debajo, la galería horizontal como adelanto visual. El detalle
 * completo (renders, planos, tipologías) vive en /proyectos/ceibo-vidal.
 */
export default function FeaturedProject({ project }) {
  const href = routes.project(project.slug);
  const items = [...project.homeGallery].sort((a, b) => a.order - b.order);
  const { featured } = homeContent;

  return (
    <section className="featured-chapter" id="proyecto-destacado" aria-labelledby="featured-title">
      <div className="featured-head">
        <div className="featured-copy reveal">
          <p className="kicker">{featured.kicker}</p>
          <ProjectMark project={project} as="h2" id="featured-title" className="featured-mark" address={featured.address} />
        </div>
        <div className="featured-intro reveal">
          <p className="featured-text">{project.homeParagraphs[1]}</p>
          <Link className="button button-arrow" href={href}>
            {featured.cta}
            <span className="button-arrow-icon" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
      <ProjectCarousel items={items} />
    </section>
  );
}
