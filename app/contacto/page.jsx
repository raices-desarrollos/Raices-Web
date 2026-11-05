import { contact, contactContent } from '@/content/contact';
import { mailtoHref } from '../lib/contact';
import { PageHeader } from '../components/Primitives';
import Contact from '../components/sections/Contact';
import WhatsAppLink from '../components/WhatsAppLink';

export const metadata = {
  title: { absolute: contactContent.seo.title },
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
        aside={
          <>
            <span className="page-header-aside-line" aria-hidden="true" />
            <WhatsAppLink source="contact-header" className="text-link">
              {contact.whatsappDisplay}
            </WhatsAppLink>
            <a className="text-link" href={mailtoHref()}>
              {contact.email}
            </a>
          </>
        }
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
