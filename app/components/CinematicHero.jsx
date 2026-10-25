import Link from 'next/link';
import { brand, heroMedia, home } from '../content/site';
import { Cota, Picture } from './Primitives';

/**
 * Hero institucional a pantalla completa. Sin video final, la imagen de referencia lleva un
 * movimiento de cámara lento (Ken Burns) y un velo oscuro para la lectura. Si existe
 * NEXT_PUBLIC_HERO_VIDEO, el video se reproduce silencioso en bucle sobre la misma imagen
 * (que queda como poster y como fallback con movimiento reducido).
 */
export default function CinematicHero() {
  const { hero } = home;

  return (
    <section className="cine-hero" aria-labelledby="hero-title">
      <div className="cine-hero-media" aria-hidden="true">
        <Picture image={heroMedia.image} className="cine-hero-image" priority />
        {heroMedia.video ? (
          <video
            className="cine-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroMedia.image.src}>
            <source src={heroMedia.video} type="video/mp4" />
          </video>
        ) : null}
        <div className="cine-hero-scrim" />
      </div>

      <div className="cine-hero-content">
        <div className="hero-kicker-row hero-anim">
          <img
            className="hero-mark logo-on-dark"
            src={brand.logos.icon.src}
            width={brand.logos.icon.width}
            height={brand.logos.icon.height}
            alt=""
          />
          <p className="kicker">{hero.kicker}</p>
        </div>
        <h1 id="hero-title">
          <span className="hero-line hero-line-soft">{hero.titleQuiet}</span>
          <span className="hero-line hero-line-italic">{hero.titleEmphasis}</span>
        </h1>
        <p className="hero-lead hero-anim">{hero.lead}</p>
        <div className="hero-actions hero-anim">
          <Link className="button button-fill" href={hero.primary.href}>
            {hero.primary.label}
          </Link>
          <Link className="button" href={hero.secondary.href}>
            {hero.secondary.label}
          </Link>
        </div>
      </div>

      <div className="cine-hero-foot hero-anim">
        <Cota className="hero-cota">
          {brand.name} · {brand.city}
        </Cota>
        <span className="hero-note label">{heroMedia.note}</span>
      </div>

      <a className="scroll-cue hero-anim" href="#raices" aria-label="Bajar al contenido">
        <span className="scroll-cue-line" aria-hidden="true" />
        <span className="scroll-cue-label">Scroll</span>
      </a>
    </section>
  );
}
