import { contact, social } from '../../content/site';
import { mailtoHref } from '../../lib/contact';
import ContactForm from '../ContactForm';
import { InstagramIcon, LinkedInIcon } from '../Icons';
import { Cota, WhatsAppLink } from '../Primitives';

export default function Contact() {
  const socialLinks = [
    social.linkedin && { href: social.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
    social.instagram && { href: social.instagram, label: 'Instagram', Icon: InstagramIcon },
  ].filter(Boolean);

  return (
    <section className="section contact-section" id="contacto" aria-labelledby="contacto-title">
      <div className="contact-inner">
        <div className="contact-copy reveal">
          <p className="kicker">Contacto</p>
          <h2 id="contacto-title" className="title-stroke">
            Hablemos de Ceibo Vidal.
          </h2>
          <p>
            Para compradores e inversores que quieran construir ciudad con más naturaleza. Te
            respondemos con información del proyecto, planos y unidades disponibles.
          </p>

          <div className="contact-actions">
            <WhatsAppLink source="contact" className="button button-large">
              Consultar por WhatsApp
            </WhatsAppLink>
            <a className="contact-line" href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
              <span className="label">WhatsApp</span>
              <span>{contact.whatsappDisplay}</span>
            </a>
            <a className="contact-line" href={mailtoHref()}>
              <span className="label">Email</span>
              <span>{contact.email}</span>
            </a>
          </div>

          {socialLinks.length > 0 ? (
            <div className="contact-social">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  className="button button-small"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} de Raíces Developers`}>
                  <Icon />
                  {label}
                </a>
              ))}
            </div>
          ) : null}

          <Cota className="contact-cota">Ceibo Vidal · Entrega prevista 2029</Cota>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
