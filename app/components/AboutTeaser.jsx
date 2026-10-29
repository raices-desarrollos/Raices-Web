import Link from 'next/link';
import { homeContent } from '@/content/home';
import RevealLines from './RevealLines';

/**
 * Filosofía en la Home (Plan 5.1.3): texto a la izquierda, imagen monumental a la derecha que
 * sangra hasta el borde de la ventana. La bajada vive ahora en el Manifiesto; acá quedan el
 * título, el puente y los tres principios.
 */
export default function AboutTeaser() {
  const { about } = homeContent;

  return (
    <section className="about-teaser" id="raices" aria-labelledby="raices-title">
      <div className="about-teaser-inner">
        <div className="about-teaser-copy">
          <p className="kicker reveal">{about.kicker}</p>
          <RevealLines
            as="h2"
            id="raices-title"
            className="about-title"
            lines={[about.titleQuiet, about.titleEmphasis]}
            lineClassNames={['about-line-quiet', 'about-line-strong']}
          />
          {about.bridge ? <p className="about-bridge reveal">{about.bridge}</p> : null}

          <ol className="principles reveal-stagger">
            {about.principles.map((principle, index) => (
              <li key={principle.label}>
                <span className="principle-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{principle.label}</h3>
                <p>{principle.text}</p>
              </li>
            ))}
          </ol>

          <div className="about-teaser-foot reveal">
            <Link className="text-link text-link-arrow" href={about.link.href}>
              {about.link.label}
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </div>

        <figure className="about-plate img-curtain img-curtain-left">
          <img
            src={about.image.src}
            width={about.image.width}
            height={about.image.height}
            alt={about.image.alt}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 1023px) 100vw, 58vw"
          />
          <figcaption className="about-plate-note label">{about.image.note}</figcaption>
        </figure>
      </div>
    </section>
  );
}
