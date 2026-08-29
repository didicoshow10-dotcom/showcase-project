import { createFileRoute } from "@tanstack/react-router";
import { Deck } from "@/components/presentation/Deck";
import { DeckStoreProvider } from "@/components/presentation/store";
import { ExportBar } from "@/components/presentation/ExportBar";

const TITLE = "Proposta de Atuação · Coordenador de Marketing | iCEV";
const DESCRIPTION = "Apresentação com o plano de atuação dos primeiros 3 meses como Coordenador de Marketing do iCEV: captação de alunos, jornada do candidato, gestão por dados e clima organizacional.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PresentationPage,
});

function PresentationPage() {
  return (
    <DeckStoreProvider>
      <Deck />
      <ExportBar />
    </DeckStoreProvider>
  );
}
