/** Banda de síntesis: tres datos cortos con etiqueta. */
export default function IntroBand({ items, label = 'Síntesis' }) {
  return (
    <section className="intro-band reveal-stagger" aria-label={label}>
      {items.map((item) => (
        <div className="intro-item" key={item.label}>
          <span className="label">{item.label}</span>
          <p>{item.text}</p>
        </div>
      ))}
    </section>
  );
}
