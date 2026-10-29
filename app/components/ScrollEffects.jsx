'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Cada grupo de revelado con el umbral que le corresponde (Plan M04–M06). Todos son `once`. */
const REVEAL_GROUPS = [
  {
    selector: '.reveal:not(.is-visible), .reveal-stagger > *:not(.is-visible)',
    options: { rootMargin: '0px 0px -4% 0px', threshold: 0.08 },
  },
  {
    // Líneas explícitas (modo static de RevealLines). El hero (`immediate`) se dispara por CSS.
    selector: '.reveal-lines[data-mode="static"]:not([data-immediate]):not(.is-visible)',
    options: { rootMargin: '0px 0px -10% 0px', threshold: 0.2 },
  },
];

/**
 * Cortinas de imagen (`.img-curtain`). No se observan con IntersectionObserver: Chromium
 * descuenta el clip-path del propio elemento y una cortina cerrada (inset 100 %) tiene área
 * visible cero, así que nunca cruzaría el umbral.
 *
 * Costo por scroll: cero lecturas de layout. La posición absoluta y el alto de cada cortina se
 * miden en `measure` (al montar, en resize, al cargar la página y cuando cambia el alto del
 * documento con un ResizeObserver) y el handler de scroll, limitado a un frame, solo compara
 * `scrollY` con esos números. Cuando todas se revelaron, el seguimiento se descarta.
 * Se dispara con el 15 % de la pieza visible (tope 25 % del alto de ventana) y 4 % de margen.
 */
function createCurtainTracker(elements) {
  let pending = elements.map((element) => ({ element, top: 0, height: 0 }));

  const measure = () => {
    const scrollY = window.scrollY;
    pending.forEach((item) => {
      const rect = item.element.getBoundingClientRect();
      item.top = rect.top + scrollY;
      item.height = rect.height;
    });
  };

  const check = () => {
    if (!pending.length) return true;
    const scrollY = window.scrollY;
    const viewport = window.innerHeight;
    pending = pending.filter((item) => {
      const visible = scrollY + viewport * 0.96 - item.top;
      const needed = Math.min(item.height * 0.15, viewport * 0.25);
      const inView = item.top + item.height > scrollY;
      if (inView && visible >= needed) {
        item.element.classList.add('is-visible');
        return false;
      }
      return true;
    });
    return pending.length === 0;
  };

  return { measure, check, get done() { return pending.length === 0; } };
}

/**
 * Efectos de scroll globales: reveals por IntersectionObserver, cortinas de imagen y progreso
 * de la primera pantalla (`--hero-progress`) para el hero. No renderiza nada y se re-engancha
 * en cada navegación para observar los elementos de la página nueva.
 */
export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observers = [];

    REVEAL_GROUPS.forEach(({ selector, options }) => {
      const elements = document.querySelectorAll(selector);
      if (reduceMotion || !('IntersectionObserver' in window)) {
        elements.forEach((element) => element.classList.add('is-visible'));
        return;
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, options);
      elements.forEach((element) => observer.observe(element));
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [pathname]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const heroPieces = Array.from(document.querySelectorAll('.cine-hero-content, .hero-card'));
    const curtainElements = Array.from(document.querySelectorAll('.img-curtain:not(.is-visible)'));

    if (reduceMotion.matches) {
      curtainElements.forEach((element) => element.classList.add('is-visible'));
    }
    const curtains = reduceMotion.matches ? null : createCurtainTracker(curtainElements);

    let frame = 0;
    let measureFrame = 0;

    const update = () => {
      frame = 0;
      if (curtains && !curtains.done) curtains.check();
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      document.documentElement.style.setProperty(
        '--hero-progress',
        reduceMotion.matches ? '0' : progress.toFixed(3),
      );
      document.body.classList.toggle('is-scrolled', window.scrollY > 24);
      document.body.classList.toggle('past-hero', progress > 0.62);
      // Con el hero ya desvanecido, su contenido deja de ser enfocable (Azimute: inert < 0,08 de opacidad).
      const hidden = !reduceMotion.matches && progress > 0.6;
      heroPieces.forEach((piece) => {
        if (piece.inert !== hidden) piece.inert = hidden;
      });
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    // Re-mide fuera del scroll (carga, resize, cambios de alto del documento) y vuelve a comprobar.
    const remeasure = () => {
      if (!curtains || curtains.done || measureFrame) return;
      measureFrame = window.requestAnimationFrame(() => {
        measureFrame = 0;
        curtains.measure();
        onScroll();
      });
    };

    if (curtains) curtains.measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', remeasure);
    window.addEventListener('load', remeasure);
    let resizeObserver = null;
    if (curtains && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(remeasure);
      resizeObserver.observe(document.body);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', remeasure);
      window.removeEventListener('load', remeasure);
      resizeObserver?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      if (measureFrame) window.cancelAnimationFrame(measureFrame);
      heroPieces.forEach((piece) => {
        piece.inert = false;
      });
    };
  }, [pathname]);

  return null;
}
