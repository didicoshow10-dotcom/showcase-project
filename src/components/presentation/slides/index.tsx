import { CoverSlide } from "./CoverSlide";
import { SummarySlide } from "./SummarySlide";
import { TwoColumnSlide } from "./TwoColumnSlide";
import { MonthSlide } from "./MonthSlide";
import { BadgeCardsSlide } from "./BadgeCardsSlide";
import { JourneySlide } from "./JourneySlide";
import { KpiSlide } from "./KpiSlide";
import { ResultsSlide } from "./ResultsSlide";
import { DifferentiatorsSlide } from "./DifferentiatorsSlide";
import { SLIDE_01, SLIDE_03, SLIDE_04, SLIDE_05, SLIDE_06, SLIDE_07, SLIDE_08, SLIDE_08B, SLIDE_09, SLIDE_11, SLIDE_15, SLIDE_16 } from "../content";

/** Registro dos slides da apresentação. */
export function renderSlide(index: number, scale: number) {
  switch (index) {
    case 0: return <CoverSlide index={0} scale={scale} content={SLIDE_01} isPrimary />;
    case 1: return <SummarySlide index={1} scale={scale} />;
    case 2: return <TwoColumnSlide index={2} scale={scale} kicker={SLIDE_03.kicker} title={SLIDE_03.title} left={SLIDE_03.left} right={SLIDE_03.right} />;
    case 3: return <TwoColumnSlide index={3} scale={scale} kicker={SLIDE_04.kicker} title={SLIDE_04.title} left={SLIDE_04.left} right={SLIDE_04.right} />;
    case 4: return <MonthSlide index={4} scale={scale} content={SLIDE_05} />;
    case 5: return <MonthSlide index={5} scale={scale} content={SLIDE_06} />;
    case 6: return <MonthSlide index={6} scale={scale} content={SLIDE_07} />;
    case 7: return <BadgeCardsSlide index={7} scale={scale} kicker={SLIDE_08.kicker} title={SLIDE_08.title} cards={SLIDE_08.cards} columns={2} note={SLIDE_08.note} compact />;
    case 8: return <BadgeCardsSlide index={8} scale={scale} kicker={SLIDE_08B.kicker} title={SLIDE_08B.title} cards={SLIDE_08B.cards} columns={2} note={SLIDE_08B.note} compact />;
    case 9: return <BadgeCardsSlide index={9} scale={scale} kicker={SLIDE_09.kicker} title={SLIDE_09.title} cards={SLIDE_09.cards} columns={3} note={SLIDE_09.note} cardMinHeight={228} />;
    case 10: return <JourneySlide index={10} scale={scale} />;
    case 11: return <BadgeCardsSlide index={11} scale={scale} kicker={SLIDE_11.kicker} title={SLIDE_11.title} cards={SLIDE_11.cards} columns={3} cardMinHeight={250} compact />;
    case 12: return <KpiSlide index={12} scale={scale} />;
    case 13: return <ResultsSlide index={13} scale={scale} />;
    case 14: return <DifferentiatorsSlide index={14} scale={scale} />;
    case 15: return <CoverSlide index={15} scale={scale} content={SLIDE_15} />;
    case 16: return <CoverSlide index={16} scale={scale} content={SLIDE_16} />;
    default: return null;
  }
}
