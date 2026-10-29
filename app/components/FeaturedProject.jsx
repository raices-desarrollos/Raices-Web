import Link from 'next/link';
import { homeContent } from '@/content/home';
import { routes, ui } from '@/content/shared';
import FeaturedStage from './FeaturedStage';
import ProjectMark from './ProjectMark';
import WhatsAppLink from './WhatsAppLink';

/**
 * Proyecto destacado en la Home como capítulo fijo (Plan 5.1.4 / M07). En desktop el bloque
 * interior queda fijo mientras la columna de imagen recorre fachada, terraza y balcones; en
 * tablet y mobile no hay sticky: una sola imagen y la ficha debajo. Las tres imágenes salen de
 * `project.gallery.items`, el mismo material que la galería de Ceibo Vidal.
 */
export default function FeaturedProject({ project }) {
  const href = routes.project(project.slug);
  const panels = project.gallery.items;

  return (
    <section className="featured-chapter" id="proyecto-destacado" aria-labelledby="featured-title">
      <div className="featured-sticky">
        <div className="featured-copy reveal">
          <p className="kicker">{homeContent.featured.kicker}</p>
          <ProjectMark
            project={project}
            as="h2"
            id="featured-title"
            className="featured-mark"
            line={project.commercialLine}
          />

          <div className="featured-states" role="group" aria-label={ui.labels.featuredStates}>
            {project.featuredStates.map((state, index) => (
              <div className="featured-state" key={state.label} style={{ '--i': index }}>
                <p className="featured-state-label">
                  <span className="featured-state-index">
                    {String(index + 1).padStart(2, '0')} / {String(project.featuredStates.length).padStart(2, '0')}
                  </span>
                  <span className="featured-state-name">{state.label}</span>
                </p>
                <p className="featured-state-text">{state.text}</p>
              </div>
            ))}
          </div>

          <dl className="featured-facts">
            <div>
              <dt className="label">{ui.labels.program}</dt>
              <dd>
                {project.program}
                <span className="fact-sub">{project.unitsLabel}</span>
              </dd>
            </div>
            <div>
              <dt className="label">{ui.labels.delivery}</dt>
              <dd>{ui.labels.deliveryPrefixed(project.deliveryYear)}</dd>
            </div>
          </dl>

          <div className="featured-actions">
            <Link className="button button-arrow" href={href}>
              {homeContent.featured.link.label}
              <span className="button-arrow-icon" aria-hidden="true">
                →
              </span>
            </Link>
            <WhatsAppLink source="featured" className="text-link featured-wa">
              {ui.whatsapp.consultLabel}
            </WhatsAppLink>
          </div>
        </div>

        <FeaturedStage
          panels={panels}
          href={href}
          label={`${project.name}: ${homeContent.featured.mediaAriaSuffix}`}
        />
      </div>
    </section>
  );
}
