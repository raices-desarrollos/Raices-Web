import { ui } from '@/content/shared';
import WhatsAppLink from './WhatsAppLink';

/** Acceso directo flotante a WhatsApp. Solo abre el chat: sin panel ni bot. */
export default function WhatsAppButton() {
  return (
    <WhatsAppLink
      source="floating"
      className="whatsapp-float"
      iconSize={26}
      aria-label={ui.whatsapp.consultLabel}
      title={ui.whatsapp.consultLabel}
    />
  );
}
