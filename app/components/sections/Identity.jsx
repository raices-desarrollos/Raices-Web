import { aboutContent } from '@/content/about';

export default function Identity() {
  const { identity } = aboutContent;

  return (
    <section className="section identity-section" id="identidad" aria-labelledby="identidad-title">
      <div className="identity-copy reveal">
        <p className="kicker">{identity.kicker}</p>
        <h2 id="identidad-title" className="title-stroke">
          {identity.title}
        </h2>
        <p>{identity.lead}</p>
      </div>

      <ol className="identity-list reveal-stagger">
        {identity.points.map((point, index) => (
          <li key={point}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <p>{point}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
