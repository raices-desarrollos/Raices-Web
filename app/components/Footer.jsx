import Link from 'next/link';
import { contact } from '@/content/contact';
import { featuredProject, projects } from '@/content/projects';
import { brand, navItems, routes, ui } from '@/content/shared';
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

        <nav className="site-footer-nav" aria-label={ui.footer.sectionsLabel}>
          <Link href={routes.home}>{ui.footer.homeLink}</Link>
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
          <span className="label">{ui.footer.contactLabel}</span>
          <a href={mailtoHref()}>{contact.email}</a>
          <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
            {contact.whatsappDisplay}
          </a>
          <span className="site-footer-address">
            {featuredProject.name} · {featuredProject.address} · {featuredProject.neighborhood}, {featuredProject.city}
          </span>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p>
          © {year} {brand.name} · {brand.city}
        </p>
        <p>{ui.footer.disclaimer}</p>
        <a href="#contenido">{ui.footer.backToTop}</a>
      </div>
    </footer>
  );
}
