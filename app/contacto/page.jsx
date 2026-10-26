import { contactContent } from '@/content/contact';
import { PageHeader } from '../components/Primitives';
import Contact from '../components/sections/Contact';

export const metadata = {
  title: contactContent.seo.title,
  description: contactContent.seo.description,
  alternates: { canonical: contactContent.pageCanonical },
  openGraph: { url: contactContent.pageCanonical, title: contactContent.seo.ogTitle },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker={contactContent.header.kicker}
        title={contactContent.header.title}
        lead={contactContent.header.lead}
      />
      <Contact
        id="formulario"
        kicker={contactContent.section.kicker}
        title={contactContent.section.title}
        text={contactContent.section.text}
        headingLevel="h2"
      />
    </>
  );
}
