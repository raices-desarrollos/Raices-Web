import { home, projects } from './content/site';
import LogoIntro from './components/LogoIntro';
import CinematicHero from './components/CinematicHero';
import AboutTeaser from './components/AboutTeaser';
import FeaturedProject from './components/FeaturedProject';
import CtaBand from './components/CtaBand';
import LegacyHashRedirect from './components/LegacyHashRedirect';

/** Home institucional de Raíces. El detalle de cada desarrollo vive en /proyectos/[slug]. */
export default function Home() {
  const featured = projects[0];

  return (
    <>
      <LogoIntro />
      <LegacyHashRedirect />
      <CinematicHero />
      <AboutTeaser />
      <FeaturedProject project={featured} />
      <CtaBand title={home.cta.title} text={home.cta.text} link={home.cta.link} />
    </>
  );
}
