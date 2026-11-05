import { homeContent } from '@/content/home';
import { featuredProject } from '@/content/projects';
import { ui } from '@/content/shared';
import CinematicHero from './components/CinematicHero';
import Manifesto from './components/Manifesto';
import AboutTeaser from './components/AboutTeaser';
import FeaturedProject from './components/FeaturedProject';
import CtaBand from './components/CtaBand';
import LegacyHashRedirect from './components/LegacyHashRedirect';

/** Home institucional de Raíces. El detalle de cada desarrollo vive en /proyectos/[slug]. */
export default function Home() {
  return (
    <>
      <LegacyHashRedirect />
      <CinematicHero />
      <Manifesto title={homeContent.cta.title} lead={homeContent.about.lead} />
      <AboutTeaser />
      <FeaturedProject project={featuredProject} />
      <CtaBand
        title={homeContent.cta.title}
        text={homeContent.cta.text}
        link={homeContent.cta.link}
        cota={homeContent.cta.cota}
        whatsapp={{ source: 'cta-band', label: ui.whatsapp.consultLabel }}
      />
    </>
  );
}
