import { homeContent } from '@/content/home';
import { featuredProject } from '@/content/projects';
import LogoIntro from './components/LogoIntro';
import CinematicHero from './components/CinematicHero';
import AboutTeaser from './components/AboutTeaser';
import FeaturedProject from './components/FeaturedProject';
import CtaBand from './components/CtaBand';
import LegacyHashRedirect from './components/LegacyHashRedirect';

/** Home institucional de Raíces. El detalle de cada desarrollo vive en /proyectos/[slug]. */
export default function Home() {
  return (
    <>
      <LogoIntro />
      <LegacyHashRedirect />
      <CinematicHero />
      <AboutTeaser />
      <FeaturedProject project={featuredProject} />
      <CtaBand
        title={homeContent.cta.title}
        text={homeContent.cta.text}
        link={homeContent.cta.link}
        cota={homeContent.cta.cota}
        atmosphere={homeContent.cta.atmosphere}
      />
    </>
  );
}
