/**
 * Worker de contacto (Cloudflare Workers / cualquier runtime Fetch).
 *
 * Recibe el POST del formulario, valida, y envía el email con Resend.
 * Las claves NUNCA van al frontend: solo viven como secrets del worker.
 *
 * Variables (wrangler secret put …):
 *   RESEND_API_KEY      — clave de https://resend.com
 *   CONTACT_TO_EMAIL    — destinatario (pendiente de confirmar antes de producción)
 *   CONTACT_FROM_EMAIL  — remitente verificado en Resend
 *                         (ej. Raíces Developers <beth.t@example.com>)
 *   ALLOWED_ORIGIN      — origen del sitio, sin barra final
 *                         (ej. https://raices-desarrollos.github.io)
 *
 * Despliegue:
 *   1. npm i -g wrangler && wrangler login
 *   2. wrangler secret put RESEND_API_KEY
 *   3. wrangler secret put CONTACT_TO_EMAIL
 *   4. wrangler secret put CONTACT_FROM_EMAIL
 *   5. wrangler secret put ALLOWED_ORIGIN
 *   6. wrangler deploy --name raices-contact functions/contact-worker.js
 *   7. Copiar la URL pública a NEXT_PUBLIC_FORM_ENDPOINT y rebuild del sitio.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FILL_MS = 3000;

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
    },
  });
}

export default {
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN || '*';

    if (request.method === 'OPTIONS') {
      return json({ ok: true }, 204, origin);
    }

    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method' }, 405, origin);
    }

    if (origin !== '*' && request.headers.get('Origin') && request.headers.get('Origin') !== origin) {
      return json({ ok: false, error: 'origin' }, 403, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: 'json' }, 400, origin);
    }

    // Honeypot y tiempo mínimo: un bot rellena `website` o envía en milisegundos.
    if (body.website) return json({ ok: true }, 200, origin);
    if (Number(body.elapsedMs) > 0 && Number(body.elapsedMs) < MIN_FILL_MS) {
      return json({ ok: true }, 200, origin);
    }

    const nombre = String(body.nombre || '').trim();
    const email = String(body.email || '').trim();
    const asunto = String(body.asunto || 'Consulta general').trim();
    const mensaje = String(body.mensaje || '').trim();

    if (!nombre || !email || !mensaje || !EMAIL_PATTERN.test(email)) {
      return json({ ok: false, error: 'validation' }, 422, origin);
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
      return json({ ok: false, error: 'unconfigured' }, 503, origin);
    }

    const text = [
      `Motivo: ${asunto}`,
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      '',
      mensaje,
    ].join('\n');

    const resend = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Consulta Raíces · ${asunto}`,
        text,
      }),
    });

    if (!resend.ok) {
      return json({ ok: false, error: 'delivery' }, 502, origin);
    }

    return json({ ok: true }, 200, origin);
  },
};
