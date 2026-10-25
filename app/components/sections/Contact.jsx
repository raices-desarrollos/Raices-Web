import { contact, social } from '../../content/site';
import { mailtoHref } from '../../lib/contact';
import ContactForm from '../ContactForm';
import { InstagramIcon, LinkedInIcon } from '../Icons';
import { Cota } from '../Primitives';
import WhatsAppLink from '../WhatsAppLink';

/**
 * Bloque de contacto: canales directos a la izquierda y formulario a la derecha.
 * Se usa en /contacto y, con otro título, al pie de cada proyecto.
 */
export default function Contact({
  id = 'contacto',
  kicker = 'Contacto',
  title = 'Hablemos.',
  text = 'Para compradores e inversores que quieran construir ciudad con más naturaleza. Te respondemos con información del proyecto, planos y unidades disponibles.',
  cota = 'Ceibo Vidal · Entrega prevista 2029',
  defaultSubject,
  headingLevel = 'h2',
  whatsappSource = 'contact',
}) {
  const Heading = headingLevel;
  const socialLinks = [
    social.linkedin && { href: social.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
    social.instagram && { href: social.instagram, label: 'Instagram', Icon: InstagramIcon },
  ].filter(Boolean);

  return (
    <section className="section contact-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="contact-inner">
        <div className="contact-copy reveal">
          <p className="kicker">{kicker}</p>
          <Heading id={`${id}-title`} className="title-stroke">
            {title}
          </Heading>
          <p>{text}</p>

          <div className="contact-actions">
            <WhatsAppLink source={whatsappSource} className="button button-large">
              Consultar por WhatsApp
            </WhatsAppLink>
            <a
              className="contact-line"
              href={`https://wa.me/${contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer">
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

          {cota ? <Cota className="contact-cota">{cota}</Cota> : null}
        </div>

        <ContactForm defaultSubject={defaultSubject} />
      </div>
    </section>
  );
}
