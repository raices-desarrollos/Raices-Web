import { notFound } from 'next/navigation';
import { getProject, projects } from '@/content/projects';
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
  return {
    title: { absolute: entry.seo.title },
    description: entry.seo.description,
    alternates: { canonical: entry.pageCanonical },
    openGraph: {
      url: entry.pageCanonical,
      title: entry.seo.ogTitle,
      description: entry.seo.description,
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
      {entry.intro ? <IntroBand label={entry.intro.label} items={entry.intro.items} /> : null}
      {entry.architecture ? <Project content={entry.architecture} /> : null}
      {entry.gallery ? <ProjectGallery items={entry.gallery.items} title={entry.gallery.title} /> : null}
      {entry.green ? <Green content={entry.green} /> : null}
      {entry.typologies ? <Typologies content={entry.typologies} renderNote={entry.renderNote} /> : null}
      {entry.location ? <Location content={entry.location} /> : null}
      {entry.partners ? (
        <Partners items={entry.partners.items} label={entry.partners.label} ariaLabel={entry.partners.ariaLabel} />
      ) : null}
      {entry.contact ? (
        <Contact
          id={entry.contact.id}
          kicker={entry.contact.kicker}
          title={entry.contact.title}
          text={entry.contact.text}
          cota={entry.contact.note}
          defaultSubject={entry.contact.defaultSubject}
          whatsappSource="project-contact"
        />
      ) : null}
    </>
  );
}
