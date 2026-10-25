import { floorPlan, typologies, project } from '../../content/site';
import { Picture } from '../Primitives';

export default function Typologies() {
  return (
    <section className="section section-alt plans-section" id="tipologias" aria-labelledby="tipologias-title">
      <div className="split-grid plans-intro">
        <div className="reveal">
          <p className="kicker">Planos</p>
          <h2 id="tipologias-title">Tres tipologías por planta, todas con balcón.</h2>
        </div>
        <p className="reveal">
          La planta tipo organiza un monoambiente, un dos ambientes y un tres ambientes alrededor
          del núcleo de circulación. Cada unidad incorpora expansión exterior hacia frente o
          contrafrente.
        </p>
      </div>

      <figure className="plan-overview reveal">
        <div className="plan-sheet">
          <Picture image={floorPlan} sizes="(max-width: 1180px) 100vw, 1180px" />
        </div>
        <figcaption>
          Planta tipo · Departamento A 3 ambientes · B monoambiente · C 2 ambientes
        </figcaption>
      </figure>

      <div className="typology-grid">
        {typologies.map((typology) => (
          <article className="typology-card reveal" key={typology.id} id={`tipologia-${typology.id}`}>
            <div className="typology-copy">
              <span className="label">{typology.department}</span>
              <h3>{typology.title}</h3>
              <dl>
                {typology.areas.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="plan-sheet typology-sheet">
              <Picture image={typology.plan} sizes="(max-width: 980px) 100vw, 45vw" />
              <figure className="typology-render">
                <Picture image={typology.render} sizes="(max-width: 760px) 100vw, 25vw" />
                <figcaption>{project.renderNote}</figcaption>
              </figure>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
