import Header from './Header';
import ScrollEffects from './ScrollEffects';
import WhatsAppLink from './WhatsAppLink';
import Hero from './sections/Hero';
import IntroBand from './sections/IntroBand';
import Philosophy from './sections/Philosophy';
import Project from './sections/Project';
import Typologies from './sections/Typologies';
import Green from './sections/Green';
import Location from './sections/Location';
import Identity from './sections/Identity';
import Partners from './sections/Partners';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

/**
 * Landing única. Las secciones son componentes de servidor (HTML estático);
 * solo el header, el formulario, los enlaces de WhatsApp y los efectos de scroll
 * llevan JavaScript al cliente.
 */
export default function LandingPage() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />

      <main id="contenido">
        <Hero />
        <IntroBand />
        <Philosophy />
        <Project />
        <Typologies />
        <Green />
        <Location />
        <Identity />
        <Partners />
        <Contact />
      </main>

      <Footer />

      <WhatsAppLink
        source="floating"
        className="whatsapp-float"
        iconSize={22}
        aria-label="Consultar por WhatsApp">
        <span className="whatsapp-float-label">WhatsApp</span>
      </WhatsAppLink>

      <ScrollEffects />
    </>
  );
}
