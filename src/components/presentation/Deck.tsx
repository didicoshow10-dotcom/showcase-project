import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Grid3x3, Pencil, RotateCcw, X, Minus, Plus } from "lucide-react";
import { ScaledSlide, SLIDE_HEIGHT, SLIDE_WIDTH } from "./ScaledSlide";
import { renderSlide } from "./slides";
import { useDeckStore } from "./store";
import { DECK_META, SLIDE_TITLES, TOTAL_SLIDES } from "./content";

function readSlideFromUrl() {
  if (typeof window === "undefined") return 0;
  const raw = new URLSearchParams(window.location.search).get("slide");
  const parsed = Number.parseInt(raw ?? "", 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(Math.max(parsed - 1, 0), TOTAL_SLIDES - 1);
}

function PrintDeck() {
  return (
    <div className="print-deck bg-ink">
      {SLIDE_TITLES.map((title, index) => (
        <div key={title} className="print-slide" style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT }}>
          {renderSlide(index, 1)}
        </div>
      ))}
    </div>
  );
}

function FontSizeControl() {
  const { editMode, selectedTextId, getFontSize, setFontSize } = useDeckStore();
  const [value, setValue] = useState(20);

  useEffect(() => {
    if (!selectedTextId || !editMode) return;
    const stored = getFontSize(selectedTextId);
    if (stored) { setValue(stored); return; }
    const node = document.querySelector(`[data-text-id="${CSS.escape(selectedTextId)}"]`) as HTMLElement | null;
    const computed = node ? Number.parseFloat(window.getComputedStyle(node).fontSize) : 20;
    if (Number.isFinite(computed)) setValue(Math.round(computed));
  }, [selectedTextId, editMode, getFontSize]);

  if (!editMode) return null;

  const apply = (next: number) => {
    if (!selectedTextId) return;
    const safe = Math.max(10, Math.min(72, Math.round(next)));
    setValue(safe);
    setFontSize(selectedTextId, safe);
  };

  return (
    <div className="fixed right-4 top-[76px] z-40 flex items-center gap-2 rounded-xl border border-white/15 bg-ink/95 px-3 py-2 shadow-xl backdrop-blur sm:right-7">
      <span className="text-xs font-semibold text-white/65">Fonte</span>
      <button type="button" onClick={() => apply(value - 1)} disabled={!selectedTextId || value <= 10} className="rounded-lg bg-white/10 p-1.5 text-white transition hover:bg-white/20 disabled:opacity-30" aria-label="Diminuir fonte"><Minus className="size-4" /></button>
      <input aria-label="Tamanho da fonte em pixels" type="number" min={10} max={72} value={value} disabled={!selectedTextId} onChange={(event) => setValue(Number(event.target.value))} onBlur={() => apply(value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); apply(value); } }} className="w-16 rounded-lg border border-white/15 bg-white/10 px-2 py-1.5 text-center text-sm font-semibold text-white outline-none focus:border-crimson" />
      <span className="text-xs text-white/45">px</span>
      <button type="button" onClick={() => apply(value + 1)} disabled={!selectedTextId || value >= 72} className="rounded-lg bg-white/10 p-1.5 text-white transition hover:bg-white/20 disabled:opacity-30" aria-label="Aumentar fonte"><Plus className="size-4" /></button>
      {!selectedTextId ? <span className="ml-1 hidden text-[11px] text-white/45 sm:inline">Selecione um texto</span> : null}
    </div>
  );
}

