import type { ReactNode } from "react";
import { EditableImage } from "./EditableImage";
import { EditableText } from "./EditableText";
import { DECK_META, TOTAL_SLIDES } from "./content";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "./ScaledSlide";
import logoAsset from "@/assets/icev-logo.jpg.asset.json";
import campusAsset from "@/assets/icev-campus.png.asset.json";

export const LOGO_SRC = logoAsset.url;
export const CAMPUS_SRC = campusAsset.url;

/** Left/right content gutter shared by every slide. */
export const GUTTER = 170;

function pageLabel(index: number) {
  return `${String(index + 1).padStart(2, "0")} / ${TOTAL_SLIDES}`;
}

interface FrameProps {
  index: number;
  scale: number;
  children: ReactNode;
}

/* ------------------------------------------------------------------ *
 * Cover frame — used by slides 01, 15 and 16
 * ------------------------------------------------------------------ */

export function CoverFrame({ index, scale, children }: FrameProps) {
  return (
    <div className="slide-content bg-ink">
      <EditableImage
        id={`cover-bg-${index}`}
        src={CAMPUS_SRC}
        alt="Fachada do campus do iCEV em Teresina"
        x={0}
        y={0}
        width={SLIDE_WIDTH}
        height={SLIDE_HEIGHT}
        scale={scale}
        cover
      />

      {/* Purple veil so the copy stays legible over the photo. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-cover-veil)" }}
      />

      {/* Crimson glow echoing the reference deck. */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          right: -150,
          top: -230,
          width: 720,
          height: 720,
          background:
            "radial-gradient(circle, oklch(0.52 0.196 6 / 0.5) 0%, oklch(0.52 0.196 6 / 0) 70%)",
        }}
      />

      <EditableImage
        id={`cover-logo-${index}`}
        src={LOGO_SRC}
        alt="Logotipo do iCEV"
        x={190}
        y={96}
        width={118}
        height={118}
        scale={scale}
        className="rounded-[26px]"
      />

      <div
        className="absolute"
        style={{ left: 190, top: 268, width: 1180 }}
      >
        {children}
      </div>

      <div
        className="slide-footer absolute flex items-center justify-between text-primary-foreground/60"
        style={{ left: GUTTER + 20, right: GUTTER + 20, bottom: 54 }}
      >
        <EditableText
          id={`footer-${index}`}
          value={DECK_META.institutionFooter}
          singleLine
        />
        <span className="slide-page">{pageLabel(index)}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Content frame — used by slides 02 through 14
 * ------------------------------------------------------------------ */

interface ContentFrameProps extends FrameProps {
  kicker: string;
  title: string;
}

export function ContentFrame({
  index,
  scale,
  kicker,
  title,
  children,
}: ContentFrameProps) {
  return (
    <div className="slide-content bg-paper">
      {/* Vertical brand rail. */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{ width: 12, background: "var(--gradient-rail)" }}
      />

      {/* Soft decorative circles. */}
      <div
        className="pointer-events-none absolute rounded-full bg-lilac"
        style={{ right: -320, top: -400, width: 1180, height: 1180, opacity: 0.55 }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          left: -240,
          bottom: -420,
          width: 780,
          height: 780,
          background: "oklch(0.62 0.175 8 / 0.09)",
        }}
      />

      <EditableImage
        id={`content-logo-${index}`}
        src={LOGO_SRC}
        alt="Logotipo do iCEV"
        x={1660}
        y={92}
        width={96}
        height={96}
        scale={scale}
        className="rounded-[20px]"
      />

      <header className="absolute" style={{ left: GUTTER, top: 100, width: 1420 }}>
        <EditableText
          id={`kicker-${index}`}
          value={kicker}
          className="slide-kicker block text-crimson"
          singleLine
        />
        <EditableText
          id={`title-${index}`}
          as="h2"
          value={title}
          className="slide-title mt-4 block text-plum-deep"
        />
      </header>

      <div
        className="absolute"
        style={{ left: GUTTER, top: 344, width: SLIDE_WIDTH - GUTTER * 2 }}
      >
        {children}
      </div>

      <div
        className="slide-footer absolute flex items-center justify-between text-plum-soft/80"
        style={{ left: GUTTER, right: GUTTER, bottom: 48 }}
      >
        <EditableText id={`footer-${index}`} value={DECK_META.deckFooter} singleLine />
        <span className="slide-page">{pageLabel(index)}</span>
      </div>
    </div>
  );
}
