/**
 * Banda fotográfica a sangre (Plan M08). La imagen es más alta que el marco y, donde el
 * navegador soporta animaciones por scroll (`animation-timeline: view()`), se desplaza ±6 %
 * mientras la banda cruza la ventana. Sin soporte queda estática: es decorativa. Sin JS.
 */
export default function PhotoBand({ image }) {
  return (
    <figure className="photo-band">
      <div className="photo-band-frame img-curtain">
        <span className="photo-band-shift">
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            sizes="100vw"
          />
        </span>
      </div>
      {image.note ? <figcaption className="photo-band-note label">{image.note}</figcaption> : null}
    </figure>
  );
}
