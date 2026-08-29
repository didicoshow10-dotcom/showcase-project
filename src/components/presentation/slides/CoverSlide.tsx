import { EditableText } from "../EditableText";
import { CoverFrame } from "../SlideFrame";
import type { CoverContent } from "../content";

interface CoverSlideProps { index: number; scale: number; content: CoverContent; isPrimary?: boolean; }

export function CoverSlide({ index, scale, content, isPrimary = false }: CoverSlideProps) {
  const isOpening = index === 0;
  const isClosing = index === 15;
  const lines = isOpening
    ? ["Instituto de Ensino Superior | iCEV", "Antonio Fontes", "comfontes@gmail.com", "(86) 99997-4164"]
    : isClosing
      ? ["comfontes@gmail.com", "(86) 99997-4164"]
      : content.lines;

  return (
    <CoverFrame index={index} scale={scale}>
      <div className="inline-flex rounded-full border-2 border-primary-foreground/45 px-8 py-3">
        <EditableText id={`cover-badge-${index}`} value={content.badge} className="slide-kicker text-primary-foreground" singleLine />
      </div>
      <EditableText id={`cover-title-${index}`} as={isPrimary ? "h1" : "h2"} value={isClosing ? "OBRIGADO!" : content.title} className="slide-title-lg mt-8 block max-w-[900px] text-primary-foreground" />
      <EditableText id={`cover-subtitle-${index}`} value={content.subtitle} className="slide-subtitle mt-6 block max-w-[1000px] text-lilac-deep" />
      <div className="mt-10 space-y-3">
        {lines.map((line, lineIndex) => (
          <EditableText key={lineIndex} id={`cover-line-${index}-${lineIndex}`} as="p" value={line} className="slide-body block max-w-[1020px] text-primary-foreground/90" singleLine />
        ))}
      </div>
    </CoverFrame>
  );
}
