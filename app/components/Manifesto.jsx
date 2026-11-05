import Link from 'next/link';
import RevealLines from './RevealLines';

/**
 * Filosofía de la Home: una sola sección editorial. Título a gran escala, una descripción
 * breve y un único enlace a Nosotros. El desarrollo de los criterios vive en /nosotros.
 */
export default function Manifesto({ title, lead, link, id = 'manifiesto' }) {
  return (
    <section className="manifesto" id={id} aria-labelledby="manifesto-title">
      <div className="manifesto-inner">
        <span className="manifesto-rule" aria-hidden="true" />
        <RevealLines as="h2" id="manifesto-title" className="manifesto-title" text={title} />
        {lead ? <p className="manifesto-lead reveal">{lead}</p> : null}
        {link ? (
          <div className="manifesto-link reveal">
            <Link className="text-link text-link-arrow" href={link.href}>
              {link.label}
              <span className="text-link-arrow-icon" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
