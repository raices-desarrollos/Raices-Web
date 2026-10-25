'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { brand } from '../content/site';

const STORAGE_KEY = 'raices-intro-seen';
const HOLD_MS = 1600; // isotipo + logotipo en pantalla
const LEAVE_MS = 700; // telón que se levanta

/*
 * Decide antes del primer pintado si la intro se muestra. Corre inline (sin esperar a
 * hidratar) para que no haya parpadeo: `playing` solo en la primera carga de la sesión y
 * si el usuario no pidió movimiento reducido. En navegación interna el script no se
 * ejecuta (React no corre <script> en cliente) y la intro queda oculta por CSS.
 */
/**
 * Apertura cinematográfica: negro → isotipo que se revela desde la base (como raíces) →
 * logotipo → el telón se levanta y descubre el hero. ~2,3 s en total, se puede saltar con
 * clic, Enter, Espacio o Escape, y no se repite dentro de la misma sesión.
 * El script que decide `data-intro` vive en layout.jsx para correr antes del primer pintado.
 */
export default function LogoIntro() {
  const [mounted, setMounted] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef([]);

  const leave = useCallback(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== 'playing') return;
    root.dataset.intro = 'done';
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* almacenamiento no disponible: la intro simplemente volverá a mostrarse */
    }
    setLeaving(true);
    timers.current.push(setTimeout(() => setMounted(false), LEAVE_MS));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== 'playing') {
      if (!root.dataset.intro) root.dataset.intro = 'seen';
      setMounted(false);
      return undefined;
    }

    timers.current.push(setTimeout(leave, HOLD_MS));

    const onKey = (event) => {
      if (['Escape', 'Enter', ' '].includes(event.key)) leave();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      window.removeEventListener('keydown', onKey);
    };
  }, [leave]);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`logo-intro ${leaving ? 'is-leaving' : ''}`}
        role="presentation"
        onClick={leave}>
        <div className="logo-intro-stage" aria-hidden="true">
          <img
            className="logo-intro-icon logo-on-dark"
            src={brand.logos.icon.src}
            width={brand.logos.icon.width}
            height={brand.logos.icon.height}
            alt=""
            fetchPriority="high"
            decoding="sync"
          />
          <img
            className="logo-intro-text logo-on-dark"
            src={brand.logos.text.src}
            width={brand.logos.text.width}
            height={brand.logos.text.height}
            alt=""
            fetchPriority="high"
            decoding="sync"
          />
          <span className="logo-intro-line" />
        </div>
        <button type="button" className="logo-intro-skip" onClick={leave}>
          Saltar
        </button>
      </div>
    </>
  );
}
