import RevealLines from '../RevealLines';

/** Declaración breve: un kicker, una frase y, si hay, párrafos de apoyo. */
export default function Statement({ content }) {
  return (
    <section className="section statement-section" id={content.id} aria-labelledby={`${content.id}-title`}>
      <div className="statement-inner reveal">
        {content.kicker ? <p className="kicker">{content.kicker}</p> : null}
        <RevealLines as="h2" id={`${content.id}-title`} className="title-stroke" text={content.title} />
        {content.paragraphs?.map((paragraph) => (
          <p className="statement-lead" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
