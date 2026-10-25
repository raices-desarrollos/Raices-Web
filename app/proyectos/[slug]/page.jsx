import { notFound } from 'next/navigation';
import { getProject, projects, routes, project } from '../../content/site';
import ProjectHero from '../../components/sections/ProjectHero';
import IntroBand from '../../components/sections/IntroBand';
import Project from '../../components/sections/Project';
import ProjectGallery from '../../components/ProjectGallery';
import Green from '../../components/sections/Green';
import Typologies from '../../components/sections/Typologies';
import Location from '../../components/sections/Location';
import Partners from '../../components/sections/Partners';
import Contact from '../../components/sections/Contact';

/** Export estático: una carpeta por proyecto definido en `projects`. */
export function generateStaticParams() {
  return projects.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = getProject(slug);
  if (!entry) return {};
  const title = entry.name;
  const description = `${entry.name}, ${entry.locationLong}. ${entry.summary} ${entry.delivery}.`;
  return {
    title,
    description,
    alternates: { canonical: `${routes.project(entry.slug)}/` },
    openGraph: {
      url: `${routes.project(entry.slug)}/`,
      title: `${title} · Raíces Developers`,
      description,
      images: [{ url: entry.cover.src, width: entry.cover.width, height: entry.cover.height, alt: entry.cover.alt }],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const entry = getProject(slug);
  if (!entry) notFound();

  return (
    <>
      <ProjectHero entry={entry} />
      <IntroBand
        label="Síntesis del proyecto"
        items={[
          { label: 'Ubicación', text: `${project.address} · ${project.neighborhood}, ${project.city}` },
          { label: 'Programa', text: `${project.height} · ${project.units}` },
          { label: 'Entrega', text: project.delivery },
        ]}
      />
      <Project />
      <ProjectGallery items={entry.gallery} title="Galería" />
      <Green />
      <Typologies />
      <Location />
      <Partners />
      <Contact
        id="consultas"
        kicker="Consultas comerciales"
        title={`Hablemos de ${entry.name}.`}
        defaultSubject={entry.name}
        whatsappSource="project-contact"
      />
    </>
  );
}
