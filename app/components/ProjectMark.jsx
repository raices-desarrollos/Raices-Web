/**
 * Identificación de un proyecto: el logotipo oficial y, debajo, solo la dirección como dato
 * secundario. El nombre NO se repite como título visible debajo del logo (regla de marca):
 * el logo ya dice “Ceibo Vidal”, y el nombre completo sigue en `alt`, SEO y navegación.
 *
 * Con `as` (h1/h2) la marca es el encabezado accesible de la sección: el logo aporta el nombre
 * por su `alt` y la dirección va como texto. `line` es la frase comercial oficial, opcional.
 */
export default function ProjectMark({ project, as: Tag = 'div', id, className = '', logoWidth, priority = false, line }) {
  return (
    <div className={`project-mark ${className}`.trim()}>
      <Tag className="project-mark-heading" id={id}>
        <img
          className="project-mark-logo"
          src={project.logo.src}
          width={project.logo.width}
          height={project.logo.height}
          alt={project.name}
          style={logoWidth ? { width: logoWidth } : undefined}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding={priority ? 'sync' : 'async'}
        />
        <span className="project-mark-address">{project.address}</span>
      </Tag>
      {line ? <p className="project-mark-line">{line}</p> : null}
    </div>
  );
}
