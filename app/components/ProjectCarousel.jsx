'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ui } from '@/content/shared';

const DURATION = 560;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const pad = (n) => String(n).padStart(2, '0');

/**
 * Galería editorial horizontal. Scroll nativo con `scroll-snap` (swipe en mobile y tablet) y
 * flechas que animan `scrollLeft` ~560 ms con una curva suave; con `prefers-reduced-motion` el
 * salto es inmediato. Sin autoplay ni loop. Cada slide comparte altura y toma su ancho natural,
 * así que ninguna imagen se deforma ni se recorta.
 */
export default function ProjectCarousel({ items }) {
  const trackRef = useRef(null);
  const frameRef = useRef(0);
  const [state, setState] = useState({ index: 0, atStart: true, atEnd: items.length < 2 });

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children);
    const max = track.scrollWidth - track.clientWidth;
    const left = track.scrollLeft;
    const atStart = left <= 2;
    let atEnd = left >= max - 2;
    let index = 0;
    slides.forEach((slide, i) => {
      if (slide.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft) <= left + 24) index = i;
    });
    if (atEnd) index = slides.length - 1;
    if (atStart) index = 0;
    if (index === slides.length - 1) atEnd = true;
    setState((prev) => (prev.index === index && prev.atStart === atStart && prev.atEnd === atEnd ? prev : { index, atStart, atEnd }));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; measure(); });
    };
    measure();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      cancelAnimationFrame(frameRef.current);
    };
  }, [measure]);

  const goTo = (target) => {
    const track = trackRef.current;
    const slide = track?.children[target];
    if (!slide) return;
    const padLeft = parseFloat(getComputedStyle(track).paddingLeft);
    const max = track.scrollWidth - track.clientWidth;
    const to = Math.min(max, Math.max(0, slide.offsetLeft - track.offsetLeft - padLeft));
    const from = track.scrollLeft;
    cancelAnimationFrame(frameRef.current);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(to - from) < 2) {
      track.scrollLeft = to;
      return;
    }
    track.classList.add('is-animating');
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      track.scrollLeft = from + (to - from) * ease(t);
      if (t < 1) frameRef.current = requestAnimationFrame(step);
      else track.classList.remove('is-animating');
    };
    frameRef.current = requestAnimationFrame(step);
  };

  const step = (dir) => goTo(Math.min(items.length - 1, Math.max(0, state.index + dir)));

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    }
  };

  const { carousel } = ui;

  return (
    <div className="pc" role="region" aria-roledescription="carrusel" aria-label={carousel.label}>
      <ul className="pc-track" ref={trackRef} tabIndex={0} onKeyDown={onKeyDown}>
        {items.map((item, i) => (
          <li
            className="pc-slide"
            key={item.src}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${carousel.slide} ${i + 1} ${carousel.of} ${items.length}`}
            style={{ '--ratio': `${item.width} / ${item.height}` }}>
            <span className="pc-frame">
              <img
                src={item.src}
                srcSet={item.srcSet}
                sizes="(max-width: 759px) 80vw, 46vw"
                width={item.width}
                height={item.height}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            </span>
            <span className="pc-caption label">{item.title}</span>
          </li>
        ))}
      </ul>

      <div className="pc-controls">
        <p className="pc-count" aria-live="polite">
          <span>{pad(state.index + 1)}</span> / {pad(items.length)}
        </p>
        <div className="pc-arrows">
          <button type="button" className="pc-arrow" onClick={() => step(-1)} disabled={state.atStart} aria-label={carousel.previous}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="pc-arrow" onClick={() => step(1)} disabled={state.atEnd} aria-label={carousel.next}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
