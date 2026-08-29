import { EditableText } from "../EditableText";
import { ContentFrame } from "../SlideFrame";
import { SLIDE_14 } from "../content";
interface SlideProps { index: number; scale: number; }
export function DifferentiatorsSlide({ index, scale }: SlideProps) {
  return (
    <ContentFrame index={index} scale={scale} kicker={SLIDE_14.kicker} title={SLIDE_14.title}>
      <div className="grid grid-cols-3 gap-6">
        {SLIDE_14.cards.map((card, cardIndex) => (
          <article key={card.number} className="rounded-[20px] bg-lilac/55 px-8 py-7" style={{ minHeight: 205 }}>
            <EditableText id={`diff-number-${index}-${cardIndex}`} value={card.number} className="slide-numeral block text-lilac-deep" singleLine />
            <EditableText id={`diff-title-${index}-${cardIndex}`} as="h3" value={card.title} className="slide-body mt-4 block font-bold text-plum-deep" />
          </article>
        ))}
      </div>
      <EditableText id={`diff-note-${index}`} as="p" value={SLIDE_14.note} className="slide-caption mt-7 block text-crimson" />
    </ContentFrame>
  );
}
