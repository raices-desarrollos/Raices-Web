import { contactContent } from '@/content/contact';
import { ui } from '@/content/shared';
import { mailtoHref } from '../lib/contact';
import { MailIcon } from './Icons';
import WhatsAppLink from './WhatsAppLink';

/**
 * Tarjeta de contacto del hero: compacta y editorial. Dos filas de enlace con icono, separadas por
 * una sola línea fina, con el mismo WhatsApp (mensaje predefinido) y mailto que el resto del sitio.
 * Desktop: abajo a la derecha, alineada con el CTA; tablet y mobile: en flujo, bajo el contenido.
 */
export default function HeroContactCard({ source = 'hero-card' }) {
  const { channels, defaults } = contactContent;
  return (
    <aside className="hero-card" aria-label={ui.footer.contactLabel}>
      <div className="hero-card-inner hero-anim">
        <p className="label hero-card-label">{ui.footer.contactLabel}</p>
        <p className="hero-card-title">{defaults.title}</p>
        <div className="hero-card-links">
          <WhatsAppLink source={source} iconSize={19} className="hero-card-link">
            {channels.whatsappLabel}
            <span className="hero-card-arrow" aria-hidden="true">
              ↗
            </span>
          </WhatsAppLink>
          <a className="hero-card-link" href={mailtoHref()}>
            <MailIcon size={19} />
            {channels.emailLabel}
            <span className="hero-card-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
    </aside>
  );
}
