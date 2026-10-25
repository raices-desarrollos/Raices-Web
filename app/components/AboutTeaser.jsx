import Link from 'next/link';
import { home } from '../content/site';
import { Cota, RevealText } from './Primitives';

/** Presentación institucional breve en la Home: título editorial, texto y tres principios. */
export default function AboutTeaser() {
  const { about } = home;

  return (
    <section className="section about-teaser" id="raices" aria-labelledby="raices-title">
      <div className="about-teaser-inner">
        <div className="about-teaser-head">
          <p className="kicker reveal">{about.kicker}</p>
          <h2 id="raices-title" className="reveal">
            <RevealText text={about.title} />
          </h2>
        </div>

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
            <Cota className="about-cota">Naturaleza urbana con criterio</Cota>
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
