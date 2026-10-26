import { contact, contactContent } from '@/content/contact';

/** Enlace a WhatsApp con mensaje prellenado. */
export function whatsappHref(message = contact.whatsappMessage) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Enlace mailto con asunto y cuerpo prellenados. */
export function mailtoHref({ subject = contactContent.mailto.defaultSubject, body = '' } = {}) {
  const params = new URLSearchParams();
  params.set('subject', subject);
  if (body) params.set('body', body);
  return `mailto:${contact.email}?${params.toString().replace(/\+/g, '%20')}`;
}

/** Arma el texto de consulta a partir de los campos del formulario. */
export function buildInquiryMessage({ nombre, email, asunto, mensaje }) {
  const intro =
    asunto && asunto !== contactContent.inquiry.generalSubject
      ? contactContent.inquiry.aboutSubject(asunto)
      : contactContent.inquiry.general;
  const lines = [intro, ''];
  if (nombre) lines.push(`${contactContent.inquiry.namePrefix} ${nombre}`);
  if (email) lines.push(`${contactContent.inquiry.emailPrefix} ${email}`);
  if (mensaje) lines.push('', mensaje);
  return lines.join('\n').trim();
}
