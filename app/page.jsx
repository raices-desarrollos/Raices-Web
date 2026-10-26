import { homeContent } from '@/content/home';
import { featuredProject } from '@/content/projects';
import { ui } from '@/content/shared';
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
        title={ui.cta.title}
        text={ui.cta.text}
        link={ui.cta.link}
        cota={homeContent.cta.cota}
        atmosphere={homeContent.cta.atmosphere}
      />
    </>
  );
}
