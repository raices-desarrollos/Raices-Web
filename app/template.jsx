/**
 * Se vuelve a montar en cada navegación: la clase `page-enter` dispara la transición
 * de entrada de página (fundido + leve ascenso) definida en globals.css.
 */
export default function Template({ children }) {
  return (
    <main id="contenido" className="page-enter">
      {children}
    </main>
  );
}
