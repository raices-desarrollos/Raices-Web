import { aboutContent } from '@/content/about';
import { SectionHeader } from '../Primitives';

/** Filosofía de Raíces: naturaleza como decisión de proyecto. */
export default function Philosophy() {
  const { philosophy } = aboutContent;

  return (
    <section className="section section-alt" id="filosofia" aria-labelledby="filosofia-title">
      <SectionHeader>{philosophy.sectionLabel}</SectionHeader>
      <div className="split-grid">
        <div className="reveal">
          {philosophy.kicker ? <p className="kicker">{philosophy.kicker}</p> : null}
          <h2 id="filosofia-title" className="title-stroke">
            {philosophy.title}
          </h2>
        </div>
        <div className="text-stack reveal">
          {philosophy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="quote">{philosophy.quote}</p>
        </div>
      </div>
    </section>
  );
}
