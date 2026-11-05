'use client';

import { Fragment, useEffect, useRef } from 'react';

/**
 * Gesto base de texto (Plan M04): cada línea sube desde una máscara. Nunca por palabra ni por
 * letra. Dos modos, y ninguno mide el DOM con código propio:
 *
 * - `lines` (modo static): cada string es una línea explícita que sale del SSR. Sin GSAP, sin
 *   medición, sin CLS. Los saltos dentro de cada string los controla el ancho máximo en `ch`.
 *   Se dispara con `.is-visible` (ScrollEffects) o, con `immediate`, por CSS cuando termina la
 *   intro (`data-intro` = done | seen), que es el caso del H1 del hero.
 * - `text` (modo split): texto largo de una sola clave que se parte en líneas reales con GSAP
 *   SplitText (`autoSplit` re-divide al redimensionar y al cargar las fuentes; `mask: 'lines'`
 *   crea la máscara por línea). GSAP se importa de forma dinámica dentro de un efecto, nunca
 *   en el render ni antes del primer pintado, y solo con movimiento permitido.
 *
 * Esta es la única pieza del repo que importa `gsap` (decisión P11/§10.2 del plan).
 */
export default function RevealLines({
  as: Tag = 'span',
  lines,
  text,
  className = '',
  lineClassNames = [],
  stagger = 90,
  delay = 0,
  immediate = false,
  ...rest
}) {
  const ref = useRef(null);
  const isStatic = Array.isArray(lines);

  useEffect(() => {
    if (isStatic) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.dataset.ready = 'plain';
      return undefined;
    }

    let cancelled = false;
    let split = null;
    let observer = null;
    let revealed = false;
    let gsapCore = null;

    // Si GSAP tarda o falla, el texto nunca queda oculto.
    const failsafe = window.setTimeout(() => {
      if (!el.dataset.ready) el.dataset.ready = 'fallback';
    }, 3500);

    const reveal = () => {
      if (revealed || !split || !gsapCore) return;
      revealed = true;
      el.classList.add('is-visible');
      gsapCore.to(split.lines, {
        yPercent: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: stagger / 1000,
        delay: delay / 1000,
        overwrite: true,
      });
    };

    const boot = async () => {
      try {
        const [{ gsap }, { SplitText }] = await Promise.all([import('gsap'), import('gsap/SplitText')]);
        if (cancelled) return;
        gsap.registerPlugin(SplitText);
        gsapCore = gsap;

        split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'rl-line',
          autoSplit: true,
          onSplit(self) {
            // Un re-split (resize, fuentes) con el texto ya revelado no vuelve a animar.
            gsap.set(self.lines, { yPercent: revealed ? 0 : 150 });
            el.dataset.ready = 'true';
          },
        });

        reveal();
      } catch {
        el.dataset.ready = 'fallback';
      }
    };

    if (immediate || !('IntersectionObserver' in window)) {
      boot();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            boot();
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.2 },
      );
      observer.observe(el);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      observer?.disconnect();
      split?.revert();
    };
  }, [isStatic, immediate, stagger, delay]);

  const classes = `reveal-lines ${className}`.trim();
  const style = { '--rl-delay': `${delay}ms`, '--rl-stagger': `${stagger}ms` };

  if (isStatic) {
    return (
      <Tag
        className={classes}
        data-mode="static"
        data-immediate={immediate ? '' : undefined}
        style={style}
        {...rest}>
        {lines.map((line, index) => (
          <Fragment key={line}>
            <span className="rl-line-mask">
              <span className={`rl-line ${lineClassNames[index] ?? ''}`.trim()} style={{ '--i': index }}>
                {line}
              </span>
            </span>
            {index < lines.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={classes}
      data-mode="split"
      style={style}
      aria-label={rest['aria-label'] ?? text}
      {...rest}>
      {text}
    </Tag>
  );
}
