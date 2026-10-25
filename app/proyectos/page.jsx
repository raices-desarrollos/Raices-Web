import Link from 'next/link';
import { projects, routes } from '../content/site';
import { PageHeader, RevealText } from '../components/Primitives';
import CtaBand from '../components/CtaBand';

export const metadata = {
  title: 'Proyectos',
  description:
    'Desarrollos de Raíces Developers en Buenos Aires. Ceibo Vidal, en Saavedra: planta baja y cuatro pisos con balcones, terraza propia y verde integrado desde el proyecto.',
  alternates: { canonical: `${routes.projects}/` },
  openGraph: { url: `${routes.projects}/`, title: 'Proyectos · Raíces Developers' },
};

/** Portfolio. Cada entrada de `projects` es una tarjeta; la página escala sin rediseño. */
export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        kicker="Proyectos"
        title="Edificios con nombre propio."
        lead="Cada desarrollo de Raíces toma el nombre de un árbol autóctono y se piensa para un barrio concreto. Hoy, Ceibo Vidal en Saavedra."
      />

      <section className="section projects-list" aria-label="Desarrollos">
        <ol className="projects-grid">
          {projects.map((entry, index) => (
            <li className="project-card reveal" key={entry.slug}>
              <Link className="project-card-media img-reveal" href={routes.project(entry.slug)} aria-label={`${entry.name}: ver el proyecto`}>
                <img
                  src={entry.cover.src}
                  width={entry.cover.width}
                  height={entry.cover.height}
                  alt={entry.cover.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  sizes="(max-width: 980px) 100vw, 60vw"
                />
                <span className="featured-media-veil" aria-hidden="true" />
              </Link>
              <div className="project-card-copy">
                <p className="kicker">
                  {entry.code} · {entry.status}
                </p>
                <h2>
                  <RevealText text={entry.name} />
                </h2>
                <p className="project-card-location">{entry.locationLong}</p>
                <p className="project-card-summary">{entry.summary}</p>
                <dl className="featured-facts">
                  <div>
                    <dt className="label">Programa</dt>
                    <dd>
                      {entry.program}
                      <span className="fact-sub">{entry.unitsLabel}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="label">Entrega</dt>
                    <dd>Prevista {entry.deliveryYear}</dd>
                  </div>
                </dl>
                <Link className="button button-arrow" href={routes.project(entry.slug)}>
                  Ver el proyecto
                  <span className="button-arrow-icon" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ol>

        <p className="projects-note reveal">
          <span className="label">Próximos desarrollos</span>
          Los nuevos proyectos de Raíces se publicarán en esta página.
        </p>
      </section>

      <CtaBand
        title="Construyamos lo que viene."
        text="Para compradores e inversores que quieran construir ciudad con más naturaleza."
        link={{ label: 'Hablemos', href: routes.contact }}
      />
    </>
  );
}
