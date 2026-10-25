import { greenFeatures } from '../../content/site';
import { Picture, SectionHeader } from '../Primitives';

export default function Green() {
  return (
    <section className="section green-section" id="verde" aria-labelledby="verde-title">
      <SectionHeader>Verde edilicio</SectionHeader>
      <div className="green-intro reveal">
        <p className="kicker">Del balcón a la escala del edificio</p>
        <h2 id="verde-title" className="title-stroke">
          Un sistema vivo, no una maceta suelta.
        </h2>
      </div>

      <div className="feature-grid">
        <article className="feature-card feature-card-wide reveal">
          <figure>
            <Picture image={greenFeatures.terrace} sizes="(max-width: 980px) 100vw, 60vw" />
            <figcaption>{greenFeatures.referenceNote}</figcaption>
          </figure>
          <div className="feature-copy">
            <span className="label">Terraza común</span>
            <h3>Agua, sombra y vegetación en la cubierta.</h3>
            <p>
              Terraza común con jacuzzi, jardineras y sombra natural. El remate del edificio
              también se habita.
            </p>
          </div>
        </article>

        <article className="feature-card reveal">
          <figure>
            <Picture image={greenFeatures.balconies} sizes="(max-width: 980px) 100vw, 50vw" />
            <figcaption>{greenFeatures.referenceNote}</figcaption>
          </figure>
          <div className="feature-copy">
            <span className="label">Balcones vivos</span>
            <h3>Trepadoras y tensores como fachada.</h3>
            <p>
              Plantas guiadas a escala edilicia, con estructura prevista desde el proyecto y no
              agregada al final.
            </p>
          </div>
        </article>

        <article className="feature-card system-card reveal">
          <div className="system-diagram" aria-hidden="true">
            <span className="root-line root-line-one" />
            <span className="root-line root-line-two" />
            <span className="root-line root-line-three" />
          </div>
          <div className="feature-copy">
            <span className="label">Sistema natural</span>
            <h3>Riego, mantenimiento e identidad.</h3>
            <p>
              La vegetación se piensa con tensores, drenajes y riego automatizado: un sistema
              sostenible para quienes viven el edificio y para su administración.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
