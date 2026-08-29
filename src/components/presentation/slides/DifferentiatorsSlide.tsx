import { EditableText } from "../EditableText";
import { ContentFrame } from "../SlideFrame";
import { SLIDE_14 } from "../content";

interface SlideProps { index: number; scale: number; }

export function DifferentiatorsSlide({ index, scale }: SlideProps) {
  return (
    <ContentFrame index={index} scale={scale} kicker={SLIDE_14.kicker} title={SLIDE_14.title}>
      <div className="grid grid-cols-2 gap-5" style={{ maxHeight: "calc(100% - 165px)", overflow: "hidden" }}>
        {SLIDE_14.cards.map((card, cardIndex) => (
          <article key={card.number} className="flex min-h-[190px] flex-col justify-center rounded-[20px] bg-lilac/55 px-7 py-6">
            <EditableText id={`diff-number-${index}-${cardIndex}`} value={card.number} className="slide-numeral block text-lilac-deep" singleLine />
            <EditableText id={`diff-title-${index}-${cardIndex}`} as="h3" value={card.title} className="slide-body mt-3 block font-bold text-plum-deep" />
          </article>
        ))}
      </div>
      <EditableText id={`diff-note-${index}`} as="p" value={SLIDE_14.note} className="slide-caption mt-4 block text-crimson" />
    </ContentFrame>
  );
}
