'use client';

import { whatsappHref } from '../lib/contact';
import { trackWhatsAppClick } from '../lib/analytics';
import { WhatsAppIcon } from './Icons';

/** Enlace a WhatsApp con evento de analytics. `source` identifica desde dónde se hizo clic. */
export default function WhatsAppLink({
  source,
  className = 'button',
  children,
  message,
  iconSize = 16,
  ...rest
}) {
  return (
    <a
      className={className}
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(source)}
      {...rest}>
      <WhatsAppIcon size={iconSize} />
      {children}
    </a>
  );
}
