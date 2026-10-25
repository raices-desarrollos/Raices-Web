import { routes } from '../content/site';
import { PageHeader } from '../components/Primitives';
import Contact from '../components/sections/Contact';

export const metadata = {
  title: 'Contacto',
  description:
    'Escribinos por WhatsApp o por el formulario para recibir información sobre Ceibo Vidal y los próximos desarrollos de Raíces Developers.',
  alternates: { canonical: `${routes.contact}/` },
  openGraph: { url: `${routes.contact}/`, title: 'Contacto · Raíces Developers' },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contacto"
        title="Hablemos."
        lead="Te respondemos con información del proyecto, planos y unidades disponibles."
      />
      <Contact
        id="formulario"
        kicker="Canales"
        title="Escribinos."
        text="Dejanos un mensaje o escribinos por WhatsApp. Te respondemos con información del proyecto, planos y unidades disponibles."
        headingLevel="h2"
      />
    </>
  );
}
