import Link from 'next/link';
import { Cota } from './Primitives';
import RevealLines from './RevealLines';
import WhatsAppLink from './WhatsAppLink';

/**
 * Cierre de página: título monumental, una línea que se traza y, debajo, la frase a la izquierda y
 * la acción a la derecha. Con `whatsapp` ({ source, label }) el
 * botón relleno es WhatsApp y `link` pasa a contorno; sin él, `link` es el único botón.
 */
export default function CtaBand({ title, text, link, cota, atmosphere, whatsapp }) {
  return (
    <section
      className={`cta-band${atmosphere ? ' has-atmosphere' : ''}${title.length > 28 ? ' cta-band-long' : ''}`}
      aria-labelledby="cta-title">
      {atmosphere ? (
        <div className="cta-atmosphere" aria-hidden="true">
          <img
            src={atmosphere.src}
            width={atmosphere.width}
            height={atmosphere.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      <div className="cta-band-inner reveal">
        {cota ? <Cota className="cta-cota">{cota}</Cota> : null}
        <RevealLines as="h2" id="cta-title" text={title} />
        <div className="cta-foot">
          {text ? <p className="cta-text">{text}</p> : null}
          <div className="cta-actions">
            {whatsapp ? (
              <WhatsAppLink source={whatsapp.source} className="button button-large button-fill">
                {whatsapp.label}
              </WhatsAppLink>
            ) : null}
            <Link className="button button-large button-arrow" href={link.href}>
              {link.label}
              <span className="button-arrow-icon" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
