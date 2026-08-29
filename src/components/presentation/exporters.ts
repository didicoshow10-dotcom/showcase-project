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

function makeCanvasSafeClone(source: HTMLElement): HTMLElement {
  const clone = source.cloneNode(true) as HTMLElement;
  const replaceOklch = (value: string) => value.replace(/oklch\([^)]*\)/gi, "rgb(0, 0, 0)");
  clone.querySelectorAll<HTMLElement>("*").forEach((el) => {
    const computed = source.ownerDocument.defaultView?.getComputedStyle(el);
    if (!computed) return;
    for (const property of ["color", "backgroundColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor", "textDecorationColor", "fill", "stroke", "boxShadow"]) {
      const value = computed.getPropertyValue(property);
      if (value && /oklch\(/i.test(value)) el.style.setProperty(property, replaceOklch(value));
    }
  });
  return clone;
}

async function capture(slide: HTMLElement) {
  const safe = makeCanvasSafeClone(slide);
  safe.style.position = "fixed";
  safe.style.left = "0";
  safe.style.top = "0";
  safe.style.width = `${W}px`;
  safe.style.height = `${H}px`;
  safe.style.zIndex = "-1";
  safe.style.pointerEvents = "none";
  document.body.appendChild(safe);
  try {
    return await html2canvas(safe, { scale: 1, backgroundColor: "#ffffff", useCORS: true, logging: false, windowWidth: W, windowHeight: H });
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
