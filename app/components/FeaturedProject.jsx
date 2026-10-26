import Link from 'next/link';
import { homeContent } from '@/content/home';
import { routes, ui } from '@/content/shared';
import { RevealText } from './Primitives';

/**
 * Proyecto destacado en la Home: lámina de la fachada a la izquierda y ficha editorial
 * a la derecha. No vuelca el detalle comercial de /proyectos/[slug].
 */
export default function FeaturedProject({ project }) {
  const href = routes.project(project.slug);

  return (
    <section className="featured" id="proyecto-destacado" aria-labelledby="featured-title">
      <div className="featured-inner">
        <Link
          className="featured-media reveal img-reveal"
          href={href}
          aria-label={`${project.name}: ${homeContent.featured.mediaAriaSuffix}`}>
          <img
            src={project.cover.src}
            width={project.cover.width}
            height={project.cover.height}
            alt={project.cover.alt}
            loading="lazy"
            decoding="async"
            sizes="100vw"
          />
          <span className="featured-media-veil" aria-hidden="true" />
          <span className="media-shutter" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => (
              <span key={index} style={{ '--shutter': index }} />
            ))}
          </span>
          <span className="featured-hover-meta">
            <span className="label">{ui.labels.location}</span>
            <span>{project.locationLong}</span>
          </span>
          <span className="featured-media-note label">{project.cover.note}</span>
        </Link>

        <div className="featured-copy reveal">
          <p className="kicker">{homeContent.featured.kicker}</p>
          <img
            className="featured-logo"
            src={project.logo.src}
            width={project.logo.width}
            height={project.logo.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <h2 id="featured-title">
            <RevealText text={project.name} />
          </h2>
          <p className="featured-location">{project.locationShort}</p>
          <div className="featured-summary">
            {(project.homeParagraphs ?? [project.summary]).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
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

          <Link className="button button-arrow" href={href}>
            {homeContent.featured.link.label}
            <span className="button-arrow-icon" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
