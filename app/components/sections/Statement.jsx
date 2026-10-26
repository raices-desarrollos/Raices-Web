/** Declaración breve: un kicker y una frase, sin texto adicional. */
export default function Statement({ content }) {
  return (
    <section className="section statement-section" id={content.id} aria-labelledby={`${content.id}-title`}>
      <div className="statement-inner reveal">
        {content.kicker ? <p className="kicker">{content.kicker}</p> : null}
        <h2 id={`${content.id}-title`} className="title-stroke">
          {content.title}
        </h2>
      </div>
    </section>
  );
}
