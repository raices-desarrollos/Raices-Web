/**
 * Worker de contacto (Cloudflare Workers / cualquier runtime Fetch).
 *
 * Recibe el POST del formulario, valida, y envía el email con Resend.
 * Las claves NUNCA van al frontend: solo viven como secrets del worker.
 *
 * Variables (wrangler secret put …):
 *   RESEND_API_KEY      — clave de https://resend.com
 *   CONTACT_TO_EMAIL    — raicesdevelopers@gmail.com
 *   CONTACT_FROM_EMAIL  — remitente verificado en Resend (no inventar; pendiente)
 *   ALLOWED_ORIGIN      — origen del sitio, sin barra final
 *                         (ej. https://www.raices.dev)
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
const MAX_BODY = 10_000;
const LIMITS = { nombre: 120, email: 254, asunto: 80, mensaje: 5000 };
// Throttling best-effort por IP (memoria del isolate, sin infraestructura extra).
const RATE_MAX = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map();

function limited(ip) {
  const now = Date.now();
  for (const [k, v] of hits) if (now - v.start > RATE_WINDOW_MS) hits.delete(k);
  const h = hits.get(ip) || { start: now, n: 0 };
  h.n += 1;
  hits.set(ip, h);
  return h.n > RATE_MAX;
}

const oneLine = (v, max) =>
  String(v || "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
    },
  });
}

const handler = {
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN || "*";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Accept",
        },
      });
    }

    if (request.method !== "POST") {
      return json({ ok: false, error: "method" }, 405, origin);
    }

    if (origin !== "*" && request.headers.get("Origin") !== origin) {
      return json({ ok: false, error: "origin" }, 403, origin);
    }

    if (limited(request.headers.get("CF-Connecting-IP") || "unknown")) {
      return json({ ok: false, error: "rate" }, 429, origin);
    }

    let body;
    try {
      const raw = await request.text();
      if (raw.length > MAX_BODY)
        return json({ ok: false, error: "size" }, 413, origin);
      body = JSON.parse(raw);
      if (!body || typeof body !== "object") throw new Error("shape");
    } catch {
      return json({ ok: false, error: "json" }, 400, origin);
    }

    // Honeypot y tiempo mínimo: un bot rellena `website` o envía en milisegundos.
    if (body.website) return json({ ok: true }, 200, origin);
    if (Number(body.elapsedMs) > 0 && Number(body.elapsedMs) < MIN_FILL_MS) {
      return json({ ok: true }, 200, origin);
    }

    const nombre = oneLine(body.nombre, LIMITS.nombre);
    const email = oneLine(body.email, LIMITS.email);
    const asunto = oneLine(body.asunto, LIMITS.asunto) || "Consulta general";
    const mensaje = String(body.mensaje || "")
      .trim()
      .slice(0, LIMITS.mensaje);

    if (!nombre || !email || !mensaje || !EMAIL_PATTERN.test(email)) {
      return json({ ok: false, error: "validation" }, 422, origin);
    }

    if (
      !env.RESEND_API_KEY ||
      !env.CONTACT_TO_EMAIL ||
      !env.CONTACT_FROM_EMAIL
    ) {
      return json({ ok: false, error: "unconfigured" }, 503, origin);
    }

    const text = [
      `Motivo: ${asunto}`,
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      "",
      mensaje,
    ].join("\n");

    let resend;
    try {
      resend = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.CONTACT_FROM_EMAIL,
          to: [env.CONTACT_TO_EMAIL],
          reply_to: email,
          subject: `Consulta Raíces · ${asunto}`,
          text,
        }),
      });
    } catch {
      return json({ ok: false, error: "delivery" }, 502, origin);
    }

    if (!resend.ok) {
      return json({ ok: false, error: "delivery" }, 502, origin);
    }

    return json({ ok: true }, 200, origin);
  },
};

export default handler;
