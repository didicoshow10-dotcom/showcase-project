import { CoverSlide } from "./CoverSlide";
import { SummarySlide } from "./SummarySlide";
import { TwoColumnSlide } from "./TwoColumnSlide";
import { MonthSlide } from "./MonthSlide";
import { BadgeCardsSlide } from "./BadgeCardsSlide";
import { JourneySlide } from "./JourneySlide";
import { KpiSlide } from "./KpiSlide";
import { ResultsSlide } from "./ResultsSlide";
import { DifferentiatorsSlide } from "./DifferentiatorsSlide";
import {
  SLIDE_01,
  SLIDE_03,
  SLIDE_04,
  SLIDE_05,
  SLIDE_06,
  SLIDE_07,
  SLIDE_08,
  SLIDE_09,
  SLIDE_11,
  SLIDE_15,
  SLIDE_16,
} from "../content";

/**
 * Slide registry. Order is fixed:
 * Capa → Sumário → Contexto → Diagnóstico → Mês 1/2/3 → Mensagem por Curso →
 * Canais → Jornada → Clima → KPIs → Resultados → Diferenciais → Conclusão →
 * Encerramento.
 */
export function renderSlide(index: number, scale: number) {
  switch (index) {
    case 0:
      return <CoverSlide index={0} scale={scale} content={SLIDE_01} isPrimary />;
    case 1:
      return <SummarySlide index={1} scale={scale} />;
    case 2:
      return (
        <TwoColumnSlide
          index={2}
          scale={scale}
          kicker={SLIDE_03.kicker}
          title={SLIDE_03.title}
          left={SLIDE_03.left}
          right={SLIDE_03.right}
        />
      );
    case 3:
      return (
        <TwoColumnSlide
          index={3}
          scale={scale}
          kicker={SLIDE_04.kicker}
          title={SLIDE_04.title}
          left={SLIDE_04.left}
          right={SLIDE_04.right}
        />
      );
    case 4:
      return <MonthSlide index={4} scale={scale} content={SLIDE_05} />;
    case 5:
      return <MonthSlide index={5} scale={scale} content={SLIDE_06} />;
    case 6:
      return <MonthSlide index={6} scale={scale} content={SLIDE_07} />;
    case 7:
      return (
        <BadgeCardsSlide
          index={7}
          scale={scale}
          kicker={SLIDE_08.kicker}
          title={SLIDE_08.title}
          cards={SLIDE_08.cards}
          columns={3}
          cardMinHeight={360}
        />
      );
    case 8:
      return (
        <BadgeCardsSlide
          index={8}
          scale={scale}
          kicker={SLIDE_09.kicker}
          title={SLIDE_09.title}
          cards={SLIDE_09.cards}
          columns={3}
          note={SLIDE_09.note}
          cardMinHeight={228}
        />
      );
    case 9:
      return <JourneySlide index={9} scale={scale} />;
    case 10:
      return (
        <BadgeCardsSlide
          index={10}
          scale={scale}
          kicker={SLIDE_11.kicker}
          title={SLIDE_11.title}
          cards={SLIDE_11.cards}
          columns={3}
          cardMinHeight={296}
        />
      );
    case 11:
      return <KpiSlide index={11} scale={scale} />;
    case 12:
      return <ResultsSlide index={12} scale={scale} />;
    case 13:
      return <DifferentiatorsSlide index={13} scale={scale} />;
    case 14:
      return <CoverSlide index={14} scale={scale} content={SLIDE_15} />;
    case 15:
      return <CoverSlide index={15} scale={scale} content={SLIDE_16} />;
    default:
      return null;
  }
}
