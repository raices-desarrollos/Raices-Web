'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ui } from '@/content/shared';
import { SectionHeader } from './Primitives';

/**
 * Galería en tira horizontal (scroll nativo con snap, sin secuestrar el scroll vertical)
 * y visor a pantalla completa con <dialog> nativo: teclado, foco y cierre con Escape
 * resueltos por el navegador.
 */
export default function ProjectGallery({ items, title = ui.gallery.title, id = 'galeria' }) {
  const stripRef = useRef(null);
  const dialogRef = useRef(null);
  const [active, setActive] = useState(null);

  const scrollByItem = (direction) => {
    const strip = stripRef.current;
    if (!strip) return;
    const item = strip.querySelector('.gallery-item');
    const step = item ? item.getBoundingClientRect().width + 24 : strip.clientWidth * 0.8;
    strip.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const open = (index) => {
    setActive(index);
    dialogRef.current?.showModal();
  };

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback(
    (direction) => {
      setActive((current) => (current === null ? current : (current + direction + items.length) % items.length));
    },
    [items.length],
  );

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (event) => {
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, step]);

  const current = active === null ? null : items[active];

  return (
    <section className="section gallery-section" id={id} aria-labelledby={`${id}-title`}>
      <SectionHeader id={`${id}-title`}>{title}</SectionHeader>

      <div className="gallery-strip reveal" ref={stripRef} tabIndex={0} aria-label={ui.gallery.stripLabel}>
        {items.map((item, index) => (
          <figure className="gallery-item" key={item.src}>
            <button
              type="button"
              className="gallery-trigger"
              onClick={() => open(index)}
              aria-label={`${ui.gallery.enlargePrefix} ${item.caption}`}>
              <img
                src={item.src}
                width={item.width}
                height={item.height}
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
            </button>
            <figcaption>
              <span className="gallery-index">{String(index + 1).padStart(2, '0')}</span>
              <span>{item.caption}</span>
              <span className="gallery-note">{item.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="gallery-controls">
        <button type="button" className="gallery-nav" onClick={() => scrollByItem(-1)} aria-label={ui.gallery.previous}>
          ←
        </button>
        <button type="button" className="gallery-nav" onClick={() => scrollByItem(1)} aria-label={ui.gallery.next}>
          →
        </button>
      </div>

      <dialog
        className="lightbox"
        ref={dialogRef}
        aria-label={ui.gallery.lightbox}
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}>
        {current ? (
          <figure className="lightbox-figure">
            <img src={current.src} width={current.width} height={current.height} alt={current.alt} />
            <figcaption>
              <span className="gallery-index">{String(active + 1).padStart(2, '0')}</span>
              <span>{current.caption}</span>
              <span className="gallery-note">{current.note}</span>
            </figcaption>
          </figure>
        ) : null}
        <div className="lightbox-controls">
          <button type="button" className="gallery-nav" onClick={() => step(-1)} aria-label={ui.gallery.previous}>
            ←
          </button>
          <button type="button" className="gallery-nav" onClick={() => step(1)} aria-label={ui.gallery.next}>
            →
          </button>
        </div>
        <button type="button" className="lightbox-close" onClick={close} aria-label={ui.gallery.close}>
          {ui.gallery.close}
        </button>
      </dialog>
    </section>
  );
}
