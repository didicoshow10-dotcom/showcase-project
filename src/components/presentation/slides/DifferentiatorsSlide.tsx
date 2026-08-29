import { EditableText } from "../EditableText";
import { ContentFrame } from "../SlideFrame";
import { SLIDE_14 } from "../content";

interface SlideProps {
  index: number;
  scale: number;
}

/** 14 — Diferenciais: six numbered tiles plus a closing statement. */
export function DifferentiatorsSlide({ index, scale }: SlideProps) {
  return (
    <ContentFrame
      index={index}
      scale={scale}
      kicker={SLIDE_14.kicker}
      title={SLIDE_14.title}
    >
      <div className="grid grid-cols-3 gap-10">
        {SLIDE_14.cards.map((card, cardIndex) => (
          <article
            key={card.number}
            className="rounded-[24px] bg-lilac/55 px-11 py-10"
            style={{ minHeight: 238 }}
          >
            <EditableText
              id={`diff-number-${index}-${cardIndex}`}
              value={card.number}
              className="slide-numeral block text-lilac-deep"
              singleLine
            />
            <EditableText
              id={`diff-title-${index}-${cardIndex}`}
              as="h3"
              value={card.title}
              className="slide-body-lg mt-6 block font-bold text-plum-deep"
            />
          </article>
        ))}
      </div>

      <EditableText
        id={`diff-note-${index}`}
        as="p"
        value={SLIDE_14.note}
        className="slide-subtitle mt-12 block text-crimson"
        singleLine
      />
    </ContentFrame>
  );
}
