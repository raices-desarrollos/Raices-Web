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

/** Imagen estática con dimensiones para evitar saltos de layout. */
export function Picture({ image, className, priority = false, sizes }) {
  return (
    <img
      className={className}
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt ?? ''}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      sizes={sizes}
    />
  );
}

/**
 * Texto que aparece palabra por palabra (cada palabra sube desde una máscara).
 * Se dispara con la clase `is-visible` del propio elemento o de un ancestro `.reveal`.
 * Es HTML estático: la animación es CSS pura y respeta prefers-reduced-motion.
 */
export function RevealText({ text, className = '', delay = 0 }) {
  const words = text.split(' ');
  return (
    <span className={`reveal-text ${className}`.trim()}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="rt-word">
            <span style={{ '--i': index + delay }}>{word}</span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  );
}

/** Cabecera editorial de las páginas interiores. */
export function PageHeader({ kicker, title, lead, children, id = 'page-title' }) {
  return (
    <header className="page-header">
      <div className="page-header-inner">
        {kicker ? <p className="kicker hero-anim">{kicker}</p> : null}
        <h1 id={id}>
          <RevealText text={title} className="is-visible" />
        </h1>
        {lead ? <p className="page-lead hero-anim">{lead}</p> : null}
        {children}
      </div>
    </header>
  );
}
