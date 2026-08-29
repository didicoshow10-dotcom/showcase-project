import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import pptxgen from "pptxgenjs";

const W = 1920;
const H = 1080;

export async function exportDeckPdf() {
  const deck = document.querySelector<HTMLElement>(".print-deck");
  if (!deck) return;
  const slides = Array.from(deck.querySelectorAll<HTMLElement>(".print-slide"));
  if (!slides.length) return;

  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [W, H], compress: true });
  for (let i = 0; i < slides.length; i += 1) {
    const canvas = await html2canvas(slides[i], { scale: 1, backgroundColor: "#ffffff", useCORS: true, logging: false });
    const image = canvas.toDataURL("image/jpeg", 0.94);
    if (i > 0) pdf.addPage([W, H], "landscape");
    pdf.addImage(image, "JPEG", 0, 0, W, H, undefined, "FAST");
  }
  pdf.save("proposta-icev-antonio-fontes-agosto-2026.pdf");
}

export async function exportDeckPptx() {
  const deck = document.querySelector<HTMLElement>(".print-deck");
  if (!deck) return;
  const slides = Array.from(deck.querySelectorAll<HTMLElement>(".print-slide"));
  if (!slides.length) return;

  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Antonio Fontes";
  pptx.subject = "Proposta de Atuação — Coordenador(a) de Marketing";
  pptx.title = "Proposta de Atuação — iCEV";
  pptx.company = "Antonio Fontes";

  for (const element of slides) {
    const canvas = await html2canvas(element, { scale: 1, backgroundColor: "#ffffff", useCORS: true, logging: false });
    const image = canvas.toDataURL("image/png");
    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    slide.addImage({ data: image, x: 0, y: 0, w: 13.333, h: 7.5 });
  }

  await pptx.writeFile({ fileName: "proposta-icev-antonio-fontes-agosto-2026.pptx" });
}
