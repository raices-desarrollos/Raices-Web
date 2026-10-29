import Link from 'next/link';
import { contact, contactContent } from '@/content/contact';
import { routes, ui } from '@/content/shared';
import WhatsAppLink from './WhatsAppLink';

/**
 * Tarjeta de contacto del hero (solo desktop, Plan M15). Es el único botón relleno de la
 * primera pantalla: WhatsApp directo. Sin campos de formulario: el envío real vive en
 * /contacto (ContactForm), acá solo se enlaza.
 */
export default function HeroContactCard({ source = 'hero-card' }) {
  return (
    <aside className="hero-card" aria-label={ui.footer.contactLabel}>
      <div className="hero-card-inner hero-anim">
        <p className="label hero-card-label">{ui.footer.contactLabel}</p>
        <p className="hero-card-title">{contactContent.defaults.title}</p>
        <WhatsAppLink source={source} className="button button-fill hero-card-button">
          {ui.whatsapp.consultLabel}
        </WhatsAppLink>
        <div className="hero-card-foot">
          <Link className="text-link text-link-arrow" href={`${routes.contact}#formulario`}>
            {ui.contact.writeUs}
            <span aria-hidden="true"> →</span>
          </Link>
          <span className="label hero-card-phone">{contact.whatsappDisplay}</span>
        </div>
      </div>
    </aside>
  );
}
