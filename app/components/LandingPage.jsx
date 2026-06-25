'use client';

import { useEffect, useState } from 'react';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491100000000';
const CONTACT_EMAIL = 'contacto@raicesdesarrolladores.com.ar';

const navItems = [
  { href: '#filosofia', label: 'Filosofía' },
  { href: '#ceibo-vidal', label: 'Ceibo Vidal' },
  { href: '#tipologias', label: 'Tipologías' },
  { href: '#verde', label: 'Verde edilicio' },
  { href: '#contacto', label: 'Contacto' },
];

const specs = [
  { label: 'Monoambiente total', value: '39,06 m²', note: 'Cubierto 35,79 m²' },
  { label: 'Dos ambientes total', value: '56,18 m²', note: 'Cubierto 48,39 m²' },
  { label: 'Tres ambientes total', value: '79,75 m²', note: 'Cubierto 68,67 m²' },
  { label: 'Altura', value: 'PB + 4' },
];

const typologies = [
  {
    department: 'Departamento B',
    title: 'Monoambiente',
    image: '/assets/plans/ceibo-tipologia-monoambiente.png',
    alt: 'Plano de monoambiente Departamento B',
    areas: [
      ['Cubierto', '35,79 m²'],
      ['Balcón', '3,27 m²'],
      ['Total', '39,06 m²'],
    ],
  },
  {
    department: 'Departamento C',
    title: '2 ambientes',
    image: '/assets/plans/ceibo-tipologia-2-ambientes.png',
    alt: 'Plano de dos ambientes Departamento C',
    areas: [
      ['Cubierto', '48,39 m²'],
      ['Balcón', '7,79 m²'],
      ['Total', '56,18 m²'],
    ],
  },
  {
    department: 'Departamento A',
    title: '3 ambientes',
    image: '/assets/plans/ceibo-tipologia-3-ambientes.png',
    alt: 'Plano de tres ambientes Departamento A',
    areas: [
      ['Cubierto', '68,67 m²'],
      ['Balcón', '11,08 m²'],
      ['Total', '79,75 m²'],
    ],
  },
];

function whatsappHref(message = 'Hola, quiero recibir información sobre Ceibo Vidal.') {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function Header({ navOpen, setNavOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 18);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen);
    return () => document.body.classList.remove('nav-open');
  }, [navOpen]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setNavOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [setNavOpen]);

  return (
    <header
      className={`site-header ${scrolled ? 'is-scrolled' : ''} ${navOpen ? 'nav-active' : ''}`}>
      <a
        className="brand"
        href="#inicio"
        aria-label="Raíces Desarrolladores, ir al inicio"
        onClick={() => setNavOpen(false)}>
        <img
          src="/assets/images/raices_logo_transparente.png"
          alt="Raíces Desarrolladores"
          className="brand-logo"
        />
        <span className="brand-text">
          <span className="brand-name">RAÍCES</span>
          <span className="brand-tag">Desarrolladores</span>
        </span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label={navOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={navOpen}
        onClick={() => setNavOpen((value) => !value)}>
        <span />
        <span />
      </button>

      <nav className="site-nav" aria-label="Navegación principal">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setNavOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function SectionHeader({ children }) {
  return (
    <div className="section-header reveal">
      <span className="marker" />
      <p>{children}</p>
      <span className="rule" />
    </div>
  );
}

function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappHref()}
      target="_blank"
      rel="noreferrer"
      aria-label="Consultar por WhatsApp">
      <span className="whatsapp-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          width="28"
          height="28"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </span>
      <span>WhatsApp</span>
    </a>
  );
}

