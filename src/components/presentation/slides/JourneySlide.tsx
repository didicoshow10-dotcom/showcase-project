import { EditableText } from "../EditableText";
import { ContentFrame } from "../SlideFrame";
import { SLIDE_10 } from "../content";

interface SlideProps {
  index: number;
  scale: number;
}

/** 10 — Jornada do candidato: five stage cards with a crimson cap. */
export function JourneySlide({ index, scale }: SlideProps) {
  return (
    <ContentFrame
      index={index}
      scale={scale}
      kicker={SLIDE_10.kicker}
      title={SLIDE_10.title}
    >
      <EditableText
        id={`journey-section-${index}`}
        value={SLIDE_10.sectionLabel}
        className="slide-kicker block text-crimson"
        singleLine
      />

      <div className="mt-8 grid grid-cols-5 gap-8">
        {SLIDE_10.steps.map((step, stepIndex) => (
          <article
            key={step.number}
            className="overflow-hidden rounded-[24px] border border-lilac-deep/60 bg-card"
            style={{ boxShadow: "var(--shadow-card)", minHeight: 340 }}
          >
            <div className="h-3 w-full bg-crimson" aria-hidden="true" />
            <div className="px-9 py-9">
              <EditableText
                id={`journey-number-${index}-${stepIndex}`}
                value={step.number}
                className="slide-numeral block text-lilac-deep"
                singleLine
              />
              <EditableText
                id={`journey-title-${index}-${stepIndex}`}
                as="h3"
                value={step.title}
                className="slide-body-lg mt-5 block font-bold text-plum-mid"
              />
              <EditableText
                id={`journey-body-${index}-${stepIndex}`}
                as="p"
                value={step.body}
                className="slide-body mt-5 block text-slate-body"
              />
            </div>
          </article>
        ))}
      </div>
    </ContentFrame>
  );
}
