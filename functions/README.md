# Envío de email del formulario

El sitio se exporta estático (GitHub Pages). El formulario **no** finge un envío: solo confirma éxito cuando este worker responde `ok`.

## Qué tenés que completar

1. Crear una cuenta en [Resend](https://resend.com) y verificar el dominio (o usar su remitente de prueba).
2. Confirmar el destinatario (`CONTACT_TO_EMAIL`) antes de producción.
3. Desplegar el worker (ver `contact-worker.js`) y copiar su URL a `NEXT_PUBLIC_FORM_ENDPOINT`.
4. Rebuild y redeploy del sitio.

Hasta que el endpoint exista, el formulario no dice “mensaje enviado”: avisa que el email todavía no está activo y deja WhatsApp como canal real.
