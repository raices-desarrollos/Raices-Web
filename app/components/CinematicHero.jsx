import Link from 'next/link';
import { homeContent } from '@/content/home';
import { featuredProject } from '@/content/projects';
import { routes } from '@/content/shared';
import { Picture } from './Primitives';
import HeroContactCard from './HeroContactCard';
import RevealLines from './RevealLines';

/**
 * Hero institucional a pantalla: la foto ocupa el campo, el texto la enmarca (Plan M02).
 * H1 en dos líneas explícitas (RevealLines static: sin medición, sin CLS), una sola acción
 * editorial hacia Ceibo Vidal. El contacto vive en `HeroContactCard`.
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
        <RevealLines
          as="h1"
          id="hero-title"
          className="hero-title"
          lines={[hero.titleQuiet, hero.titleEmphasis]}
          lineClassNames={['hero-line-quiet', 'hero-line-strong']}
          delay={520}
          immediate
        />
        <p className="hero-lead hero-anim">{hero.lead}</p>
        <div className="hero-actions hero-anim">
          <Link className="button button-arrow" href={routes.project(featuredProject.slug)}>
            {homeContent.featured.link.label}
            <span className="button-arrow-icon" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>

      <HeroContactCard />

      <div className="cine-hero-foot hero-anim">
        <span className="hero-note label">{hero.media.note}</span>
      </div>
    </section>
  );
}
