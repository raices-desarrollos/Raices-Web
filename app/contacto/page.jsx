import { contactContent } from '@/content/contact';
import Contact from '../components/sections/Contact';

export const metadata = {
  title: { absolute: contactContent.seo.title },
  description: contactContent.seo.description,
  alternates: { canonical: contactContent.pageCanonical },
  openGraph: { url: contactContent.pageCanonical, title: contactContent.seo.ogTitle },
};

export default function ContactPage() {
  return (
    <Contact
      id="formulario"
      kicker={contactContent.header.kicker}
      title={contactContent.header.title}
      text={contactContent.header.lead}
      headingLevel="h1"
    />
  );
}
