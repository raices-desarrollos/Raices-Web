import Link from 'next/link';
import { routes, ui } from '@/content/shared';
import { PageHeader } from './components/Primitives';

export const metadata = {
  title: ui.notFound.seoTitle,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageHeader kicker={ui.notFound.kicker} title={ui.notFound.title} lead={ui.notFound.lead}>
      <div className="hero-actions hero-anim">
        <Link className="button button-fill" href={routes.home}>
          {ui.notFound.homeLabel}
        </Link>
        <Link className="button" href={routes.projects}>
          {ui.notFound.projectsLabel}
        </Link>
      </div>
    </PageHeader>
  );
}
