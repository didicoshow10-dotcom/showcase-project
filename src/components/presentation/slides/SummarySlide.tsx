import { EditableText } from "../EditableText";
import { ContentFrame } from "../SlideFrame";
import { SLIDE_02 } from "../content";

interface SlideProps { index: number; scale: number; }

export function SummarySlide({ index, scale }: SlideProps) {
  const left = SLIDE_02.items.slice(0, 3);
  const right = SLIDE_02.items.slice(3, 6);

  return (
    <ContentFrame index={index} scale={scale} kicker={SLIDE_02.kicker} title={SLIDE_02.title}>
      <div className="grid grid-cols-2 gap-x-16">
        {[left, right].map((column, columnIndex) => (
          <ul key={columnIndex} className="space-y-4">
            {column.map((item, itemIndex) => {
              const id = columnIndex * 3 + itemIndex;
              return (
                <li key={item.number} className="flex items-start gap-6 rounded-[18px] border border-lilac-deep/60 bg-card px-7 py-7">
                  <EditableText id={`summary-number-${id}`} value={item.number} className="slide-heading w-[64px] shrink-0 text-crimson" singleLine />
                  <EditableText id={`summary-label-${id}`} value={item.label} className="slide-body-lg text-plum-deep" />
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </ContentFrame>
  );
}
