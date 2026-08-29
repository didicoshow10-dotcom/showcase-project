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
  const cardHeight = twoRows ? (columns === 2 ? 235 : 205) : 300;
  const safeBottom = 180;
  return (
    <ContentFrame index={index} scale={scale} kicker={kicker} title={title}>
      <div className="flex flex-col" style={{ maxHeight: `calc(100% - ${safeBottom}px)`, overflow: "hidden" }}>
        <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {cards.map((card, cardIndex) => (
            <article key={cardIndex} className={`flex flex-col overflow-hidden rounded-[22px] border border-lilac-deep/60 bg-card ${compact ? "px-6 py-5" : "px-7 py-6"}`} style={{ boxShadow: "var(--shadow-card)", minHeight: cardHeight, height: cardHeight }}>
              <span className="slide-chrome inline-flex max-w-full self-start rounded-full bg-plum px-3 py-2 font-bold uppercase tracking-[0.08em] text-primary-foreground">
                <EditableText id={`badge-card-badge-${index}-${cardIndex}`} value={card.badge} singleLine className="whitespace-normal" />
              </span>
              <EditableText id={`badge-card-body-${index}-${cardIndex}`} as="p" value={card.body} className={`mt-3 block text-plum-deep ${twoRows ? "slide-body" : "slide-body-lg"}`} />
              {card.meta ? <EditableText id={`badge-card-meta-${index}-${cardIndex}`} as="p" value={card.meta} className="mt-2 block slide-caption text-crimson" /> : null}
            </article>
          ))}
        </div>
        {note ? <EditableText id={`badge-note-${index}`} as="p" value={note} className="slide-caption mt-3 block text-plum-soft" /> : null}
      </div>
    </ContentFrame>
  );
}
