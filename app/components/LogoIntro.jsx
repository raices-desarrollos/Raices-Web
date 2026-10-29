'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { brand, ui } from '@/content/shared';

const STORAGE_KEY = 'raices-intro-seen';

/*
 * Línea de tiempo de la intro (Plan M01). Toda la coreografía visual vive en cinematic.css con
 * estas mismas cifras; acá JS solo programa dos momentos y atiende "Saltar".
 *
 *   0–200      Carbón pleno
 *   200–850    el logo completo se revela de arriba hacia abajo mientras asienta (REVEAL)
 *   850–1150   reposo, sin movimiento (HOLD)
 *   1150–1750  la cortina se levanta y arrastra al logo (CURTAIN)
 *   1350       data-intro = done → el hero empieza a revelarse debajo de la cortina
 *   1750       la intro sale del flujo y se guarda la sesión
 */
const REVEAL_DELAY_MS = 200;
const REVEAL_MS = 650;
const HOLD_MS = 300;
const CURTAIN_MS = 600;
const CURTAIN_START_MS = REVEAL_DELAY_MS + REVEAL_MS + HOLD_MS; // 1150
const HERO_RELEASE_MS = 1350;
const TOTAL_MS = CURTAIN_START_MS + CURTAIN_MS; // 1750
/** Al saltar, el hero se libera cuando la cortina va por un tercio, igual que en la secuencia normal. */
const SKIP_RELEASE_MS = HERO_RELEASE_MS - CURTAIN_START_MS; // 200

/**
 * Apertura de marca: logo completo oficial (Caliza sobre Carbón), sin isotipo ni wordmark
 * por separado y sin ornamentos. Se muestra una vez por sesión y solo en la Home.
 * El script de layout.jsx decide `data-intro` antes del primer pintado (`playing` | `seen`).
 * Se puede saltar con el botón, clic, Enter, Espacio o Escape. No hay foco atrapado ni
 * `role="dialog"`: es decorativa, y desde `done` (1350 ms) ya no bloquea scroll ni clics.
 */
export default function LogoIntro() {
  const [mounted, setMounted] = useState(true);
  const [phase, setPhase] = useState('idle'); // idle | running | leaving
  const timers = useRef([]);
  const startedAt = useRef(0);
  const finished = useRef(false);
  const leaving = useRef(false);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const release = useCallback(() => {
    const root = document.documentElement;
    if (root.dataset.intro === 'playing') root.dataset.intro = 'done';
  }, []);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    release();
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* almacenamiento no disponible: la intro simplemente volverá a mostrarse */
    }
    setMounted(false);
  }, [release]);

  const skip = useCallback(() => {
    if (finished.current || leaving.current) return;
    // Ya está en la cortina: no se acelera ni se reinicia.
    if (performance.now() - startedAt.current >= CURTAIN_START_MS) return;
    leaving.current = true;
    clearTimers();
    setPhase('leaving');
    timers.current.push(setTimeout(release, SKIP_RELEASE_MS));
    timers.current.push(setTimeout(finish, CURTAIN_MS));
  }, [finish, release]);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== 'playing') {
      if (!root.dataset.intro) root.dataset.intro = 'seen';
      // Sincroniza con `data-intro`, que escribe el script previo a la hidratación (sistema externo).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(false);
      return undefined;
    }

    // La animación CSS arranca al activar `running`, en el mismo instante que los timers:
    // así cortina y hero siempre quedan sincronizados, sin importar cuánto tardó en hidratar.
    startedAt.current = performance.now();
    setPhase('running');
    timers.current.push(setTimeout(release, HERO_RELEASE_MS));
    timers.current.push(setTimeout(finish, TOTAL_MS));

    const onKey = (event) => {
      if (['Escape', 'Enter', ' '].includes(event.key)) skip();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      clearTimers();
      window.removeEventListener('keydown', onKey);
    };
  }, [finish, release, skip]);

  if (!mounted) return null;

  return (
    <div
      className={`logo-intro${phase === 'running' ? ' is-running' : ''}${phase === 'leaving' ? ' is-leaving' : ''}`}
      role="presentation"
      onClick={skip}>
      <div className="logo-intro-stage" aria-hidden="true">
        <img
          className="logo-intro-mark logo-on-dark"
          src={brand.logos.full.src}
          width={brand.logos.full.width}
          height={brand.logos.full.height}
          alt=""
          fetchPriority="high"
          decoding="sync"
        />
      </div>
      <button
        type="button"
        className="logo-intro-skip"
        onClick={(event) => {
          event.stopPropagation();
          skip();
        }}>
        {ui.intro.skip}
      </button>
    </div>
  );
}
