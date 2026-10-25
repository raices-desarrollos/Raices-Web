import { contact } from '../content/site';

/** Enlace a WhatsApp con mensaje prellenado. */
export function whatsappHref(message = contact.whatsappMessage) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Enlace mailto con asunto y cuerpo prellenados. */
export function mailtoHref({ subject = 'Consulta por Ceibo Vidal', body = '' } = {}) {
  const params = new URLSearchParams();
  params.set('subject', subject);
  if (body) params.set('body', body);
  return `mailto:${contact.email}?${params.toString().replace(/\+/g, '%20')}`;
}

/** Arma el texto de consulta a partir de los campos del formulario. */
export function buildInquiryMessage({ nombre, email, asunto, mensaje }) {
  const intro =
    asunto && asunto !== 'Consulta general'
      ? `Hola, quiero recibir información sobre ${asunto}.`
      : 'Hola, quiero hacer una consulta a Raíces Developers.';
  const lines = [intro, ''];
  if (nombre) lines.push(`Nombre: ${nombre}`);
  if (email) lines.push(`Email: ${email}`);
  if (mensaje) lines.push('', mensaje);
  return lines.join('\n').trim();
}
