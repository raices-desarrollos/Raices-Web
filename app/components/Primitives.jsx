import RevealLines from './RevealLines';

/** Encabezado de sección: marcador, etiqueta en mayúscula y regla. */
export function SectionHeader({ children, id }) {
  return (
    <div className="section-header reveal">
      <span className="marker" aria-hidden="true" />
      <p id={id}>{children}</p>
      <span className="rule" aria-hidden="true" />
    </div>
  );
}

/** Línea de cota: firma visual técnica, en Arena. Usar una o dos por sección como máximo. */
export function Cota({ children, className = '' }) {
  return (
    <div className={`cota ${className}`.trim()}>
      <span className="cota-line" aria-hidden="true" />
      <span className="cota-label">{children}</span>
      <span className="cota-line" aria-hidden="true" />
    </div>
  );
}

/**
 * Imagen estática con dimensiones para evitar saltos de layout.
 * `curtain` ('up' | 'left') la envuelve en una cortina de revelado (`.img-curtain`, Plan M05):
 * el contenedor se descubre con clip-path una sola vez al entrar en vista.
 */
export function Picture({ image, className, priority = false, sizes, curtain = false }) {
  const img = (
    <img
      className={className}
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt ?? ''}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      style={image.position ? { objectPosition: image.position } : undefined}
      srcSet={image.srcSet}
      sizes={image.srcSet ? (sizes ?? image.sizes) : sizes}
    />
  );
  if (!curtain) return img;
  return <span className={`img-curtain${curtain === 'left' ? ' img-curtain-left' : ''}`}>{img}</span>;
}

/**
 * Cabecera editorial de las páginas interiores. `aside` (opcional, solo desktop) es una cota a la
 * derecha del título: en Contacto lleva WhatsApp y email para que el dato quede en la primera
 * pantalla.
 */
export function PageHeader({ kicker, title, lead, children, aside, id = 'page-title' }) {
  return (
    <header className={`page-header${title.length > 42 ? ' page-header-long' : ''}${aside ? ' page-header-has-aside' : ''}`}>
      <div className="page-header-inner">
        <div className="page-header-main">
          {kicker ? <p className="kicker hero-anim">{kicker}</p> : null}
          <RevealLines as="h1" id={id} className="title-stroke" text={title} immediate />
          {lead ? <p className="page-lead hero-anim">{lead}</p> : null}
          {children}
        </div>
        {aside ? <div className="page-header-aside hero-anim">{aside}</div> : null}
      </div>
    </header>
  );
}
