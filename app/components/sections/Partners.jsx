import { partners } from '../../content/site';

export default function Partners() {
  return (
    <section className="partners-section section-alt reveal" aria-label="Socios del proyecto">
      <p className="label">Desarrollado en conjunto con</p>
      <ul className="partners-list">
        {partners.map((partner) => (
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
