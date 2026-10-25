import { identityPoints } from '../../content/site';

export default function Identity() {
  return (
    <section className="section identity-section" id="identidad" aria-labelledby="identidad-title">
      <div className="identity-copy reveal">
        <p className="kicker">Por qué Raíces</p>
        <h2 id="identidad-title" className="title-stroke">
          Menos repetición. Más identidad propia.
        </h2>
        <p>Tres decisiones que definen cada proyecto de Raíces.</p>
      </div>

      <ol className="identity-list reveal-stagger">
        {identityPoints.map((point, index) => (
          <li key={point}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <p>{point}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
