import { EditableText } from "../EditableText";
import { CoverFrame } from "../SlideFrame";
import type { CoverContent } from "../content";

interface CoverSlideProps {
  index: number;
  scale: number;
  content: CoverContent;
  /** The deck's single H1 lives on the opening slide. */
  isPrimary?: boolean;
}

/**
 * Shared composition for slides 01, 15 and 16: campus photo, purple veil,
 * logo, pill badge, oversized title, subtitle and supporting lines.
 */
export function CoverSlide({ index, scale, content, isPrimary = false }: CoverSlideProps) {
  return (
    <CoverFrame index={index} scale={scale}>
      <div className="inline-flex rounded-full border-2 border-primary-foreground/45 px-8 py-3">
        <EditableText
          id={`cover-badge-${index}`}
          value={content.badge}
          className="slide-kicker text-primary-foreground"
          singleLine
        />
      </div>

      <EditableText
        id={`cover-title-${index}`}
        as={isPrimary ? "h1" : "h2"}
        value={content.title}
        className="slide-title-lg mt-10 block max-w-[900px] text-primary-foreground"
      />

      <EditableText
        id={`cover-subtitle-${index}`}
        value={content.subtitle}
        className="slide-subtitle mt-8 block max-w-[1000px] text-lilac-deep"
      />

      <div className="mt-14 space-y-5">
        {content.lines.map((line, lineIndex) => (
          <EditableText
            key={lineIndex}
            id={`cover-line-${index}-${lineIndex}`}
            as="p"
            value={line}
            className="slide-body block max-w-[1020px] text-primary-foreground/90"
          />
        ))}
      </div>
    </CoverFrame>
  );
}
