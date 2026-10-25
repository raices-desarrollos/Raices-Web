'use client';

import { useEffect } from 'react';

/**
 * Efectos de scroll del sitio: reveal por IntersectionObserver y parallax del hero.
 * No renderiza nada; vive como cliente para que el resto de la landing quede estática.
 */
export default function ScrollEffects() {
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

  return null;
}
