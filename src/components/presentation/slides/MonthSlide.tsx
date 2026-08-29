import { EditableText } from "../EditableText";
import { ContentFrame } from "../SlideFrame";
import { MONTH_TABS, type MonthContent } from "../content";

interface MonthSlideProps { index: number; scale: number; content: MonthContent; }

export function MonthSlide({ index, scale, content }: MonthSlideProps) {
  return (
    <ContentFrame index={index} scale={scale} kicker={content.kicker} title={content.title}>
      <div className="flex gap-4">
        {MONTH_TABS.map((tab, tabIndex) => {
          const isActive = tabIndex === content.activeTab;
          return <span key={tab} className={`slide-caption rounded-full px-6 py-2.5 font-semibold ${isActive ? "bg-crimson text-primary-foreground" : "bg-lilac/70 text-plum-soft"}`}><EditableText id={`month-tab-${index}-${tabIndex}`} value={tab} singleLine /></span>;
        })}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-6">
        {content.pillars.map((pillar, pillarIndex) => (
          <div key={pillarIndex} className="flex items-center rounded-[18px] px-8 py-5" style={{ background: pillarIndex % 2 === 0 ? "var(--gradient-plum)" : "var(--gradient-plum-reverse)" }}>
            <EditableText id={`month-pillar-${index}-${pillarIndex}`} as="h3" value={pillar} className="slide-heading text-primary-foreground" singleLine />
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-x-12">
        {[content.leftItems, content.rightItems].map((column, columnIndex) => (
          <ul key={columnIndex}>
            {column.map((item, itemIndex) => <li key={itemIndex} className="flex items-start gap-3 border-b border-lilac-deep/60 py-2.5"><span className="mt-2.5 size-2 shrink-0 rounded-full bg-plum-soft" aria-hidden="true" /><EditableText id={`month-item-${index}-${columnIndex}-${itemIndex}`} value={item} className="slide-caption text-slate-body" /></li>)}
          </ul>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-6 rounded-[18px] bg-lilac/60 px-7 py-4">
        <span className="slide-chrome shrink-0 rounded-full bg-crimson px-5 py-2 font-bold uppercase tracking-[0.12em] text-primary-foreground"><EditableText id={`month-deliverable-label-${index}`} value={content.deliverableLabel} singleLine /></span>
        <EditableText id={`month-deliverable-${index}`} value={content.deliverable} className="slide-body text-plum-deep" />
      </div>
    </ContentFrame>
  );
}
