import Link from 'next/link';
import { projects, projectsContent } from '@/content/projects';
import { routes, ui } from '@/content/shared';
import { PageHeader, RevealText } from '../components/Primitives';
import CtaBand from '../components/CtaBand';

export const metadata = {
  title: projectsContent.seo.title,
  description: projectsContent.seo.description,
  alternates: { canonical: projectsContent.pageCanonical },
  openGraph: { url: projectsContent.pageCanonical, title: projectsContent.seo.ogTitle },
};

/** Portfolio. Cada entrada de `projects` es una tarjeta; la página escala sin rediseño. */
export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        kicker={projectsContent.header.kicker}
        title={projectsContent.header.title}
        lead={projectsContent.header.lead}
      />

      <section className="section projects-list" aria-label={projectsContent.listLabel}>
        <ol className="projects-grid">
          {projects.map((entry, index) => (
            <li className="project-card reveal" key={entry.slug}>
              <Link
                className="project-card-media img-reveal"
                href={routes.project(entry.slug)}
                aria-label={`${entry.name}: ${projectsContent.card.ariaSuffix}`}>
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
                    <dt className="label">{ui.labels.program}</dt>
                    <dd>
                      {entry.program}
                      <span className="fact-sub">{entry.unitsLabel}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="label">{ui.labels.delivery}</dt>
                    <dd>{ui.labels.deliveryPrefixed(entry.deliveryYear)}</dd>
                  </div>
                </dl>
                <Link className="button button-arrow" href={routes.project(entry.slug)}>
                  {projectsContent.card.viewLabel}
                  <span className="button-arrow-icon" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ol>

        <p className="projects-note reveal">
          <span className="label">{projectsContent.upcoming.label}</span>
          {projectsContent.upcoming.text}
        </p>
      </section>

      <CtaBand title={ui.cta.title} text={ui.cta.text} link={ui.cta.link} />
    </>
  );
}
