import RevealLines from './RevealLines';

/**
 * Manifiesto de la Home: una sola frase a gran escala y su bajada. No crea texto, reubica el
 * que ya existe en `homeContent` (P07). El título se corta en líneas reales con SplitText.
 */
export default function Manifesto({ title, lead, id = 'manifiesto' }) {
  return (
    // Sin aria-labelledby: el título repite el del cierre y dos regiones con el mismo nombre confunden
    // a los lectores de pantalla (axe: landmark-unique).
    <section className="manifesto" id={id}>
      <div className="manifesto-inner">
        <span className="manifesto-rule" aria-hidden="true" />
        <RevealLines as="h2" id="manifesto-title" className="manifesto-title" text={title} />
        {lead ? <p className="manifesto-lead reveal">{lead}</p> : null}
      </div>
    </section>
  );
}
