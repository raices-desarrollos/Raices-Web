import Link from 'next/link';
import { homeContent } from '@/content/home';
import { Cota, RevealText } from './Primitives';

/** Presentación institucional breve en la Home: título editorial, texto y tres principios. */
export default function AboutTeaser() {
  const { about } = homeContent;

  return (
    <section className="section about-teaser" id="raices" aria-labelledby="raices-title">
      <div className="about-teaser-inner">
        <div className="about-teaser-head">
          <p className="kicker reveal">{about.kicker}</p>
          <h2 id="raices-title" className="reveal">
            <span className="about-line about-line-soft">
              <RevealText text={about.titleQuiet} />
            </span>
            <span className="about-line about-line-italic">
              <RevealText text={about.titleEmphasis} delay={2} />
            </span>
          </h2>
        </div>

        <figure className="about-plate mask-reveal reveal">
          <img
            src={about.image.src}
            width={about.image.width}
            height={about.image.height}
            alt={about.image.alt}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 980px) 100vw, 42vw"
          />
          <figcaption className="about-plate-note label">{about.image.note}</figcaption>
        </figure>

        <div className="about-teaser-body">
          <p className="about-teaser-lead reveal">{about.lead}</p>

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
            <Cota className="about-cota">{about.cota}</Cota>
            <Link className="text-link text-link-arrow" href={about.link.href}>
              {about.link.label}
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
