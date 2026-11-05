import { Cota, Picture, SectionHeader } from '../Primitives';
import RevealLines from '../RevealLines';

export default function Location({ content }) {
  return (
    <section className="section section-alt location-section" id="ubicacion" aria-labelledby="ubicacion-title">
      <SectionHeader>{content.sectionLabel}</SectionHeader>

      <div className="location-layout">
        <div className="location-copy">
          <p className="kicker reveal">{content.kicker}</p>
          <RevealLines as="h2" id="ubicacion-title" className="location-title" lines={[content.intro]} />
          {content.lead ? <p className="location-lead reveal">{content.lead}</p> : null}
          <dl className="location-points reveal-stagger">
            {content.points.map((point) => (
              <div key={point.label}>
                <dt className="label">{point.label}</dt>
                <dd>{point.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="location-map reveal">
          <div className="plan-sheet">
            <Picture image={content.map} curtain sizes="(max-width: 1023px) 100vw, 60vw" />
          </div>
          <figcaption>
            <Cota>{content.mapCota}</Cota>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
