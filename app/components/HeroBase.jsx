import { contactContent } from '@/content/contact';
import { ui } from '@/content/shared';
import { mailtoHref } from '../lib/contact';
import { ArrowUpRightIcon, MailIcon } from './Icons';
import WhatsAppLink from './WhatsAppLink';

/**
 * Base del hero: la línea de suelo de la primera pantalla. Lleva la nota del render y los dos
 * accesos de contacto (WhatsApp con su mensaje predefinido y mailto), sin fondo ni caja: van
 * sobre el Carbón en el que termina la fotografía.
 * Desktop: una sola fila, nota · línea · contacto. Tablet y mobile: línea con la nota y, debajo,
 * los dos accesos en mitades iguales.
 */
export default function HeroBase({ note, source = 'hero-contact' }) {
  const { channels } = contactContent;
  return (
    <div className="hero-base">
      <div className="hero-base-row hero-anim">
        {note ? <span className="hero-base-note label">{note}</span> : null}
        <span className="hero-base-line" aria-hidden="true" />
        <aside className="hero-contact" aria-label={ui.footer.contactLabel}>
          <span className="hero-contact-label label" aria-hidden="true">
            {ui.footer.contactLabel}
          </span>
          <WhatsAppLink source={source} iconSize={18} className="hero-contact-link">
            <span className="hero-contact-text">{channels.whatsappLabel}</span>
            <ArrowUpRightIcon className="hero-contact-arrow" />
          </WhatsAppLink>
          <a className="hero-contact-link" href={mailtoHref()}>
            <MailIcon size={18} />
            <span className="hero-contact-text">{channels.emailLabel}</span>
            <ArrowUpRightIcon className="hero-contact-arrow" />
          </a>
        </aside>
      </div>
    </div>
  );
}
