import { Picture, SectionHeader } from '../Primitives';

export default function Green({ content }) {
  return (
    <section className="section green-section" id="verde" aria-labelledby="verde-title">
      <SectionHeader>{content.sectionLabel}</SectionHeader>
      <div className="green-intro reveal">
        <p className="kicker">{content.kicker}</p>
        <h2 id="verde-title" className="title-stroke">
          {content.title}
        </h2>
      </div>

      <div className="feature-grid">
        {content.features.map((feature) => (
          <article
            className={`feature-card${feature.wide ? ' feature-card-wide' : ''}${feature.system ? ' system-card' : ''} reveal`}
            key={feature.id}>
            {feature.system ? (
              <div className="system-diagram" aria-hidden="true">
                <span className="root-line root-line-one" />
                <span className="root-line root-line-two" />
                <span className="root-line root-line-three" />
              </div>
            ) : null}
            {feature.image ? (
              <figure>
                <Picture image={feature.image} sizes={feature.wide ? '(max-width: 980px) 100vw, 60vw' : '(max-width: 980px) 100vw, 50vw'} />
                <figcaption>{feature.note}</figcaption>
              </figure>
            ) : null}
            <div className="feature-copy">
              <span className="label">{feature.label}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
