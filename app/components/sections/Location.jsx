import { location, project } from '../../content/site';
import { Cota, Picture, SectionHeader } from '../Primitives';

export default function Location() {
  return (
    <section className="section section-alt location-section" id="ubicacion" aria-labelledby="ubicacion-title">
      <SectionHeader>Ubicación</SectionHeader>

      <div className="location-layout">
        <div className="location-copy reveal">
          <p className="kicker">
            {project.address} · {project.neighborhood}
          </p>
          <h2 id="ubicacion-title" className="title-stroke">
            {location.intro}
          </h2>
          <dl className="location-points">
            {location.points.map((point) => (
              <div key={point.label}>
                <dt className="label">{point.label}</dt>
                <dd>{point.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="location-map reveal">
          <div className="plan-sheet">
            <Picture image={location.map} sizes="(max-width: 980px) 100vw, 60vw" />
          </div>
          <figcaption>
            <Cota>Saavedra · CABA</Cota>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
