'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ui } from '@/content/shared';
import WhatsAppLink from './WhatsAppLink';

/** CTAs que cuentan como "ya hay un WhatsApp a la vista". El menú móvil y el hero no entran. */
const VISIBLE_CTA = 'a[data-wa-source]:not([data-wa-source="floating"]):not([data-wa-source="menu"]):not([data-wa-source^="hero"])';

/**
 * Acceso directo flotante a WhatsApp. Solo abre el chat: sin panel ni bot. Se retira
 * (`body.wa-covered`) mientras otro botón de WhatsApp se ve completo en pantalla y vuelve en
 * cuanto sale; el contacto rápido nunca deja de estar a un scroll de distancia.
 */
export default function WhatsAppButton() {
  const pathname = usePathname();

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const covering = new Set();
    const sync = () => document.body.classList.toggle('wa-covered', covering.size > 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.9 && !entry.target.closest('[inert]')) {
            covering.add(entry.target);
          } else {
            covering.delete(entry.target);
          }
        });
        sync();
      },
      { threshold: [0, 0.9, 1] },
    );
    document.querySelectorAll(VISIBLE_CTA).forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      covering.clear();
      document.body.classList.remove('wa-covered');
    };
  }, [pathname]);

  // `aside` con nombre: el acceso flotante queda dentro de un landmark (axe: region) y sin
  // alterar su posicionamiento (el enlace sigue siendo `position: fixed`).
  return (
    <aside aria-label={ui.whatsapp.consultLabel} className="whatsapp-float-region">
      <WhatsAppLink
        source="floating"
        className="whatsapp-float"
        iconSize={24}
        aria-label={ui.whatsapp.consultLabel}
        title={ui.whatsapp.consultLabel}
      />
    </aside>
  );
}
