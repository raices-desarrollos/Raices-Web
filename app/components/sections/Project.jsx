import { project, specs } from '../../content/site';
import { Cota, Picture, SectionHeader } from '../Primitives';

export default function Project() {
  const amenities = [
    ...project.amenities.groundFloor,
    ...project.amenities.terrace,
    ...project.amenities.others,
  ];

  return (
    <section className="section project-section" id="ceibo-vidal" aria-labelledby="proyecto-title">
      <SectionHeader>{project.code}</SectionHeader>

      <div className="project-layout">
        <div className="project-copy reveal">
          <img
            className="project-logo"
            src={project.logo.src}
            width={project.logo.width}
            height={project.logo.height}
            alt="Ceibo"
            loading="lazy"
            decoding="async"
          />
          <p className="kicker">
            {project.address} · {project.neighborhood}, {project.city}
          </p>
          <h2 id="proyecto-title" className="title-stroke">
            Un edificio bajo, claro y vegetal.
          </h2>
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

        <figure className="project-figure reveal">
          <Picture image={project.facade} sizes="(max-width: 980px) 100vw, 50vw" />
          <figcaption>{project.renderNote} · Fachada sobre Vidal</figcaption>
        </figure>
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
