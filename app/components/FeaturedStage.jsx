'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/**
 * Escenario del capítulo destacado (Plan M07). Apila las imágenes del proyecto y cambia de
 * una a otra por fundido cruzado según el avance del scroll por el tramo fijo del capítulo.
 *
 * No hay scrub: son `panels.length` estados discretos. El cálculo no lee layout en cada
 * scroll: la geometría del capítulo se mide en `measure` (carga, resize y cambios de alto del
 * documento) y el handler, limitado a un frame, solo compara `scrollY`. Antes de activar un
 * panel se decodifica su imagen (`img.decode()`), para no mostrar un frame vacío.
 *
 * El caption de cada estado vive en la ficha (`.featured-states`) y sigue a `--active`.
 *
 * Sin sticky (< 1024 px, alturas < 640 px): el CSS apila una sola imagen y esta lógica no
 * cambia nada visible.
 */
export default function FeaturedStage({ panels, href, label }) {
  const rootRef = useRef(null);
  const imageRefs = useRef([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const chapter = rootRef.current?.closest('.featured-chapter');
    if (!chapter) return undefined;

    let top = 0;
    let range = 1;
    let frame = 0;
    let pinned = false;

    const measure = () => {
      const sticky = chapter.querySelector('.featured-sticky');
      pinned = window.getComputedStyle(sticky).position === 'sticky';
      const chapterRect = chapter.getBoundingClientRect();
      const stickyHeight = sticky.offsetHeight;
      const headerHeight = parseFloat(window.getComputedStyle(sticky).top) || 0;
      // El capítulo se fija cuando su borde superior llega a `top`; se suelta cuando termina.
      top = chapterRect.top + window.scrollY - headerHeight;
      range = Math.max(chapter.offsetHeight - stickyHeight, 1);
    };

    const select = (index) => {
      if (index === activeRef.current) return;
      const next = imageRefs.current[index];
      const apply = () => {
        activeRef.current = index;
        // Los captions de la ficha leen `--active` por CSS: no hace falta re-renderizar.
        chapter.style.setProperty('--active', String(index));
        setActive(index);
      };
      if (next && typeof next.decode === 'function') {
        next.decode().then(apply, apply);
      } else {
        apply();
      }
    };

    const update = () => {
      frame = 0;
      if (!pinned) {
        select(0);
        return;
      }
      const progress = (window.scrollY - top) / range;
      const index = Math.min(panels.length - 1, Math.max(0, Math.floor(progress * panels.length)));
      select(index);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    let resizeObserver = null;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(document.body);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      resizeObserver?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [panels.length]);

  const current = panels[active];

  return (
    <div className="featured-stage img-curtain img-curtain-left" data-active={active} ref={rootRef}>
      <Link className="featured-stage-link" href={href} aria-label={label} tabIndex={-1}>
        {panels.map((panel, index) => (
          <span
            className="featured-panel"
            key={panel.src}
            data-index={index}
            aria-hidden={index === active ? undefined : 'true'}>
            <img
              ref={(node) => {
                imageRefs.current[index] = node;
              }}
              src={panel.src}
              width={panel.width}
              height={panel.height}
              alt={index === active ? panel.alt : ''}
              // Siempre lazy: el capítulo queda bajo el hero. `eager` hacía competir esta imagen con el LCP
              // de la Home y emitía un preload en el payload que prefetchean las demás páginas.
              loading="lazy"
              decoding="async"
              sizes="(max-width: 1023px) 100vw, 58vw"
            />
          </span>
        ))}
        <span className="featured-stage-veil" aria-hidden="true" />
      </Link>

      <p className="featured-caption" aria-hidden="true">
        <span key={active} className="featured-caption-note label">
          {current.note}
        </span>
      </p>
    </div>
  );
}
