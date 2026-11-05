import Link from 'next/link';
import { ui } from '@/content/shared';
import { Cota, Picture } from '../Primitives';
import ProjectMark from '../ProjectMark';
import RevealLines from '../RevealLines';
import WhatsAppLink from '../WhatsAppLink';

/**
 * Hero de la página del proyecto (Plan 5.2.1): dos paneles de ancho igual. A la izquierda la
 * ficha sobre Carbón; a la derecha la fachada vertical a sangre hasta el borde, que se descubre
 * con la cortina. En mobile la fachada va arriba y el texto debajo. Una sola acción rellena
 * (WhatsApp) y una de contorno (tipologías).
 */
export default function ProjectHero({ entry }) {
  return (
    <section className="pj-hero" id="inicio" aria-labelledby="hero-title">
      <div className="pj-hero-copy">
        <ProjectMark project={entry} className="pj-hero-mark hero-anim" logoWidth={180} priority />
        <RevealLines as="h1" id="hero-title" className="pj-hero-title" text={entry.headline} immediate delay={280} />
        <span className="pj-hero-rule hero-anim" aria-hidden="true" />
        <p className="pj-hero-lead hero-anim">{entry.hero.lead || entry.summary}</p>
        <div className="hero-actions pj-hero-actions hero-anim">
          <WhatsAppLink source="project-hero" className="button button-fill">
            {entry.hero.secondaryCta.label || ui.whatsapp.consultLabel}
          </WhatsAppLink>
          <Link className="button button-arrow" href={entry.hero.primaryCta.href}>
            {entry.hero.primaryCta.label}
            <span className="button-arrow-icon" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
        <div className="pj-hero-foot hero-anim">
          <Cota className="pj-hero-cota">
            {entry.locationShort}
          </Cota>
        </div>
      </div>

      <div className="pj-hero-media img-curtain">
        <Picture image={entry.cover} priority sizes="(max-width: 1023px) 100vw, 50vw" />
        <span className="pj-hero-veil" aria-hidden="true" />
        <span className="pj-hero-note label">{entry.renderNote}</span>
      </div>
    </section>
  );
}
