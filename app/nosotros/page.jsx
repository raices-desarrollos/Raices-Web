import { routes } from '../content/site';
import { PageHeader } from '../components/Primitives';
import Philosophy from '../components/sections/Philosophy';
import Identity from '../components/sections/Identity';
import Partners from '../components/sections/Partners';
import CtaBand from '../components/CtaBand';

export const metadata = {
  title: 'Nosotros',
  description:
    'Raíces Developers es una desarrolladora inmobiliaria de Buenos Aires. Edificios con nombre de árbol autóctono, verde integrado desde el proyecto y mirada de largo plazo.',
  alternates: { canonical: `${routes.about}/` },
  openGraph: { url: `${routes.about}/`, title: 'Nosotros · Raíces Developers' },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="Nosotros"
        title="La ciudad también puede echar raíces."
        lead="Somos una desarrolladora inmobiliaria de Buenos Aires. Hacemos edificios con identidad propia, verde integrado desde el proyecto y escala de barrio."
      />
      <Philosophy />
      <Identity />
      <Partners />
      <CtaBand
        title="Construyamos lo que viene."
        text="Para compradores e inversores que quieran construir ciudad con más naturaleza."
        link={{ label: 'Hablemos', href: routes.contact }}
      />
    </>
  );
}
