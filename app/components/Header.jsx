'use client';

import { useEffect, useState } from 'react';
import { brand, navItems } from '../content/site';

export default function Header({ navOpen, setNavOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 18);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

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
  }, [setNavOpen]);

  const close = () => setNavOpen(false);

  return (
    <header
      className={`site-header ${scrolled ? 'is-scrolled' : ''} ${navOpen ? 'nav-active' : ''}`}>
      <a className="brand" href="#inicio" aria-label={`${brand.name}, ir al inicio`} onClick={close}>
        <img
          src={brand.logos.text.src}
          width={brand.logos.text.width}
          height={brand.logos.text.height}
          alt={brand.name}
          className="brand-logo logo-on-dark"
          decoding="async"
        />
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label={navOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={navOpen}
        aria-controls="site-nav"
        onClick={() => setNavOpen((value) => !value)}>
        <span />
        <span />
      </button>

      <nav className="site-nav" id="site-nav" aria-label="Navegación principal">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={close}>
            {item.label}
          </a>
        ))}
        <a className="button button-small site-nav-cta" href="#contacto" onClick={close}>
          Consultar
        </a>
      </nav>
    </header>
  );
}
