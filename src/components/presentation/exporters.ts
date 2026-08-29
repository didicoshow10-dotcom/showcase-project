import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import pptxgen from "pptxgenjs";

const W = 1920;
const H = 1080;
type ExportDocument = Document;

function triggerDownload(blob: Blob, filename: string) {
  if (!blob || blob.size === 0) throw new Error("O arquivo exportado ficou vazio.");
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  link.setAttribute("aria-hidden", "true");
  link.style.position = "fixed";
  link.style.left = "-10000px";
  link.style.top = "-10000px";
  document.body.appendChild(link);
  link.click();
  window.setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, 10000);
}

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
  safeStyle.textContent = "*, *::before, *::after { animation: none !important; transition: none !important; }";
  clonedDoc.head.appendChild(safeStyle);
}

async function waitForAssets() {
  if ("fonts" in document) await document.fonts.ready;
  await Promise.all(Array.from(document.images).map((image) => {
    if (image.complete) return Promise.resolve();
    return new Promise<void>((resolve) => {
      image.addEventListener("load", () => resolve(), { once: true });
      image.addEventListener("error", () => resolve(), { once: true });
    });
  }));
}

async function capture(slide: HTMLElement) {
  await waitForAssets();
  return html2canvas(slide, {
    width: W,
    height: H,
    scale: 1,
    backgroundColor: "#ffffff",
    useCORS: true,
    allowTaint: false,
    logging: false,
    scrollX: 0,
    scrollY: 0,
    windowWidth: W,
    windowHeight: H,
    onclone: prepareClone,
  });
}

async function getSlides(doc: ExportDocument) {
  const deck = doc.querySelector<HTMLElement>(".print-deck");
  if (!deck) throw new Error("A apresentação para exportação ainda não foi renderizada.");
  const slides = Array.from(deck.querySelectorAll<HTMLElement>(".print-slide"));
  if (!slides.length) throw new Error("Nenhum slide encontrado para exportação.");
  return slides;
}

export async function exportDeckPdf(doc: ExportDocument = document) {
  const slides = await getSlides(doc);
  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [W, H], compress: true });
  for (let i = 0; i < slides.length; i += 1) {
    const canvas = await capture(slides[i]);
    if (i > 0) pdf.addPage([W, H], "landscape");
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.94), "JPEG", 0, 0, W, H, undefined, "FAST");
  }
  triggerDownload(pdf.output("blob"), "proposta-icev-antonio-fontes-agosto-2026.pdf");
}

export async function exportDeckPptx(doc: ExportDocument = document) {
  const slides = await getSlides(doc);
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
