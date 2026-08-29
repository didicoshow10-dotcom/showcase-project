import { EditableText } from "../EditableText";
import { ContentFrame } from "../SlideFrame";
import { SLIDE_13 } from "../content";

interface SlideProps {
  index: number;
  scale: number;
}

/** 13 — Resultados esperados: checked outcome cards in two columns. */
export function ResultsSlide({ index, scale }: SlideProps) {
  return (
    <ContentFrame
      index={index}
      scale={scale}
      kicker={SLIDE_13.kicker}
      title={SLIDE_13.title}
    >
      <div className="grid grid-cols-2 gap-x-14 gap-y-6">
        {SLIDE_13.items.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className="flex items-center gap-8 rounded-[22px] border border-lilac-deep/60 bg-card px-9 py-6"
            style={{ boxShadow: "var(--shadow-card)", minHeight: 116 }}
          >
            <span
              className="flex size-14 shrink-0 items-center justify-center rounded-full bg-crimson text-primary-foreground"
              style={{ fontSize: 34, fontWeight: 700 }}
              aria-hidden="true"
            >
              ✓
            </span>
            <EditableText
              id={`result-item-${index}-${itemIndex}`}
              value={item}
              className="slide-body-lg text-plum-deep"
            />
          </div>
        ))}
      </div>
    </ContentFrame>
  );
}
