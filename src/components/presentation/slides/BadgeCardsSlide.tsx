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
  const cardHeight = twoRows ? (columns === 2 ? 205 : 185) : 290;
  const safeBottom = 155;
  return (
    <ContentFrame index={index} scale={scale} kicker={kicker} title={title}>
      <div className="flex flex-col" style={{ maxHeight: 1080 - 344 - safeBottom }}>
        <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {cards.map((card, cardIndex) => (
            <article key={cardIndex} className={`flex flex-col overflow-hidden rounded-[22px] border border-lilac-deep/60 bg-card ${compact ? "px-7 py-6" : "px-8 py-7"}`} style={{ boxShadow: "var(--shadow-card)", minHeight: cardHeight, maxHeight: cardHeight }}>
              <span className="slide-chrome inline-flex max-w-full self-start overflow-hidden rounded-full bg-plum px-4 py-2 font-bold uppercase tracking-[0.10em] text-primary-foreground">
                <EditableText id={`badge-card-badge-${index}-${cardIndex}`} value={card.badge} singleLine className="truncate" />
              </span>
              <EditableText id={`badge-card-body-${index}-${cardIndex}`} as="p" value={card.body} className={`mt-3 block text-plum-deep ${twoRows ? "slide-body" : "slide-body-lg"}`} />
              {card.meta ? <EditableText id={`badge-card-meta-${index}-${cardIndex}`} as="p" value={card.meta} className="mt-2 block slide-caption text-crimson" /> : null}
            </article>
          ))}
        </div>
        {note ? <EditableText id={`badge-note-${index}`} as="p" value={note} className="slide-caption mt-4 block text-plum-soft" /> : null}
      </div>
    </ContentFrame>
  );
}
