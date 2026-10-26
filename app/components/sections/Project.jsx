import { Cota, SectionHeader } from '../Primitives';

/** Presentación arquitectónica y ficha técnica del proyecto. */
export default function Project({ content }) {
  const amenities = Array.isArray(content.amenities) ? content.amenities : [];

  return (
    <section className="section project-section" id="proyecto" aria-labelledby="proyecto-title">
      <SectionHeader>{content.sectionLabel}</SectionHeader>

      <div className="split-grid project-intro">
        <div className="reveal">
          <p className="kicker">{content.kicker}</p>
          <h2 id="proyecto-title" className="title-stroke">
            {content.title}
          </h2>
        </div>
        <div className="text-stack reveal">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {content.characteristics?.length ? (
            <ul className="characteristic-list">
              {content.characteristics.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          <div className="tag-row" aria-label={content.tagsLabel}>
            {content.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <Cota className="section-cota reveal">{content.specsLabel}</Cota>

      <div className="spec-grid reveal-stagger" aria-label={content.specsAriaLabel}>
        {content.specs.map((spec) => (
          <article className="spec-card" key={spec.label}>
            <span className="label">{spec.label}</span>
            <strong>{spec.value}</strong>
            {spec.note ? <small>{spec.note}</small> : null}
          </article>
        ))}
      </div>

      <div className="amenities amenities-described reveal">
        <span className="label">{content.amenitiesLabel}</span>
        <ul className="amenity-items">
          {amenities.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {content.extras?.length ? (
        <div className="amenities reveal">
          <span className="label">{content.extrasLabel}</span>
          <ul>
            {content.extras.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
