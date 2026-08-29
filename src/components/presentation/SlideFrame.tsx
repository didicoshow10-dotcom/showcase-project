import type { ReactNode } from "react";
import { EditableImage } from "./EditableImage";
import { EditableText } from "./EditableText";
import { DECK_META, TOTAL_SLIDES } from "./content";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "./ScaledSlide";
import logoAsset from "@/assets/icev-logo.jpg.asset.json";
import campusAsset from "@/assets/icev-campus.png.asset.json";

export const LOGO_SRC = logoAsset.url;
export const CAMPUS_SRC = campusAsset.url;
export const GUTTER = 170;

function pageLabel(index: number) {
  return `${String(index + 1).padStart(2, "0")} / ${TOTAL_SLIDES}`;
}

interface FrameProps { index: number; scale: number; children: ReactNode; }

export function CoverFrame({ index, scale, children }: FrameProps) {
  const isFinalCover = index === 0 || index === 15;
  const footerText = isFinalCover ? "Teresina • Agosto 2026" : DECK_META.institutionFooter;
  return (
    <div className="slide-content bg-ink">
      <img src={CAMPUS_SRC} alt="Fachada do campus do iCEV em Teresina" draggable={false} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full select-none" style={{ objectFit: "cover", zIndex: 0 }} />
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 1, background: "var(--gradient-cover-veil)" }} />
      <div className="pointer-events-none absolute rounded-full" style={{ zIndex: 1, right: -150, top: -230, width: 720, height: 720, background: "radial-gradient(circle, oklch(0.52 0.196 6 / 0.5) 0%, oklch(0.52 0.196 6 / 0) 70%)" }} />

      <div className="absolute" style={{ left: 190, top: 96, width: 1180, zIndex: 2 }}>
        <EditableImage id={`cover-logo-${index}`} src={LOGO_SRC} alt="Logotipo do iCEV" x={0} y={0} width={118} height={118} scale={scale} className="rounded-[26px]" />
        <div className="absolute" style={{ left: 0, top: 172, width: 1180 }}>{children}</div>
      </div>

      <div className="slide-footer absolute z-[2] flex items-center justify-between gap-8 text-primary-foreground/70" style={{ left: GUTTER + 20, right: GUTTER + 20, bottom: 42 }}>
        <EditableText id={`footer-${index}`} value={footerText} singleLine className="max-w-[1450px] truncate" />
        <span className="slide-page shrink-0">{pageLabel(index)}</span>
      </div>
    </div>
  );
}

interface ContentFrameProps extends FrameProps { kicker: string; title: string; }

export function ContentFrame({ index, scale, kicker, title, children }: ContentFrameProps) {
  return (
    <div className="slide-content bg-paper">
      <div className="absolute left-0 top-0 h-full" style={{ width: 12, background: "var(--gradient-rail)" }} />
      <div className="pointer-events-none absolute rounded-full bg-lilac" style={{ right: -320, top: -400, width: 1180, height: 1180, opacity: 0.55 }} />
      <div className="pointer-events-none absolute rounded-full" style={{ left: -240, bottom: -420, width: 780, height: 780, background: "oklch(0.62 0.175 8 / 0.09)" }} />
      <EditableImage id={`content-logo-${index}`} src={LOGO_SRC} alt="Logotipo do iCEV" x={1660} y={92} width={96} height={96} scale={scale} className="rounded-[20px]" />
      <header className="absolute" style={{ left: GUTTER, top: 100, width: 1420 }}>
        <EditableText id={`kicker-${index}`} value={kicker} className="slide-kicker block text-crimson" singleLine />
        <EditableText id={`title-${index}`} as="h2" value={title} className="slide-title mt-4 block text-plum-deep" />
      </header>
      <div className="absolute" style={{ left: GUTTER, top: 344, width: SLIDE_WIDTH - GUTTER * 2 }}>{children}</div>
      <div className="slide-footer absolute flex items-center justify-between gap-8 text-plum-soft/80" style={{ left: GUTTER, right: GUTTER, bottom: 42 }}>
        <EditableText id={`footer-${index}`} value="iCEV • Proposta de Atuação" singleLine className="max-w-[1450px] truncate" />
        <span className="slide-page shrink-0">{pageLabel(index)}</span>
      </div>
    </div>
  );
}
