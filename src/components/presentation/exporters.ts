import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import pptxgen from "pptxgenjs";

const W = 1920;
const H = 1080;
type ExportDocument = Document;

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 3000);
}

/* html2canvas can fail while parsing CSS that contains oklch(), even when the
 * browser itself renders it correctly. Convert the CSS in the clone before
 * html2canvas reads its stylesheets. The live presentation is never changed. */
function normalizeCssColors(css: string): string {
  const fallbacks: Record<string, string> = {
    "oklch(0.19 0.085 308)": "#21102f",
    "oklch(0.24 0.105 306)": "#351746",
    "oklch(0.33 0.125 305)": "#54256b",
    "oklch(0.42 0.155 304)": "#71378c",
    "oklch(0.55 0.145 303)": "#9b62a9",
    "oklch(0.52 0.196 6)": "#c52b3d",
    "oklch(0.62 0.175 8)": "#dc5260",
    "oklch(0.985 0.005 310)": "#fbf9fc",
    "oklch(0.93 0.022 312)": "#eee7f1",
    "oklch(0.87 0.035 312)": "#dfd2e3",
    "oklch(0.34 0.045 300)": "#51475a",
    "oklch(0.99 0.003 310)": "#fdfcfd",
    "oklch(1 0 0)": "#ffffff",
    "oklch(0.9 0.018 310)": "#e4dfe7",
    "oklch(0.577 0.245 27.325)": "#d92d20",
    "oklch(0.98 0.004 310)": "#f8f6f9",
    "oklch(0.8 0.03 310)": "#c8bdcc",
  };
  let result = css;
  for (const [source, fallback] of Object.entries(fallbacks)) result = result.split(source).join(fallback);
  result = result.replace(/oklch\([^)]*\s\/\s*([\d.]+)\)/gi, "rgba(0,0,0,$1)");
  result = result.replace(/oklch\([^)]*\)/gi, "#000000");
  return result;
}

function prepareClone(clonedDoc: Document) {
  clonedDoc.querySelectorAll("style").forEach((style) => {
    style.textContent = normalizeCssColors(style.textContent ?? "");
  });
  const safeStyle = clonedDoc.createElement("style");
  safeStyle.textContent = `
    *, *::before, *::after { animation: none !important; transition: none !important; }
  `;
  clonedDoc.head.appendChild(safeStyle);
}

async function capture(slide: HTMLElement) {
  const safe = slide.cloneNode(true) as HTMLElement;
  safe.style.position = "fixed";
  safe.style.left = "0";
  safe.style.top = "0";
  safe.style.width = `${W}px`;
  safe.style.height = `${H}px`;
  safe.style.zIndex = "-1";
  safe.style.pointerEvents = "none";
  document.body.appendChild(safe);
  try {
    return await html2canvas(safe, {
      scale: 1,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
      windowWidth: W,
      windowHeight: H,
      onclone: prepareClone,
    });
  } finally {
    safe.remove();
  }
}

export async function exportDeckPdf(doc: ExportDocument = document) {
  const deck = doc.querySelector<HTMLElement>(".print-deck");
  if (!deck) throw new Error("A apresentação para exportação ainda não foi renderizada.");
  const slides = Array.from(deck.querySelectorAll<HTMLElement>(".print-slide"));
  if (!slides.length) throw new Error("Nenhum slide encontrado para exportação.");
  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [W, H], compress: true });
  for (let i = 0; i < slides.length; i += 1) {
    const canvas = await capture(slides[i]);
    if (i > 0) pdf.addPage([W, H], "landscape");
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.94), "JPEG", 0, 0, W, H, undefined, "FAST");
  }
  triggerDownload(pdf.output("blob"), "proposta-icev-antonio-fontes-agosto-2026.pdf");
}

export async function exportDeckPptx(doc: ExportDocument = document) {
  const deck = doc.querySelector<HTMLElement>(".print-deck");
  if (!deck) throw new Error("A apresentação para exportação ainda não foi renderizada.");
  const slides = Array.from(deck.querySelectorAll<HTMLElement>(".print-slide"));
  if (!slides.length) throw new Error("Nenhum slide encontrado para exportação.");
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Antonio Fontes";
  pptx.subject = "Proposta de Atuação — Coordenador de Marketing";
  pptx.title = "Proposta de Atuação — iCEV";
  pptx.company = "Antonio Fontes";
  for (const element of slides) {
    const canvas = await capture(element);
    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    slide.addImage({ data: canvas.toDataURL("image/png"), x: 0, y: 0, w: 13.333, h: 7.5 });
  }
  const output = await pptx.write({ outputType: "blob" }) as Blob;
  triggerDownload(output, "proposta-icev-antonio-fontes-agosto-2026.pptx");
}
