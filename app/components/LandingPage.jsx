'use client';

import { useEffect, useState } from 'react';
import Header from './Header';
import { WhatsAppLink } from './Primitives';
import Hero from './sections/Hero';
import IntroBand from './sections/IntroBand';
import Philosophy from './sections/Philosophy';
import Project from './sections/Project';
import Typologies from './sections/Typologies';
import Green from './sections/Green';
import Location from './sections/Location';
import Identity from './sections/Identity';
import Partners from './sections/Partners';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-stagger > *');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function useHeroParallax() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      if (!reduceMotion.matches) {
        document.documentElement.style.setProperty('--hero-progress', progress.toFixed(3));
      }
      // El botón flotante de WhatsApp aparece una vez superado el hero (que ya tiene su CTA).
      document.body.classList.toggle('past-hero', progress > 0.6);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

export default function LandingPage() {
  const [navOpen, setNavOpen] = useState(false);

  useReveal();
  useHeroParallax();

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />

      <main id="contenido">
        <Hero />
        <IntroBand />
        <Philosophy />
        <Project />
        <Typologies />
        <Green />
        <Location />
        <Identity />
        <Partners />
        <Contact />
      </main>

      <Footer />

      <WhatsAppLink
        source="floating"
        className="whatsapp-float"
        iconSize={22}
        aria-label="Consultar por WhatsApp">
        <span className="whatsapp-float-label">WhatsApp</span>
      </WhatsAppLink>
    </>
  );
}
