import html2canvas from "html2canvas-pro";
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
