import { Picture } from '../Primitives';

export default function Typologies({ content, renderNote }) {
  return (
    <section className="section section-alt plans-section" id="tipologias" aria-labelledby="tipologias-title">
      <div className="split-grid plans-intro">
        <div className="reveal">
          <p className="kicker">{content.kicker}</p>
          <h2 id="tipologias-title">{content.title}</h2>
        </div>
        <p className="reveal">{content.lead}</p>
      </div>

      <figure className="plan-overview reveal">
        <div className="plan-sheet">
          <Picture image={content.floorPlan} sizes="(max-width: 1180px) 100vw, 1180px" />
        </div>
        <figcaption>{content.floorPlanCaption}</figcaption>
      </figure>

      <div className="typology-grid">
        {content.units.map((typology) => (
          <article className="typology-card reveal" key={typology.id} id={`tipologia-${typology.id}`}>
            <div className="typology-copy">
              <span className="label">{typology.department}</span>
              <h3>{typology.title}</h3>
              {typology.program ? <p className="typology-program">{typology.program}</p> : null}
              <dl>
                {typology.areas.map((area) => (
                  <div key={area.label}>
                    <dt>{area.label}</dt>
                    <dd>{area.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="plan-sheet typology-sheet">
              <Picture image={typology.plan} sizes="(max-width: 980px) 100vw, 45vw" />
              <figure className="typology-render">
                <Picture image={typology.render} sizes="(max-width: 760px) 100vw, 25vw" />
                <figcaption>{renderNote}</figcaption>
              </figure>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
