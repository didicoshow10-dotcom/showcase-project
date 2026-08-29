import { EditableText } from "../EditableText";
import { ContentFrame } from "../SlideFrame";
import { MONTH_TABS, type MonthContent } from "../content";

interface MonthSlideProps {
  index: number;
  scale: number;
  content: MonthContent;
}

/** 05, 06 and 07 — month tabs, three gradient pillars, actions and deliverable. */
export function MonthSlide({ index, scale, content }: MonthSlideProps) {
  return (
    <ContentFrame
      index={index}
      scale={scale}
      kicker={content.kicker}
      title={content.title}
    >
      <div className="flex gap-5">
        {MONTH_TABS.map((tab, tabIndex) => {
          const isActive = tabIndex === content.activeTab;
          return (
            <span
              key={tab}
              className={`slide-body rounded-full px-9 py-4 font-semibold ${
                isActive
                  ? "bg-crimson text-primary-foreground"
                  : "bg-lilac/70 text-plum-soft"
              }`}
            >
              <EditableText id={`month-tab-${index}-${tabIndex}`} value={tab} singleLine />
            </span>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-10">
        {content.pillars.map((pillar, pillarIndex) => (
          <div
            key={pillarIndex}
            className="flex items-center rounded-[22px] px-12 py-8"
            style={{
              background:
                pillarIndex % 2 === 0
                  ? "var(--gradient-plum)"
                  : "var(--gradient-plum-reverse)",
            }}
          >
            <EditableText
              id={`month-pillar-${index}-${pillarIndex}`}
              as="h3"
              value={pillar}
              className="slide-heading text-primary-foreground"
              singleLine
            />
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-20">
        {[content.leftItems, content.rightItems].map((column, columnIndex) => (
          <ul key={columnIndex}>
            {column.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="flex items-start gap-5 border-b border-lilac-deep/60 py-5"
              >
                <span
                  className="mt-3 size-3 shrink-0 rounded-full bg-plum-soft"
                  aria-hidden="true"
                />
                <EditableText
                  id={`month-item-${index}-${columnIndex}-${itemIndex}`}
                  value={item}
                  className="slide-body text-slate-body"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-9 rounded-[20px] bg-lilac/60 px-10 py-7">
        <span className="slide-chrome rounded-full bg-crimson px-7 py-3 font-bold uppercase tracking-[0.16em] text-primary-foreground">
          <EditableText
            id={`month-deliverable-label-${index}`}
            value={content.deliverableLabel}
            singleLine
          />
        </span>
        <EditableText
          id={`month-deliverable-${index}`}
          value={content.deliverable}
          className="slide-body-lg text-plum-deep"
          singleLine
        />
      </div>
    </ContentFrame>
  );
}
