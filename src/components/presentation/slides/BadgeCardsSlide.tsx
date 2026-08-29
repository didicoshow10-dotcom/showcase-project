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
  /** Fixed card height keeps rows aligned when copy lengths differ. */
  cardMinHeight?: number;
}

/** 08, 09 and 11 — grid of cards led by a pill badge. */
export function BadgeCardsSlide({
  index,
  scale,
  kicker,
  title,
  cards,
  columns,
  note,
  cardMinHeight = 300,
}: BadgeCardsSlideProps) {
  return (
    <ContentFrame index={index} scale={scale} kicker={kicker} title={title}>
      <div
        className="grid gap-10"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {cards.map((card, cardIndex) => (
          <article
            key={cardIndex}
            className="flex flex-col rounded-[26px] border border-lilac-deep/60 bg-card px-11 py-10"
            style={{ boxShadow: "var(--shadow-card)", minHeight: cardMinHeight }}
          >
            <span className="slide-chrome inline-flex self-start rounded-full bg-plum px-7 py-3 font-bold uppercase tracking-[0.14em] text-primary-foreground">
              <EditableText
                id={`badge-card-badge-${index}-${cardIndex}`}
                value={card.badge}
              />
            </span>

            <EditableText
              id={`badge-card-body-${index}-${cardIndex}`}
              as="p"
              value={card.body}
              className="slide-body-lg mt-8 block text-plum-deep"
            />

            {card.meta ? (
              <EditableText
                id={`badge-card-meta-${index}-${cardIndex}`}
                as="p"
                value={card.meta}
                className="slide-body mt-6 block text-crimson"
              />
            ) : null}
          </article>
        ))}
      </div>

      {note ? (
        <EditableText
          id={`badge-note-${index}`}
          as="p"
          value={note}
          className="slide-subtitle mt-12 block text-plum-soft"
          singleLine
        />
      ) : null}
    </ContentFrame>
  );
}
