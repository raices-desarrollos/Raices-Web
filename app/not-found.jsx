import Link from 'next/link';
import { routes } from './content/site';
import { PageHeader } from './components/Primitives';

export const metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageHeader kicker="Error 404" title="Esta página no existe." lead="El enlace puede haber cambiado con la nueva estructura del sitio.">
      <div className="hero-actions hero-anim">
        <Link className="button button-fill" href={routes.home}>
          Ir al inicio
        </Link>
        <Link className="button" href={routes.projects}>
          Ver proyectos
        </Link>
      </div>
    </PageHeader>
  );
}
