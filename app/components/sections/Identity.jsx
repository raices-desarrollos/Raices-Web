import { aboutContent } from '@/content/about';

export default function Identity({ content = aboutContent.identity }) {
  const id = content.id || 'identidad';

  return (
    <section className="section identity-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="identity-copy reveal">
        <p className="kicker">{content.kicker}</p>
        <h2 id={`${id}-title`} className="title-stroke">
          {content.title}
        </h2>
        {content.lead ? <p>{content.lead}</p> : null}
      </div>

      <ol className="identity-list reveal-stagger">
        {content.points.map((point, index) => (
          <li key={point}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <p>{point}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
