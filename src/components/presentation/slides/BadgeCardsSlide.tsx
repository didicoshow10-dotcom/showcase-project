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
  const fourCards = cards.length === 4;
  const effectiveColumns = fourCards ? 2 : columns;
  return (
    <ContentFrame index={index} scale={scale} kicker={kicker} title={title}>
      <div className="flex flex-col">
        <div className="grid items-stretch gap-6" style={{ gridTemplateColumns: `repeat(${effectiveColumns}, minmax(0, 1fr))` }}>
          {cards.map((card, cardIndex) => (
            <article key={cardIndex} className={`flex flex-col rounded-[22px] border border-lilac-deep/60 bg-card ${compact ? "px-6 py-5" : "px-7 py-6"}`} style={{ boxShadow: "var(--shadow-card)", minHeight: fourCards ? 230 : 250 }}>
              <div className="flex min-h-[36px] items-start">
                <span className="slide-chrome inline-flex max-w-full rounded-full bg-plum px-3 py-1.5 font-bold uppercase tracking-[0.06em] leading-tight text-primary-foreground">
                  <EditableText id={`badge-card-badge-${index}-${cardIndex}`} value={card.badge} className="text-left text-[15px] leading-[1.15]" />
                </span>
              </div>
              <EditableText id={`badge-card-body-${index}-${cardIndex}`} as="p" value={card.body} className={`mt-3 block text-plum-deep ${fourCards ? "text-[20px] leading-[1.28]" : "slide-body"}`} />
              {card.meta ? <EditableText id={`badge-card-meta-${index}-${cardIndex}`} as="p" value={card.meta} className={`mt-auto block text-crimson ${fourCards ? "text-[15px] leading-[1.25] pt-3" : "slide-caption mt-2"}`} /> : null}
            </article>
          ))}
        </div>
        {note ? <EditableText id={`badge-note-${index}`} as="p" value={note} className="slide-caption mt-4 block text-plum-soft" /> : null}
      </div>
    </ContentFrame>
  );
}
