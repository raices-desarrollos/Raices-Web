import Link from 'next/link';
import { Cota, RevealText } from './Primitives';

/** Cierre de página: título grande, una frase y un único botón. */
export default function CtaBand({ title, text, link, cota }) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="cta-band-inner reveal">
        {cota ? <Cota className="cta-cota">{cota}</Cota> : null}
        <h2 id="cta-title">
          <RevealText text={title} />
        </h2>
        {text ? <p className="cta-text">{text}</p> : null}
        <Link className="button button-large button-arrow" href={link.href}>
          {link.label}
          <span className="button-arrow-icon" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
