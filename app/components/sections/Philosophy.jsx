import { SectionHeader } from '../Primitives';

/** Filosofía de Raíces: naturaleza como decisión de proyecto. */
export default function Philosophy() {
  return (
    <section className="section section-alt" id="filosofia" aria-labelledby="filosofia-title">
      <SectionHeader>Filosofía</SectionHeader>
      <div className="split-grid">
        <div className="reveal">
          <p className="kicker">Naturaleza urbana</p>
          <h2 id="filosofia-title" className="title-stroke">
            La naturaleza no es decoración. Es parte del proyecto.
          </h2>
        </div>
        <div className="text-stack reveal">
          <p>
            Raíces nace para desarrollar edificios que no se sientan como piezas repetidas del
            mercado. Cada proyecto toma el nombre de un árbol autóctono y busca dejar algo vivo en
            su entorno.
          </p>
          <p>
            El verde entra en la decisión de fachada, balcones, terraza, riego y mantenimiento.
            Invertir en verde es una decisión de largo plazo, y la sostenemos en cada edificio.
          </p>
          <p className="quote">Raíces construye edificios que tienen historia antes de inaugurarse.</p>
        </div>
      </div>
    </section>
  );
}
