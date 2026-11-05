import { homeContent } from '@/content/home';
import { featuredProject } from '@/content/projects';
import CinematicHero from './components/CinematicHero';
import Manifesto from './components/Manifesto';
import FeaturedProject from './components/FeaturedProject';
import CtaBand from './components/CtaBand';
import LegacyHashRedirect from './components/LegacyHashRedirect';

/** Home institucional de Raíces. El detalle de cada desarrollo vive en /proyectos/[slug]. */
export default function Home() {
  return (
    <>
      <LegacyHashRedirect />
      <CinematicHero />
      <Manifesto title={homeContent.about.title} lead={homeContent.about.lead} link={homeContent.about.link} />
      <FeaturedProject project={featuredProject} />
      <CtaBand title={homeContent.cta.title} link={homeContent.cta.link} />
    </>
  );
}
