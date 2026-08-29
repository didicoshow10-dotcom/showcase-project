import { useState } from "react";
import { FileDown, Presentation, Loader2 } from "lucide-react";
import { exportDeckPdf, exportDeckPptx } from "./exporters";

async function openExportWindow(format: "pdf" | "pptx") {
  const url = new URL(window.location.href);
  url.searchParams.set("print", "1");
  url.searchParams.set("download", format);
  const popup = window.open(url.toString(), "icev-export", "width=1920,height=1080");
  if (!popup) throw new Error("O navegador bloqueou a janela de exportação. Permita pop-ups para este site.");

  await new Promise<void>((resolve, reject) => {
    const started = Date.now();
    const timer = window.setInterval(async () => {
      try {
        if (popup.closed) {
          window.clearInterval(timer);
          reject(new Error("A janela de exportação foi fechada."));
          return;
        }
        const ready = popup.document.querySelectorAll(".print-slide").length >= 16;
        if (!ready) {
          if (Date.now() - started > 30000) {
            window.clearInterval(timer);
            reject(new Error("A apresentação demorou demais para preparar a exportação."));
          }
          return;
        }
        window.clearInterval(timer);
        if (format === "pdf") await exportDeckPdf(popup.document);
        else await exportDeckPptx(popup.document);
        window.setTimeout(() => popup.close(), 1200);
        resolve();
      } catch (error) {
        window.clearInterval(timer);
        reject(error);
      }
    }, 250);
  });
}

export function ExportBar() {
  const [loading, setLoading] = useState<"pdf" | "pptx" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [printMode, setPrintMode] = useState(true);

  useEffect(() => {
    setPrintMode(new URLSearchParams(window.location.search).has("print"));
  }, []);


  const run = async (format: "pdf" | "pptx") => {
    setError(null);
    setLoading(format);
    try { await openExportWindow(format); }
    catch (e) { setError(e instanceof Error ? e.message : "Não foi possível exportar."); }
    finally { setLoading(null); }
  };

  return (
    <div className="fixed right-5 top-[78px] z-40 flex items-center gap-2 rounded-2xl border border-white/10 bg-ink/90 p-2 shadow-2xl backdrop-blur">
      <button type="button" onClick={() => void run("pdf")} disabled={loading !== null} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/20 disabled:opacity-50" title="Baixar PDF">
        {loading === "pdf" ? <Loader2 className="size-4 animate-spin" /> : <FileDown className="size-4" />}
        PDF
      </button>
      <button type="button" onClick={() => void run("pptx")} disabled={loading !== null} className="flex items-center gap-2 rounded-xl bg-crimson px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-50" title="Baixar PowerPoint">
        {loading === "pptx" ? <Loader2 className="size-4 animate-spin" /> : <Presentation className="size-4" />}
        PPTX
      </button>
      {error ? <span className="max-w-[260px] text-[11px] text-white/70">{error}</span> : null}
    </div>
  );
}
