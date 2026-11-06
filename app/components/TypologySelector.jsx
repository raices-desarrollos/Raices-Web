'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ui } from '@/content/shared';
import { Picture } from './Primitives';
/**
 * Selector de tipologías (Plan 5.2.6 / M12). Las tres fichas están en el HTML (SEO y sin JS); el
 * selector solo alterna cuál se ve (`hidden`) y mueve el subrayado de la pestaña activa.
 *
 * - Patrón WAI-ARIA de pestañas: ← → Inicio Fin cambian de pestaña y mueven el foco.
 * - Deep links: `#tipologia-{id}` activa esa pestaña al cargar y al cambiar el hash.
 * - El subrayado (`.tabs-ink`) usa `offsetLeft/offsetWidth` de la pestaña activa, medidos al
 *   montar, al cambiar y al redimensionar; no hay lecturas por scroll.
 * - Mobile: la barra se desplaza en horizontal y centra la pestaña activa.
 */
export default function TypologySelector({ units, renderNote, formHref = '#consultas' }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const listRef = useRef(null);
  const [ink, setInk] = useState({ left: 0, width: 0 });

  const select = useCallback(
    (index, { focus = false } = {}) => {
      setActive(index);
      if (focus) tabRefs.current[index]?.focus();
    },
    [],
  );

  // Deep link por hash.
  useEffect(() => {
    const fromHash = () => {
      const match = units.findIndex((unit) => `#tipologia-${unit.id}` === window.location.hash);
      if (match >= 0) setActive(match);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [units]);

  // Subrayado y centrado de la pestaña activa.
  useEffect(() => {
    const measure = () => {
      const tab = tabRefs.current[active];
      if (!tab) return;
      setInk({ left: tab.offsetLeft, width: tab.offsetWidth });
    };
    measure();
    const list = listRef.current;
    const tab = tabRefs.current[active];
    if (list && tab && list.scrollWidth > list.clientWidth) {
      const target = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
      list.scrollTo({ left: target, behavior: 'smooth' });
    }
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  const onKeyDown = (event) => {
    const last = units.length - 1;
    let next = null;
    if (event.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (event.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;
    if (next === null) return;
    event.preventDefault();
    select(next, { focus: true });
  };

  return (
    <div className="typology-selector">
      <div className="tabs" ref={listRef}>
        <div className="tabs-list" role="tablist" aria-label={ui.typologies.tabsLabel} onKeyDown={onKeyDown}>
          {units.map((unit, index) => (
            <button
              type="button"
              role="tab"
              key={unit.id}
              id={`tab-${unit.id}`}
              className="tab"
              aria-selected={index === active}
              aria-controls={`tipologia-${unit.id}`}
              tabIndex={index === active ? 0 : -1}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              onClick={() => select(index)}>
              <span className="tab-code">{unit.code}</span>
              <span className="tab-name">{unit.title}</span>
            </button>
          ))}
          <span
            className="tabs-ink"
            aria-hidden="true"
            style={{ transform: `translateX(${ink.left}px)`, width: `${ink.width}px` }}
          />
        </div>
      </div>

      {units.map((unit, index) => (
        <div
          className="typology-panel"
          key={unit.id}
          id={`tipologia-${unit.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${unit.id}`}
          hidden={index !== active}>
          <div className="typology-copy">
            <span className="label">{unit.department}</span>
            <h3>{unit.title}</h3>
            {unit.program ? <p className="typology-program">{unit.program}</p> : null}
            <dl className="typology-areas">
              {unit.areas.map((area) => {
                const [value, unitLabel] = area.value.split(' ');
                return (
                  <div key={area.label}>
                    <dt>{area.label}</dt>
                    <dd>
                      {value}
                      {unitLabel ? <span className="area-unit"> {unitLabel}</span> : null}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="typology-plan">
            <Picture image={unit.plan} sizes="(max-width: 1023px) 100vw, 55vw" />
          </div>

          <figure className="typology-render is-photo">
            <Picture image={unit.render} sizes="(max-width: 1023px) 100vw, 40vw" />
            <figcaption>{renderNote}</figcaption>
          </figure>

          <div className="typology-actions">
            <Link className="text-link typology-form-link" href={formHref}>
              {ui.contact.writeUs} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