export function Deck() {
  const { editMode, toggleEditMode, restore, hydrated } = useDeckStore();
  const [index, setIndex] = useState(readSlideFromUrl);
  const [gridOpen, setGridOpen] = useState(false);
  const [printMode, setPrintMode] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setPrintMode(new URLSearchParams(window.location.search).has("print"));
  }, []);

  const goTo = useCallback((next: number) => setIndex(Math.min(Math.max(next, 0), TOTAL_SLIDES - 1)), []);
  const goNext = useCallback(() => setIndex((i) => Math.min(i + 1, TOTAL_SLIDES - 1)), []);
  const goPrev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(index + 1));
    window.history.replaceState(null, "", url.toString());
    document.title = `${index + 1}/${TOTAL_SLIDES} — ${SLIDE_TITLES[index]} | ${DECK_META.shortTitle}`;
  }, [index]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable) return;
      switch (event.key) {
        case "ArrowRight": case "PageDown": case " ": event.preventDefault(); goNext(); break;
        case "ArrowLeft": case "PageUp": event.preventDefault(); goPrev(); break;
        case "g": case "G": setGridOpen((open) => !open); break;
        case "Escape": setGridOpen(false); break;
        case "Home": goTo(0); break;
        case "End": goTo(TOTAL_SLIDES - 1); break;
        default: break;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, goTo]);

  const enterFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.();
  }, []);

  if (printMode) return <PrintDeck />;
  const progress = ((index + 1) / TOTAL_SLIDES) * 100;

  return (
    <div className="flex h-[100dvh] flex-col bg-ink text-primary-foreground">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-7">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold sm:text-base">{DECK_META.shortTitle}</p>
          <p className="truncate text-xs text-white/55">{SLIDE_TITLES[index]}</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleEditMode} aria-pressed={editMode} className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${editMode ? "bg-crimson text-primary-foreground" : "bg-white/10 text-white/85 hover:bg-white/20"}`}>
            <Pencil className="size-4" aria-hidden="true" /><span className="hidden sm:inline">{editMode ? "Editando" : "Editar"}</span>
          </button>
          {editMode ? <button type="button" onClick={restore} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 transition hover:bg-white/20"><RotateCcw className="size-4" aria-hidden="true" /><span className="hidden sm:inline">Restaurar</span></button> : null}
          <button type="button" onClick={() => setGridOpen(true)} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 transition hover:bg-white/20" aria-label="Ver todos os slides"><Grid3x3 className="size-4" aria-hidden="true" /><span className="hidden sm:inline">Slides</span></button>
          <button type="button" onClick={enterFullscreen} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 transition hover:bg-white/20" aria-label="Apresentar em tela cheia"><Expand className="size-4" aria-hidden="true" /><span className="hidden sm:inline">Apresentar</span></button>
        </div>
      </header>
      <FontSizeControl />
      <main className="relative min-h-0 flex-1" onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { const start = touchStartX.current; const end = event.changedTouches[0]?.clientX ?? null; touchStartX.current = null; if (start === null || end === null) return; const delta = end - start; if (Math.abs(delta) < 60) return; if (delta < 0) goNext(); else goPrev(); }}>
        <ScaledSlide className="size-full">{(scale) => <div key={hydrated ? "ready" : "ssr"} className="size-full">{renderSlide(index, scale)}</div>}</ScaledSlide>
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center"><div className="pointer-events-auto flex items-center gap-3 rounded-full bg-black/55 px-3 py-2 backdrop-blur"><button type="button" onClick={goPrev} disabled={index === 0} className="rounded-full p-2 text-white/85 transition hover:bg-white/15 disabled:opacity-30" aria-label="Slide anterior"><ChevronLeft className="size-5" aria-hidden="true" /></button><span className="min-w-[62px] text-center text-xs font-semibold tabular-nums text-white/85">{index + 1} / {TOTAL_SLIDES}</span><button type="button" onClick={goNext} disabled={index === TOTAL_SLIDES - 1} className="rounded-full p-2 text-white/85 transition hover:bg-white/15 disabled:opacity-30" aria-label="Próximo slide"><ChevronRight className="size-5" aria-hidden="true" /></button></div></div>
      </main>
      <div className="h-1.5 w-full shrink-0 bg-white/10" role="presentation"><div className="h-full bg-crimson transition-[width] duration-300" style={{ width: `${progress}%` }} /></div>
      {gridOpen ? <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/97 p-5 sm:p-9"><div className="mb-6 flex items-center justify-between"><h2 className="text-base font-semibold">Todos os slides</h2><button type="button" onClick={() => setGridOpen(false)} className="rounded-full bg-white/10 p-2 transition hover:bg-white/20" aria-label="Fechar visão geral"><X className="size-5" aria-hidden="true" /></button></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{SLIDE_TITLES.map((title, slideIndex) => <button key={title} type="button" onClick={() => { goTo(slideIndex); setGridOpen(false); }} className={`overflow-hidden rounded-xl border text-left transition ${slideIndex === index ? "border-crimson" : "border-white/12 hover:border-white/35"}`}><ScaledSlide className="aspect-video w-full">{(scale) => renderSlide(slideIndex, scale)}</ScaledSlide><p className="truncate px-3 py-2 text-xs text-white/70">{String(slideIndex + 1).padStart(2, "0")} · {title}</p></button>)}</div></div> : null}
    </div>
  );
}
