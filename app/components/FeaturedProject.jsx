import Link from 'next/link';
import { home, routes } from '../content/site';
import { RevealText } from './Primitives';

/**
 * Proyecto destacado en la Home: imagen de gran formato con revelado y zoom al pasar el
 * cursor, logo del proyecto y acceso a su página. No repite la ficha completa.
 */
export default function FeaturedProject({ project }) {
  const href = routes.project(project.slug);

  return (
    <section className="featured" id="proyecto-destacado" aria-labelledby="featured-title">
      <div className="featured-inner">
        <Link className="featured-media reveal img-reveal" href={href} aria-label={`${project.name}: descubrir el proyecto`}>
          <img
            src={project.cover.src}
            width={project.cover.width}
            height={project.cover.height}
            alt={project.cover.alt}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 980px) 100vw, 56vw"
          />
          <span className="featured-media-veil" aria-hidden="true" />
          <span className="featured-media-note label">{project.cover.note || 'Render de referencia'}</span>
        </Link>

        <div className="featured-copy reveal">
          <p className="kicker">
            {home.featured.kicker} · {project.code}
          </p>
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
          <p className="featured-location">{project.location}</p>
          <p className="featured-summary">{project.summary}</p>

          <dl className="featured-facts">
            <div>
              <dt className="label">Programa</dt>
              <dd>PB + 4 pisos · 12 unidades</dd>
            </div>
            <div>
              <dt className="label">Entrega</dt>
              <dd>Prevista {project.deliveryYear}</dd>
            </div>
          </dl>

          <Link className="button button-arrow" href={href}>
            {home.featured.link.label}
            <span className="button-arrow-icon" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
