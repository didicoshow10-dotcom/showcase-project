import { useEffect, useState } from "react";
import { FileDown, Presentation, Loader2 } from "lucide-react";
import { exportDeckPdf, exportDeckPptx } from "./exporters";

async function createExportFrame(): Promise<{ iframe: HTMLIFrameElement; doc: Document }> {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.position = "fixed";
  iframe.style.width = "1920px";
  iframe.style.height = "1080px";
  iframe.style.left = "-10000px";
  iframe.style.top = "0";
  iframe.style.border = "0";
  iframe.style.visibility = "hidden";
  const url = new URL(window.location.href);
  url.searchParams.set("print", "1");
  document.body.appendChild(iframe);

  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("A apresentação demorou demais para preparar o arquivo.")), 30000);
    iframe.onload = () => { window.clearTimeout(timeout); resolve(); };
    iframe.onerror = () => { window.clearTimeout(timeout); reject(new Error("Não foi possível preparar a apresentação para exportação.")); };
    iframe.src = url.toString();
  });

  const doc = iframe.contentDocument;
  if (!doc) throw new Error("Não foi possível acessar a apresentação para exportação.");
  await new Promise((resolve) => window.setTimeout(resolve, 1200));
  if (doc.querySelectorAll(".print-slide").length < 16) throw new Error("A apresentação não carregou todos os slides para exportação.");
  if (doc.fonts?.ready) await doc.fonts.ready;
  const images = Array.from(doc.images);
  await Promise.all(images.map((image) => image.complete ? Promise.resolve() : new Promise<void>((resolve) => { image.onload = () => resolve(); image.onerror = () => resolve(); })));
  return { iframe, doc };
}

export function ExportBar() {
  const [loading, setLoading] = useState<"pdf" | "pptx" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [printMode, setPrintMode] = useState(true);

  useEffect(() => { setPrintMode(new URLSearchParams(window.location.search).has("print")); }, []);

  const run = async (format: "pdf" | "pptx") => {
    setError(null);
    setLoading(format);
    let iframe: HTMLIFrameElement | null = null;
    try {
      const exportFrame = await createExportFrame();
      iframe = exportFrame.iframe;
      if (format === "pdf") await exportDeckPdf(exportFrame.doc);
      else await exportDeckPptx(exportFrame.doc);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível exportar.");
    } finally {
      if (iframe) window.setTimeout(() => iframe?.remove(), 500);
      setLoading(null);
    }
  };

  if (printMode) return null;

  return <div className="fixed right-5 top-[78px] z-40 flex items-center gap-2 rounded-2xl border border-white/10 bg-ink/90 p-2 shadow-2xl backdrop-blur">
    <button type="button" onClick={() => void run("pdf")} disabled={loading !== null} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/20 disabled:opacity-50" title="Baixar PDF">{loading === "pdf" ? <Loader2 className="size-4 animate-spin" /> : <FileDown className="size-4" />}PDF</button>
    <button type="button" onClick={() => void run("pptx")} disabled={loading !== null} className="flex items-center gap-2 rounded-xl bg-crimson px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-50" title="Baixar PowerPoint">{loading === "pptx" ? <Loader2 className="size-4 animate-spin" /> : <Presentation className="size-4" />}PPTX</button>
    {error ? <span className="max-w-[260px] text-[11px] text-white/70">{error}</span> : null}
  </div>;
}
