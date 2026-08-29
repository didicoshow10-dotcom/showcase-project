import { useState } from "react";
import { FileDown, Presentation, Loader2 } from "lucide-react";
import { exportDeckPdf, exportDeckPptx } from "./exporters";

export function ExportBar() {
  const [loading, setLoading] = useState<"pdf" | "pptx" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (format: "pdf" | "pptx") => {
    setError(null);
    setLoading(format);
    try {
      // Exporta usando a área .print-deck que o Deck mantém montada no DOM,
      // sem popup, nova aba ou iframe.
      if (format === "pdf") await exportDeckPdf(document);
      else await exportDeckPptx(document);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível exportar.");
    } finally {
      setLoading(null);
    }
  };

  return <div className="fixed right-5 top-[78px] z-40 flex items-center gap-2 rounded-2xl border border-white/10 bg-ink/90 p-2 shadow-2xl backdrop-blur">
    <button type="button" onClick={() => void run("pdf")} disabled={loading !== null} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/20 disabled:opacity-50" title="Baixar PDF">{loading === "pdf" ? <Loader2 className="size-4 animate-spin" /> : <FileDown className="size-4" />}PDF</button>
    <button type="button" onClick={() => void run("pptx")} disabled={loading !== null} className="flex items-center gap-2 rounded-xl bg-crimson px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-50" title="Baixar PowerPoint">{loading === "pptx" ? <Loader2 className="size-4 animate-spin" /> : <Presentation className="size-4" />}PPTX</button>
    {error ? <span className="max-w-[300px] text-[11px] text-white/70">{error}</span> : null}
  </div>;
}
