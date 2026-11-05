'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { contact } from '@/content/contact';
import { brand, navItems, routes, ui } from '@/content/shared';
import WhatsAppLink from './WhatsAppLink';

const normalize = (path) => (path.length > 1 ? path.replace(/\/$/, '') : path);

export default function Header() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 18);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  // El menú móvil se cierra al navegar (estado derivado durante el render, sin efecto).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setNavOpen(false);
  }

  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen);
    return () => document.body.classList.remove('nav-open');
  }, [navOpen]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setNavOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  const current = normalize(pathname || '/');
  const isActive = (href) => current === href || (href !== '/' && current.startsWith(`${href}/`));
  const close = () => setNavOpen(false);

  return (
    <header
      className={`site-header ${current === '/' ? 'is-home' : ''} ${scrolled ? 'is-scrolled' : ''} ${navOpen ? 'nav-active' : ''}`}>
      <Link className="brand" href={routes.home} aria-label={ui.header.brandHomeLabel} onClick={close}>
        <img
          src={brand.logos.text.src}
          width={brand.logos.text.width}
          height={brand.logos.text.height}
          alt={brand.name}
          className="brand-logo logo-on-dark"
          decoding="async"
        />
      </Link>

      <button
        className="nav-toggle"
        type="button"
        aria-label={navOpen ? ui.header.closeMenu : ui.header.openMenu}
        aria-expanded={navOpen}
        aria-controls="site-nav"
        onClick={() => setNavOpen((value) => !value)}>
        <span />
        <span />
      </button>

      <nav className="site-nav" id="site-nav" aria-label={ui.header.navLabel}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            className={isActive(item.href) ? 'is-active' : undefined}
            aria-current={isActive(item.href) ? 'page' : undefined}>
            {item.label}
          </Link>
        ))}
        <Link className="button button-small site-nav-cta" href={routes.contact} onClick={close}>
          {ui.header.consultCta}
        </Link>
        <div className="site-nav-mobile">
          <WhatsAppLink source="menu" className="button button-fill">
            {ui.whatsapp.consultLabel}
          </WhatsAppLink>
          <span className="label">{contact.whatsappDisplay}</span>
        </div>
      </nav>
    </header>
  );
}
