import Link from 'next/link';
import { Cota, RevealText } from './Primitives';

/** Cierre de página: título grande, una frase y un único botón. */
export default function CtaBand({ title, text, link, cota, atmosphere }) {
  return (
    <section
      className={`cta-band${atmosphere ? ' has-atmosphere' : ''}${title.length > 28 ? ' cta-band-long' : ''}`}
      aria-labelledby="cta-title">
      {atmosphere ? (
        <div className="cta-atmosphere" aria-hidden="true">
          <img src={atmosphere.src} width={atmosphere.width} height={atmosphere.height} alt="" />
        </div>
      ) : null}
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
