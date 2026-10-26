import { Cota, Picture, SectionHeader } from '../Primitives';

export default function Location({ content }) {
  return (
    <section className="section section-alt location-section" id="ubicacion" aria-labelledby="ubicacion-title">
      <SectionHeader>{content.sectionLabel}</SectionHeader>

      <div className="location-layout">
        <div className="location-copy reveal">
          <p className="kicker">{content.kicker}</p>
          <h2 id="ubicacion-title" className="title-stroke">
            {content.intro}
          </h2>
          {content.lead ? <p className="location-lead">{content.lead}</p> : null}
          <dl className="location-points">
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
            <Picture image={content.map} sizes="(max-width: 980px) 100vw, 60vw" />
          </div>
          <figcaption>
            <Cota>{content.mapCota}</Cota>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
