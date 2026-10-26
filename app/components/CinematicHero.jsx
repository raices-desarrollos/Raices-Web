import Link from 'next/link';
import { homeContent } from '@/content/home';
import { brand, ui } from '@/content/shared';
import { Cota, Picture } from './Primitives';

/**
 * Hero institucional a pantalla: la foto ocupa el campo, el texto la enmarca.
 * Si existe NEXT_PUBLIC_HERO_VIDEO, el video corre silencioso sobre la misma imagen.
 */
export default function CinematicHero() {
  const { hero } = homeContent;

  return (
    <section className="cine-hero" aria-labelledby="hero-title">
      <div className="cine-hero-media" aria-hidden="true">
        <Picture image={hero.media.image} className="cine-hero-image" priority />
        {hero.media.video ? (
          <video
            className="cine-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={hero.media.image.src}>
            <source src={hero.media.video} type="video/mp4" />
          </video>
        ) : null}
      </div>
      <div className="cine-hero-scrim" aria-hidden="true" />

      <div className="cine-hero-content">
        <p className="kicker hero-anim">{hero.kicker}</p>
        <h1 id="hero-title">
          <span className="hero-line hero-line-soft">
            <span>{hero.titleQuiet}</span>
          </span>
          <span className="hero-line hero-line-italic">
            <span>{hero.titleEmphasis}</span>
          </span>
        </h1>
        <p className="hero-lead hero-anim">{hero.lead}</p>
        <div className="hero-actions hero-anim">
          <Link className="button button-fill" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </Link>
          <Link className="button" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>

      <p className="hero-rail" aria-hidden="true">
        <span>01</span>
        <span>{brand.city}</span>
      </p>

      <div className="cine-hero-foot hero-anim">
        <Cota className="hero-cota">{hero.cota}</Cota>
        <span className="hero-note label">{hero.media.note}</span>
      </div>

      <a className="scroll-cue" href="#raices" aria-label={ui.scroll.ariaLabel}>
        <span className="scroll-cue-line" aria-hidden="true" />
        <span className="scroll-cue-label">{ui.scroll.label}</span>
      </a>
    </section>
  );
}
