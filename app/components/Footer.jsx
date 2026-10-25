import Link from 'next/link';
import { brand, contact, navItems, project, projects, routes } from '../content/site';
import { mailtoHref } from '../lib/contact';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <img
            src={brand.logos.full.src}
            width={brand.logos.full.width}
            height={brand.logos.full.height}
            alt={brand.name}
            className="site-footer-logo logo-on-dark"
            loading="lazy"
            decoding="async"
          />
          <p className="site-footer-claim">{brand.claim}</p>
        </div>

        <nav className="site-footer-nav" aria-label="Secciones del sitio">
          <Link href={routes.home}>Inicio</Link>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          {projects.map((entry) => (
            <Link key={entry.slug} href={routes.project(entry.slug)}>
              {entry.name}
            </Link>
          ))}
        </nav>

        <div className="site-footer-contact">
          <span className="label">Contacto</span>
          <a href={mailtoHref()}>{contact.email}</a>
          <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
            {contact.whatsappDisplay}
          </a>
          <span className="site-footer-address">
            {project.name} · {project.address} · {project.neighborhood}, {project.city}
          </span>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p>
          © {year} {brand.name} · {brand.city}
        </p>
        <p>Renders de referencia. Las imágenes son ilustrativas y pueden variar en obra.</p>
        <a href="#contenido">Volver arriba</a>
      </div>
    </footer>
  );
}
