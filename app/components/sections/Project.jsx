import { project, specs } from '../../content/site';
import { Cota, SectionHeader } from '../Primitives';

/** Presentación arquitectónica y ficha técnica de Ceibo Vidal. */
export default function Project() {
  const amenities = [
    ...project.amenities.groundFloor,
    ...project.amenities.terrace,
    ...project.amenities.others,
  ];

  return (
    <section className="section project-section" id="proyecto" aria-labelledby="proyecto-title">
      <SectionHeader>Presentación</SectionHeader>

      <div className="split-grid project-intro">
        <div className="reveal">
          <p className="kicker">Arquitectura</p>
          <h2 id="proyecto-title" className="title-stroke">
            Dejar nuestras propias raíces en Saavedra.
          </h2>
        </div>
        <div className="text-stack reveal">
          <p>
            En un barrio en crecimiento, conectado y con identidad, decidimos dejar nuestras
            propias raíces. Ceibo Vidal es un edificio que busca el equilibrio entre ciudad y aire
            libre.
          </p>
          <p>
            Planta baja y cuatro pisos de tres unidades, cada una con balcón: cuatro niveles de
            balcones visibles desde la calle, rematados por una terraza propia.
          </p>
          <div className="tag-row" aria-label="Características del proyecto">
            <span>{project.status}</span>
            <span>PB + 4 pisos</span>
            <span>12 unidades</span>
            <span>Entrega {project.deliveryYear}</span>
          </div>
        </div>
      </div>

      <Cota className="section-cota reveal">Ficha técnica</Cota>

      <div className="spec-grid reveal-stagger" aria-label="Ficha técnica de Ceibo Vidal">
        {specs.map((spec) => (
          <article className="spec-card" key={spec.label}>
            <span className="label">{spec.label}</span>
            <strong>{spec.value}</strong>
            {spec.note ? <small>{spec.note}</small> : null}
          </article>
        ))}
      </div>

      <div className="amenities reveal">
        <span className="label">Espacios comunes</span>
        <ul>
          {amenities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
