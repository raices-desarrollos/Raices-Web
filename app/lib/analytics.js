/**
 * Punto único para enchufar analytics más adelante (GA4, Plausible, Meta Pixel…).
 * Hoy no envía nada: solo centraliza los eventos para que el resto del sitio
 * no dependa de ningún proveedor.
 *
 * Para activarlo, implementar el envío dentro de `trackEvent`. Por ejemplo:
 *   window.gtag?.('event', name, params);
 *   window.plausible?.(name, { props: params });
 */
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;
  // Sin proveedor configurado: no-op. Dejar este hook como único punto de integración.
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', name, params);
  }
}

/** Clic en cualquier enlace a WhatsApp. `source` identifica desde dónde (hero, header, contacto…). */
export function trackWhatsAppClick(source) {
  trackEvent('whatsapp_click', { source });
}

/** Envío del formulario de contacto. `method`: 'endpoint' | 'whatsapp' | 'email'. */
export function trackFormSubmit(method, extra = {}) {
  trackEvent('contact_form_submit', { method, ...extra });
}
