import Link from 'next/link';
import { ui } from '@/content/shared';
import { Cota, Picture, RevealText } from '../Primitives';
import WhatsAppLink from '../WhatsAppLink';

/** Hero de la página del proyecto: fachada a pantalla completa, mismo velo que la Home. */
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
          <Link className="button button-fill" href={entry.hero.primaryCta.href}>
            {entry.hero.primaryCta.label}
          </Link>
          <WhatsAppLink source="project-hero" className="button">
            {entry.hero.secondaryCta.label || ui.whatsapp.consultLabel}
          </WhatsAppLink>
        </div>
      </div>

      <div className="hero-foot hero-anim">
        <Cota className="hero-cota">
          {entry.name} · {entry.locationLong}
        </Cota>
        <span className="hero-note label">{entry.renderNote}</span>
      </div>
    </section>
  );
}
