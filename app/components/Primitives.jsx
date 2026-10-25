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
