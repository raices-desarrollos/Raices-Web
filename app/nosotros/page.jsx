import { aboutContent } from '@/content/about';
import { partners, ui } from '@/content/shared';
import { PageHeader } from '../components/Primitives';
import Philosophy from '../components/sections/Philosophy';
import Identity from '../components/sections/Identity';
import Statement from '../components/sections/Statement';
import Partners from '../components/sections/Partners';
import CtaBand from '../components/CtaBand';

export const metadata = {
  title: { absolute: aboutContent.seo.title },
  description: aboutContent.seo.description,
  alternates: { canonical: aboutContent.pageCanonical },
  openGraph: { url: aboutContent.pageCanonical, title: aboutContent.seo.ogTitle },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker={aboutContent.header.kicker}
        title={aboutContent.header.title}
        lead={aboutContent.header.lead}
      />
      <Philosophy />
      <Identity content={aboutContent.practice} />
      <Statement content={aboutContent.promise} />
      <Identity />
      <Partners items={partners} label={ui.partners.label} ariaLabel={ui.partners.ariaLabel} />
      <CtaBand title={ui.cta.title} text={ui.cta.text} link={ui.cta.link} />
    </>
  );
}
