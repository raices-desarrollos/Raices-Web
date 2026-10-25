import { brand, project } from '../../content/site';
import { Cota, Picture, WhatsAppLink } from '../Primitives';

export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <Picture image={{ ...project.facade, alt: '' }} className="hero-image" priority />
        <div className="hero-scrim" />
      </div>

      <div className="hero-content">
        <img
          className="hero-logo logo-on-dark"
          src={brand.logos.full.src}
          width={brand.logos.full.width}
          height={brand.logos.full.height}
          alt={brand.name}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <h1 id="hero-title" className="title-stroke">
          {brand.claim}
        </h1>
        <p className="hero-lead">
          Edificios con verde integrado desde el proyecto, identidad propia y escala de barrio.
          Primer proyecto: Ceibo Vidal, en Saavedra.
        </p>
        <div className="hero-actions">
          <a className="button" href="#ceibo-vidal">
            Ver Ceibo Vidal
          </a>
          <WhatsAppLink source="hero" className="button">
            Consultar por WhatsApp
          </WhatsAppLink>
        </div>
      </div>

      <div className="hero-foot">
        <Cota className="hero-cota">
          {project.name} · {project.address} · {project.neighborhood}, {project.city}
        </Cota>
        <span className="hero-note label">{project.renderNote}</span>
      </div>
    </section>
  );
}
