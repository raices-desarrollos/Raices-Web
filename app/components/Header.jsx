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

  // Con el menú abierto el scroll se bloquea y el contenido de fondo queda inerte: ni el foco
  // del teclado ni un toque pueden caer detrás del overlay.
  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen);
    const background = document.querySelectorAll('#contenido, .site-footer, .whatsapp-float-region');
    background.forEach((node) => {
      node.inert = navOpen;
    });
    return () => {
      document.body.classList.remove('nav-open');
      background.forEach((node) => {
        node.inert = false;
      });
    };
  }, [navOpen]);

  // Si la ventana pasa a desktop con el menú abierto, se cierra: no queda el fondo bloqueado.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 760px)');
    const closeOnDesktop = (event) => {
      if (event.matches) setNavOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return;
      setNavOpen(false);
      // Cerrar con el teclado devuelve el foco al botón que abrió el menú.
      if (document.activeElement?.closest('.site-nav')) document.querySelector('.nav-toggle')?.focus();
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
