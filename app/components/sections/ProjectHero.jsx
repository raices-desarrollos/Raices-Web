import Link from 'next/link';
import { project } from '../../content/site';
import { Cota, Picture, RevealText } from '../Primitives';
import WhatsAppLink from '../WhatsAppLink';

/** Hero de la página del proyecto: render de fachada en columna derecha con velo hacia Tinta. */
export default function ProjectHero({ entry }) {
  return (
    <section className="hero project-hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <Picture image={{ ...entry.cover, alt: '' }} className="hero-image" priority />
        <div className="hero-scrim" />
      </div>

      <div className="hero-content">
        <img
          className="hero-project-logo"
          src={entry.logo.src}
          width={entry.logo.width}
          height={entry.logo.height}
          alt={entry.name}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <p className="kicker hero-anim">
          {entry.code} · {entry.locationLong}
        </p>
        <h1 id="hero-title" className="title-stroke">
          <RevealText text={entry.headline} className="is-visible" />
        </h1>
        <p className="hero-lead hero-anim">{entry.summary}</p>
        <div className="hero-actions hero-anim">
          <Link className="button button-fill" href="#tipologias">
            Ver tipologías
          </Link>
          <WhatsAppLink source="project-hero" className="button">
            Consultar por WhatsApp
          </WhatsAppLink>
        </div>
      </div>

      <div className="hero-foot hero-anim">
        <Cota className="hero-cota">
          {entry.name} · {entry.locationLong}
        </Cota>
        <span className="hero-note label">{project.renderNote}</span>
      </div>
    </section>
  );
}
