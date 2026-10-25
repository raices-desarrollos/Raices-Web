'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Efectos de scroll globales: reveal por IntersectionObserver y progreso de la primera
 * pantalla (`--hero-progress`) para el parallax de los heros. No renderiza nada y se
 * re-engancha en cada navegación para observar los elementos de la página nueva.
 */
export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal:not(.is-visible), .reveal-stagger > *:not(.is-visible)');
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
  }, [pathname]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      document.documentElement.style.setProperty(
        '--hero-progress',
        reduceMotion.matches ? '0' : progress.toFixed(3),
      );
      document.body.classList.toggle('is-scrolled', window.scrollY > 24);
      document.body.classList.toggle('past-hero', progress > 0.62);
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
  }, [pathname]);

  return null;
}
