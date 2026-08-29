import { EditableText } from "../EditableText";
import { CoverFrame } from "../SlideFrame";
import type { CoverContent } from "../content";

interface CoverSlideProps { index: number; scale: number; content: CoverContent; isPrimary?: boolean; }

export function CoverSlide({ index, scale, content, isPrimary = false }: CoverSlideProps) {
  const isOpening = index === 0;
  const isClosing = index === 16;
  const isSynthesis = index === 15;
  const lines = isOpening ? ["Instituto de Ensino Superior | iCEV", "Antonio Fontes", "comfontes@gmail.com", "(86) 99997 4164"] : isClosing ? ["Antonio Fontes", "comfontes@gmail.com", "(86) 99997 4164"] : content.lines;
  return <CoverFrame index={index} scale={scale}>
    {isClosing ? <>
      <EditableText id={`cover-title-${index}`} as="h1" value="OBRIGADO!" className="slide-title-lg block max-w-[1100px] text-primary-foreground" />
      <EditableText id={`cover-closing-title-${index}`} value="Proposta de atuação" className="slide-subtitle mt-8 block max-w-[1000px] text-primary-foreground" singleLine />
      <EditableText id={`cover-closing-subtitle-${index}`} value="Coordenador de Marketing iCEV" className="slide-body-lg mt-2 block max-w-[1000px] text-lilac-deep" singleLine />
      <div className="mt-8 space-y-2">{lines.map((line,i)=><EditableText key={i} id={`cover-line-${index}-${i}`} as="p" value={line} className="slide-body block max-w-[1020px] text-primary-foreground/90" singleLine />)}</div>
    </> : isSynthesis ? <>
      <div className="inline-flex rounded-full border-2 border-primary-foreground/45 px-6 py-2"><EditableText id={`cover-badge-${index}`} value={content.badge} className="slide-kicker text-primary-foreground" singleLine /></div>
      <EditableText id={`cover-title-${index}`} as="h2" value={content.title} className="slide-title-lg mt-5 block max-w-[900px] text-primary-foreground" />
      <EditableText id={`cover-subtitle-${index}`} value={content.subtitle} className="slide-subtitle mt-2 block max-w-[900px] text-lilac-deep" singleLine />
      <div className="mt-6 grid max-w-[1080px] grid-cols-2 gap-4">
        {lines.map((line,i)=><div key={i} className="flex min-h-[88px] items-center rounded-[18px] border border-primary-foreground/20 bg-black/10 px-5 py-4"><EditableText id={`cover-line-${index}-${i}`} as="p" value={line} className="block text-[19px] leading-[1.25] text-primary-foreground" /></div>)}
      </div>
    </> : <>
      <div className="inline-flex rounded-full border-2 border-primary-foreground/45 px-8 py-3"><EditableText id={`cover-badge-${index}`} value={content.badge} className="slide-kicker text-primary-foreground" singleLine /></div>
      <EditableText id={`cover-title-${index}`} as={isPrimary ? "h1" : "h2"} value={content.title} className="slide-title-lg mt-8 block max-w-[900px] text-primary-foreground" />
      <EditableText id={`cover-subtitle-${index}`} value={content.subtitle} className="slide-subtitle mt-6 block max-w-[1000px] text-lilac-deep" />
      <div className="mt-10 space-y-3">{lines.map((line,i)=><EditableText key={i} id={`cover-line-${index}-${i}`} as="p" value={line} className="slide-body block max-w-[1020px] text-primary-foreground/90" singleLine />)}</div>
    </>}
  </CoverFrame>;
}
