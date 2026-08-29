import { EditableText } from "../EditableText";
import { ContentFrame } from "../SlideFrame";
import type { BadgeCard } from "../content";

interface BadgeCardsSlideProps {
  index: number;
  scale: number;
  kicker: string;
  title: string;
  cards: BadgeCard[];
  columns: 2 | 3;
  note?: string;
  cardMinHeight?: number;
  compact?: boolean;
}

export function BadgeCardsSlide({ index, scale, kicker, title, cards, columns, note, compact = false }: BadgeCardsSlideProps) {
  const twoRows = cards.length > columns;
  const useTwoByTwo = cards.length === 4;
  const effectiveColumns = useTwoByTwo ? 2 : columns;
  const cardHeight = useTwoByTwo ? 270 : (twoRows ? (columns === 2 ? 245 : 215) : 300);
  const safeBottom = 190;
  return (
    <ContentFrame index={index} scale={scale} kicker={kicker} title={title}>
      <div className="flex flex-col" style={{ maxHeight: `calc(100% - ${safeBottom}px)`, overflow: "hidden" }}>
        <div className="grid items-stretch gap-6" style={{ gridTemplateColumns: `repeat(${effectiveColumns}, minmax(0, 1fr))` }}>
          {cards.map((card, cardIndex) => (
            <article key={cardIndex} className={`flex flex-col rounded-[22px] border border-lilac-deep/60 bg-card ${compact ? "px-7 py-6" : "px-8 py-7"}`} style={{ boxShadow: "var(--shadow-card)", height: cardHeight }}>
              <div className="min-h-[42px] flex items-start">
                <span className="slide-chrome inline-flex max-w-full rounded-full bg-plum px-4 py-2 font-bold uppercase tracking-[0.08em] text-primary-foreground leading-tight">
                  <EditableText id={`badge-card-badge-${index}-${cardIndex}`} value={card.badge} className="text-left" />
                </span>
              </div>
              <EditableText id={`badge-card-body-${index}-${cardIndex}`} as="p" value={card.body} className={`mt-4 block text-plum-deep ${useTwoByTwo ? "slide-body-lg" : "slide-body"}`} />
              {card.meta ? <EditableText id={`badge-card-meta-${index}-${cardIndex}`} as="p" value={card.meta} className="mt-auto pt-4 block slide-caption text-crimson" /> : null}
            </article>
          ))}
        </div>
        {note ? <EditableText id={`badge-note-${index}`} as="p" value={note} className="slide-caption mt-4 block text-plum-soft" /> : null}
      </div>
    </ContentFrame>
  );
}
