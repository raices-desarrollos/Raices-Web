import { Picture } from '../Primitives';
import RevealLines from '../RevealLines';
import TypologySelector from '../TypologySelector';

export default function Typologies({ content, renderNote }) {
  return (
    <section className="section section-alt plans-section" id="tipologias" aria-labelledby="tipologias-title">
      <div className="split-grid plans-intro">
        <div>
          <p className="kicker reveal">{content.kicker}</p>
          <RevealLines as="h2" id="tipologias-title" className="plans-title" lines={[content.title]} />
        </div>
        <p className="reveal">{content.lead}</p>
      </div>

      <figure className="plan-overview reveal">
        <div className="sheet plan-overview-sheet">
          <Picture image={content.floorPlan} sizes="(max-width: 1180px) 100vw, 1180px" />
        </div>
        <figcaption>{content.floorPlanCaption}</figcaption>
      </figure>

      <TypologySelector units={content.units} renderNote={content.areaNote ? `${renderNote} ${content.areaNote}` : renderNote} />
    </section>
  );
}
