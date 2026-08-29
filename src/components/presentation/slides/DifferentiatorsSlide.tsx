import { EditableText } from "../EditableText";
import { ContentFrame } from "../SlideFrame";
import { SLIDE_14 } from "../content";

interface SlideProps { index: number; scale: number; }

export function DifferentiatorsSlide({ index, scale }: SlideProps) {
  return (
    <ContentFrame index={index} scale={scale} kicker={SLIDE_14.kicker} title={SLIDE_14.title}>
      <div className="grid grid-cols-3 gap-4 px-2" style={{ maxHeight: "calc(100% - 150px)", overflow: "hidden" }}>
        {SLIDE_14.cards.map((card, cardIndex) => (
          <article key={card.number} className="flex min-h-[150px] flex-col justify-center rounded-[20px] bg-lilac/55 px-5 py-5">
            <EditableText id={`diff-number-${index}-${cardIndex}`} value={card.number} className="block text-[30px] leading-none text-lilac-deep" singleLine />
            <EditableText id={`diff-title-${index}-${cardIndex}`} as="h3" value={card.title} className="slide-caption mt-3 block font-bold leading-[1.3] text-plum-deep" />
          </article>
        ))}
      </div>
      <EditableText id={`diff-note-${index}`} as="p" value={SLIDE_14.note} className="slide-caption mt-3 block max-w-[1080px] text-crimson" />
    </ContentFrame>
  );
}
