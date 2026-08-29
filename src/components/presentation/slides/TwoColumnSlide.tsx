import { EditableText } from "../EditableText";
import { ContentFrame } from "../SlideFrame";
import type { ColumnContent } from "../content";

interface TwoColumnSlideProps {
  index: number;
  scale: number;
  kicker: string;
  title: string;
  left: ColumnContent;
  right: ColumnContent;
}

/** 03 and 04 — two bordered cards, each with a heading and a bullet list. */
export function TwoColumnSlide({
  index,
  scale,
  kicker,
  title,
  left,
  right,
}: TwoColumnSlideProps) {
  return (
    <ContentFrame index={index} scale={scale} kicker={kicker} title={title}>
      <div className="grid grid-cols-2 gap-16">
        {[left, right].map((column, columnIndex) => (
          <article
            key={columnIndex}
            className="rounded-[28px] border border-lilac-deep/60 bg-card px-14 py-12"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <EditableText
              id={`col-heading-${index}-${columnIndex}`}
              as="h3"
              value={column.heading}
              className="slide-heading block text-plum-mid"
              singleLine
            />
            <ul className="mt-10 space-y-7">
              {column.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-5">
                  <span
                    className="mt-4 size-3 shrink-0 rounded-full bg-crimson"
                    aria-hidden="true"
                  />
                  <EditableText
                    id={`col-item-${index}-${columnIndex}-${itemIndex}`}
                    value={item}
                    className="slide-body text-slate-body"
                  />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </ContentFrame>
  );
}
