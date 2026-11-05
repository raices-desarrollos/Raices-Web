export default function Partners({ items, label, ariaLabel }) {
  return (
    <section className="partners-section section-alt reveal" aria-label={ariaLabel}>
      <p className="label">{label}</p>
      <ul className="partners-list">
        {items.map((partner) => (
          <li key={partner.name}>
            <img
              src={partner.logo.src}
              width={partner.logo.width}
              height={partner.logo.height}
              alt={partner.name}
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
