import { createFileRoute } from "@tanstack/react-router";
import { Deck } from "@/components/presentation/Deck";
import { DeckStoreProvider } from "@/components/presentation/store";

const TITLE = "Proposta de Atuação · Coordenador(a) de Marketing | iCEV";
const DESCRIPTION =
  "Apresentação em 16 slides com o plano de atuação dos primeiros 3 meses como Coordenador(a) de Marketing do iCEV: captação de alunos, canais, KPIs e clima organizacional.";

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
    </DeckStoreProvider>
  );
}