export default function LandingPage() {
  const [navOpen, setNavOpen] = useState(false);

  function handleContactSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nombre = data.get('nombre') || '';
    const email = data.get('email') || '';
    const mensaje = data.get('mensaje') || 'Quiero recibir información del proyecto Ceibo Vidal.';
    const subject = encodeURIComponent('Consulta por Ceibo Vidal');
    const body = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`);

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger > *');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateHeroProgress = () => {
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      document.documentElement.style.setProperty('--hero-progress', progress.toFixed(3));
    };
    updateHeroProgress();
    window.addEventListener('scroll', updateHeroProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateHeroProgress);
  }, []);

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />

      <main id="contenido">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="/assets/images/ceibo-vidal-fachada.png"
            alt="Fachada residencial clara con balcones verdes y vegetación trepadora"
          />
          <div className="hero-scrim" />

          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">
              <span />
              Raíces Desarrolladores · Buenos Aires
            </p>
            <h1 id="hero-title">Raíces</h1>
            <p className="hero-lead">
              Edificios que acercan la vida urbana a la naturaleza. Plantamos identidad, verde y
              permanencia en cada proyecto.
            </p>
            <div className="hero-actions" aria-label="Acciones principales">
              <a className="button button-primary" href="#ceibo-vidal">
                Ver primer proyecto
              </a>
              <a
                className="button button-secondary"
                href={whatsappHref()}
                target="_blank"
                rel="noreferrer">
                Consultar por WhatsApp
              </a>
            </div>
          </div>

          <div className="hero-measure" aria-label="Datos destacados">
            <span>RAÍCES · P.001</span>
            <span>Ceibo Vidal</span>
            <span>Vidal 3849</span>
          </div>
        </section>

        <section className="intro-band reveal-stagger" aria-label="Síntesis de marca">
          <div className="intro-item">
            <span className="mini-label">Misión</span>
            <strong>Expandir naturaleza a través de la ciudad.</strong>
          </div>
          <div className="intro-item">
            <span className="mini-label">Sistema</span>
            <strong>Raíces, árboles y edificios con nombre propio.</strong>
          </div>
          <div className="intro-item">
            <span className="mini-label">Proyecto 001</span>
            <strong>Ceibo Vidal · PB + 4 pisos.</strong>
          </div>
        </section>

        <section className="section manifesto-section" id="filosofia">
          <SectionHeader>Filosofía</SectionHeader>
          <div className="manifesto-grid">
            <div className="reveal">
              <p className="section-kicker">Naturaleza urbana</p>
              <h2>La ciudad también puede echar raíces.</h2>
            </div>
            <div className="text-stack reveal">
              <p>
                Raíces nace para desarrollar edificios que no se sientan como piezas repetidas del
                mercado. Cada proyecto toma el nombre de un árbol autóctono y busca dejar algo vivo
                en su entorno.
              </p>
              <p>
                La naturaleza no aparece como decoración final: entra en la decisión de fachada,
                balcones, terraza, riego, mantenimiento e identidad. Si invertir en verde reduce
                margen, sigue siendo parte del camino correcto.
              </p>
            </div>
          </div>
        </section>

        <section className="section project-section" id="ceibo-vidal">
          <SectionHeader>Proyecto 001</SectionHeader>

          <div className="project-layout">
            <div className="project-copy reveal">
              <p className="section-kicker">Vidal 3849 · CABA</p>
              <h2>Ceibo Vidal</h2>
              <p>
                Un edificio bajo, claro y vegetal: planta baja y cuatro pisos, con tres tipologías
                por nivel para combinar escala barrial, eficiencia y calidad espacial.
              </p>
              <div className="tag-row" aria-label="Características del proyecto">
                <span>En desarrollo</span>
                <span>PB + 4 pisos</span>
                <span>3 tipologías</span>
              </div>
            </div>

            <figure className="project-figure reveal">
              <img
                src="/assets/images/ceibo-vidal-fachada.png"
                alt="Imagen conceptual de Ceibo Vidal con balcones verdes"
              />
              <figcaption>Imagen conceptual provisoria · identidad vegetal en fachada</figcaption>
            </figure>
          </div>

          <div className="spec-grid reveal-stagger" aria-label="Ficha técnica de Ceibo Vidal">
            {specs.map((spec) => (
              <article className="spec-card" key={spec.label}>
                <span>{spec.label}</span>
                <strong>{spec.value}</strong>
                {spec.note ? <small>{spec.note}</small> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="section plans-section" id="tipologias" aria-labelledby="floor-title">
          <div className="plans-intro">
            <div className="reveal">
              <p className="section-kicker">Planos reales</p>
              <h2 id="floor-title">Tres tipologías por planta, todas con balcón.</h2>
            </div>
            <p className="reveal">
              La planta tipo organiza un monoambiente, un dos ambientes y un tres ambientes
              alrededor del núcleo de circulación. Cada unidad incorpora expansión exterior hacia
              frente o contrafrente.
            </p>
          </div>

          <figure className="plan-overview reveal">
            <img
              src="/assets/plans/ceibo-planta-tipo.png"
              alt="Planta tipo de Ceibo Vidal con departamentos A, B y C"
            />
            <figcaption>
              Planta tipo · Departamento A 3 ambientes · B monoambiente · C 2 ambientes
            </figcaption>
          </figure>

          <div className="typology-grid" aria-label="Tipologías de departamentos">
            {typologies.map((typology) => (
              <article className="typology-card reveal" key={typology.department}>
                <div className="typology-copy">
                  <span>{typology.department}</span>
                  <h3>{typology.title}</h3>
                  <dl>
                    {typology.areas.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <img src={typology.image} alt={typology.alt} />
              </article>
            ))}
          </div>
        </section>

        <section className="section green-section" id="verde">
          <SectionHeader>Verde edilicio</SectionHeader>
          <div className="green-intro reveal">
            <p className="section-kicker">Del balcón a la escala del edificio</p>
            <h2>Un sistema vivo, no una maceta suelta.</h2>
          </div>

          <div className="feature-grid">
            <article className="feature-card feature-card-wide reveal">
              <img
                src="/assets/images/terraza-verde.png"
                alt="Terraza verde con vegetación y pileta pequeña"
              />
              <div>
                <span>Terrazas verdes</span>
                <h3>Agua, sombra y vegetación en la cubierta.</h3>
                <p>
                  Espacios comunes con jardineras, sombra natural y jacuzzi o pileta pequeña para
                  que el remate del edificio también sea habitable.
                </p>
              </div>
            </article>

            <article className="feature-card reveal">
              <img
                src="/assets/images/balcones-tensores.png"
                alt="Balcones con plantas trepadoras y tensores verticales"
              />
              <div>
                <span>Balcones vivos</span>
                <h3>Trepadoras y tensores como fachada.</h3>
                <p>
                  Plantas guiadas a escala edilicia, con estructura prevista desde el proyecto y no
                  agregada al final.
                </p>
              </div>
            </article>

            <article className="feature-card system-card reveal">
              <div className="system-diagram" aria-hidden="true">
                <span className="root-line root-line-one" />
                <span className="root-line root-line-two" />
                <span className="root-line root-line-three" />
              </div>
              <div>
                <span>Sistema natural</span>
                <h3>Riego, mantenimiento e identidad.</h3>
                <p>
                  La vegetación se piensa con tensores, drenajes y riego automatizado: un sistema
                  sostenible para usuarios y administración.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="section identity-section">
          <div className="identity-copy reveal">
            <p className="section-kicker">Diferenciarse también construye valor</p>
            <h2>Menos template. Más identidad propia.</h2>
          </div>

          <div className="identity-list reveal-stagger">
            <article>
              <span>01</span>
              <p>
                Cada edificio se nombra como un árbol autóctono: Ceibo, Jacarandá, Ombú y los que
                vengan.
              </p>
            </article>
            <article>
              <span>02</span>
              <p>
                El verde es una decisión ética y de marca: mejora la vida cotidiana y deja una firma
                reconocible.
              </p>
            </article>
            <article>
              <span>03</span>
              <p>
                La rentabilidad inmediata no tapa el objetivo mayor: crear una desarrolladora con
                criterio propio y futuro.
              </p>
            </article>
          </div>
        </section>

        <section className="contact-section" id="contacto">
          <div className="contact-inner">
            <div className="reveal">
              <p className="section-kicker">Contacto</p>
              <h2>Hablemos de Ceibo Vidal.</h2>
              <p>
                Para inversores, compradores o futuros socios que quieran construir ciudad con más
                naturaleza.
              </p>
              <div className="contact-actions">
                <a
                  className="button button-whatsapp"
                  href={whatsappHref()}
                  target="_blank"
                  rel="noreferrer">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="18"
                    height="18"
                    aria-hidden="true"
                    style={{ flexShrink: 0 }}
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Consultar por WhatsApp
                </a>

                <div className="contact-social">
                  <a
                    className="button button-social"
                    href="#"
                    aria-label="LinkedIn de Raíces Desarrolladores">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="16"
                      height="16"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    className="button button-social"
                    href="#"
                    aria-label="Instagram de Raíces Desarrolladores">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="16"
                      height="16"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            <form className="contact-form reveal" onSubmit={handleContactSubmit}>
              <label>
                <span>Nombre</span>
                <input name="nombre" type="text" autoComplete="name" placeholder="Tu nombre" />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" placeholder="tu@email.com" />
              </label>
              <label>
                <span>Mensaje</span>
                <textarea
                  name="mensaje"
                  rows="4"
                  placeholder="Quiero recibir información del proyecto"
                />
              </label>
              <button className="button button-primary" type="submit">
                Enviar consulta
              </button>
              <p className="form-note">
                También podés escribir directo por WhatsApp desde el botón fijo.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer-brand">
          <img
            src="/assets/images/raices_logo_transparente.png"
            alt="Raíces Desarrolladores"
            className="site-footer-logo"
          />
          <p>RAÍCES DESARROLLADORES · Naturaleza urbana</p>
        </div>
        <a href="#inicio">Volver arriba</a>
      </footer>

      <WhatsAppButton />
    </>
  );
}
