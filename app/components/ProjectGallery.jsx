'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ui } from '@/content/shared';
import { SectionHeader } from './Primitives';
import RevealLines from './RevealLines';

/**
 * Galería inmersiva (Plan 5.2.4 / M09). Desktop: escenario 16:10 con fundido cruzado entre
 * imágenes y, a la derecha, caption, contador, flechas y miniaturas. Mobile: escenario 4:3 a
 * sangre, controles y miniaturas en fila. Sin autoplay ni scroll-snap.
 *
 * El cambio de imagen espera a `img.decode()` y apila las capas: siempre hay una con opacidad 1
 * (la saliente se apaga recién cuando la entrante terminó, igual que el capítulo de la Home).
 * Teclado ← → con el foco en la galería; swipe horizontal con umbral de 40 px (pointer events).
 * El escenario abre el visor `<dialog>` nativo (teclado, foco y Escape resueltos por el navegador).
 */
export default function ProjectGallery({ items, title = ui.gallery.title, id = 'galeria' }) {
  const dialogRef = useRef(null);
  const imageRefs = useRef([]);
  const swipe = useRef(null);
  const busyRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [viewer, setViewer] = useState(null);
  const count = items.length;

  const go = useCallback(
    (target) => {
      const next = (target + count) % count;
      if (busyRef.current) return;
      const image = imageRefs.current[next];
      const apply = () => {
        setIndex(next);
        busyRef.current = false;
      };
      busyRef.current = true;
      if (image && typeof image.decode === 'function') {
        image.decode().then(apply, apply);
      } else {
        apply();
      }
    },
    [count],
  );

  // Precarga: la imagen siguiente ya está lista cuando se pide.
  useEffect(() => {
    const next = imageRefs.current[(index + 1) % count];
    if (next) next.loading = 'eager';
  }, [index, count]);

  const open = () => {
    setViewer(index);
    dialogRef.current?.showModal();
  };

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback(
    (direction) => {
      setViewer((current) => (current === null ? current : (current + direction + count) % count));
    },
    [count],
  );

  useEffect(() => {
    if (viewer === null) return undefined;
    const onKey = (event) => {
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewer, step]);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(index + 1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(index - 1);
    }
  };

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse') return;
    swipe.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) go(index + (dx < 0 ? 1 : -1));
  };

  const current = items[index];
  const shown = viewer === null ? null : items[viewer];
  const pad = (n) => String(n + 1).padStart(2, '0');

  return (
    <section className="section gallery-section" id={id} aria-labelledby={`${id}-title`}>
      <SectionHeader id={`${id}-title`}>{title}</SectionHeader>

      <div
        className="gallery-immersive reveal"
        role="group"
        aria-roledescription="carrusel"
        aria-label={ui.gallery.viewerLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}>
        <div className="gallery-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
          {items.map((item, itemIndex) => (
            <button
              type="button"
              key={item.src}
              className="gallery-slide"
              data-state={itemIndex === index ? 'active' : 'idle'}
              data-portrait={item.height > item.width ? '' : undefined}
              onClick={open}
              tabIndex={itemIndex === index ? 0 : -1}
              aria-hidden={itemIndex === index ? undefined : 'true'}
              aria-label={`${ui.gallery.enlargePrefix} ${item.caption}`}>
              {item.height > item.width ? (
                <img className="gallery-slide-bg" src={item.src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              ) : null}
              <img
                ref={(node) => {
                  imageRefs.current[itemIndex] = node;
                }}
                src={item.src}
                srcSet={item.srcSet}
                width={item.width}
                height={item.height}
                alt={itemIndex === index ? item.alt : ''}
                loading={itemIndex === 0 ? 'eager' : 'lazy'}
                decoding="async"
                sizes="(max-width: 1023px) 100vw, 70vw"
              />
            </button>
          ))}
        </div>

        <div className="gallery-side">
          <p className="gallery-counter" aria-live="polite">
            <span className="gallery-counter-current">{pad(index)}</span>
            <span className="gallery-counter-total">
              {' '}
              / {String(count).padStart(2, '0')}
            </span>
          </p>
          <div className="gallery-caption" key={index}>
            <RevealLines as="h3" className="gallery-caption-title" lines={[current.caption]} immediate />
            <p className="gallery-note label">{current.note}</p>
          </div>

          <div className="gallery-controls">
            <button type="button" className="gallery-nav" onClick={() => go(index - 1)} aria-label={ui.gallery.previous}>
              ←
            </button>
            <button type="button" className="gallery-nav" onClick={() => go(index + 1)} aria-label={ui.gallery.next}>
              →
            </button>
          </div>

          <ul className="gallery-thumbs" aria-label={ui.gallery.thumbsLabel}>
            {items.map((item, itemIndex) => (
              <li key={item.src}>
                <button
                  type="button"
                  className="gallery-thumb"
                  aria-current={itemIndex === index ? 'true' : undefined}
                  aria-label={`${pad(itemIndex)} ${ui.gallery.of} ${String(count).padStart(2, '0')}: ${item.caption}`}
                  onClick={() => go(itemIndex)}>
                  <img src={item.src.replace(/\.webp$/, '-800.webp')} alt="" width={item.width} height={item.height} loading="lazy" decoding="async" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <dialog
        className="lightbox"
        ref={dialogRef}
        aria-label={ui.gallery.lightbox}
        onClose={() => setViewer(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}>
        {shown ? (
          <figure className="lightbox-figure" key={viewer}>
            <img src={shown.src} width={shown.width} height={shown.height} alt={shown.alt} />
            <figcaption>
              <span className="gallery-index">{pad(viewer)}</span>
              <span>{shown.caption}</span>
              <span className="gallery-note">{shown.note}</span>
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
