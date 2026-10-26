import { contact, contactContent, social } from '@/content/contact';
import { ui } from '@/content/shared';
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
  kicker = contactContent.defaults.kicker,
  title = contactContent.defaults.title,
  text = contactContent.defaults.text,
  cota = contactContent.defaults.cota,
  defaultSubject,
  headingLevel = 'h2',
  whatsappSource = 'contact',
}) {
  const Heading = headingLevel;
  const socialLinks = [
    social.linkedin && { href: social.linkedin, label: contactContent.channels.linkedinLabel, Icon: LinkedInIcon },
    social.instagram && { href: social.instagram, label: contactContent.channels.instagramLabel, Icon: InstagramIcon },
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
              {ui.whatsapp.consultLabel}
            </WhatsAppLink>
            <a
              className="contact-line"
              href={`https://wa.me/${contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer">
              <span className="label">{contactContent.channels.whatsappLabel}</span>
              <span>{contact.whatsappDisplay}</span>
            </a>
            <a className="contact-line" href={mailtoHref()}>
              <span className="label">{contactContent.channels.emailLabel}</span>
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
                  aria-label={`${label} ${contactContent.channels.socialAriaSuffix}`}>
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
