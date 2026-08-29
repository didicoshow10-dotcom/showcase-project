import { EditableText } from "../EditableText";
import { ContentFrame } from "../SlideFrame";
import { SLIDE_02 } from "../content";

interface SlideProps {
  index: number;
  scale: number;
}

/** 02 — Sumário: ten numbered entries across two columns. */
export function SummarySlide({ index, scale }: SlideProps) {
  const left = SLIDE_02.items.slice(0, 5);
  const right = SLIDE_02.items.slice(5);

  return (
    <ContentFrame
      index={index}
      scale={scale}
      kicker={SLIDE_02.kicker}
      title={SLIDE_02.title}
    >
      <div className="grid grid-cols-2 gap-x-24">
        {[left, right].map((column, columnIndex) => (
          <ul key={columnIndex} className="space-y-0">
            {column.map((item, itemIndex) => {
              const id = columnIndex * 5 + itemIndex;
              return (
                <li
                  key={item.number}
                  className="flex items-center gap-8 border-b border-lilac-deep/70 py-7"
                >
                  <EditableText
                    id={`summary-number-${id}`}
                    value={item.number}
                    className="slide-heading w-[74px] shrink-0 text-crimson"
                    singleLine
                  />
                  <EditableText
                    id={`summary-label-${id}`}
                    value={item.label}
                    className="slide-body-lg text-plum-deep"
                    singleLine
                  />
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </ContentFrame>
  );
}
