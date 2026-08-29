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
  let slide: React.ReactNode;
  switch (index) {
    case 0: slide = <CoverSlide index={0} scale={scale} content={SLIDE_01} isPrimary />; break;
    case 1: slide = <SummarySlide index={1} scale={scale} />; break;
    case 2: slide = <TwoColumnSlide index={2} scale={scale} kicker={SLIDE_03.kicker} title={SLIDE_03.title} left={SLIDE_03.left} right={SLIDE_03.right} />; break;
    case 3: slide = <TwoColumnSlide index={3} scale={scale} kicker={SLIDE_04.kicker} title={SLIDE_04.title} left={SLIDE_04.left} right={SLIDE_04.right} />; break;
    case 4: slide = <MonthSlide index={4} scale={scale} content={SLIDE_05} />; break;
    case 5: slide = <MonthSlide index={5} scale={scale} content={SLIDE_06} />; break;
    case 6: slide = <MonthSlide index={6} scale={scale} content={SLIDE_07} />; break;
    case 7: slide = <BadgeCardsSlide index={7} scale={scale} kicker={SLIDE_08.kicker} title={SLIDE_08.title} cards={SLIDE_08.cards} columns={2} note={SLIDE_08.note} compact />; break;
    case 8: slide = <BadgeCardsSlide index={8} scale={scale} kicker={SLIDE_08B.kicker} title={SLIDE_08B.title} cards={SLIDE_08B.cards} columns={2} note={SLIDE_08B.note} compact />; break;
    case 9: slide = <BadgeCardsSlide index={9} scale={scale} kicker={SLIDE_09.kicker} title={SLIDE_09.title} cards={SLIDE_09.cards} columns={3} note={SLIDE_09.note} cardMinHeight={228} />; break;
    case 10: slide = <JourneySlide index={10} scale={scale} />; break;
    case 11: slide = <BadgeCardsSlide index={11} scale={scale} kicker={SLIDE_11.kicker} title={SLIDE_11.title} cards={SLIDE_11.cards} columns={3} cardMinHeight={250} compact />; break;
    case 12: slide = <KpiSlide index={12} scale={scale} />; break;
    case 13: slide = <ResultsSlide index={13} scale={scale} />; break;
    case 14: slide = <DifferentiatorsSlide index={14} scale={scale} />; break;
    case 15: slide = <CoverSlide index={15} scale={scale} content={SLIDE_15} />; break;
    case 16: slide = <CoverSlide index={16} scale={scale} content={SLIDE_16} />; break;
    default: slide = null;
  }

  return <div key={`slide-transition-${index}`} className="slide-transition-enter">{slide}</div>;
}
