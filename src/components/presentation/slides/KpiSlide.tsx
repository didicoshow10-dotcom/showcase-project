import { EditableText } from "../EditableText";
import { ContentFrame } from "../SlideFrame";
import { SLIDE_12 } from "../content";

interface SlideProps {
  index: number;
  scale: number;
}

/** 12 — Indicadores e KPIs: gradient-headed table with zebra rows. */
export function KpiSlide({ index, scale }: SlideProps) {
  return (
    <ContentFrame
      index={index}
      scale={scale}
      kicker={SLIDE_12.kicker}
      title={SLIDE_12.title}
    >
      <div
        className="overflow-hidden rounded-[24px] bg-card"
        style={{ boxShadow: "var(--shadow-card-lg)" }}
      >
        <div
          className="grid px-12 py-7"
          style={{
            gridTemplateColumns: "1fr 0.65fr 0.45fr",
            background: "var(--gradient-plum)",
          }}
        >
          <EditableText
            id={`kpi-head-indicator-${index}`}
            value={SLIDE_12.headers.indicator}
            className="slide-kicker text-primary-foreground"
            singleLine
          />
          <EditableText
            id={`kpi-head-target-${index}`}
            value={SLIDE_12.headers.target}
            className="slide-kicker text-primary-foreground"
            singleLine
          />
          <EditableText
            id={`kpi-head-frequency-${index}`}
            value={SLIDE_12.headers.frequency}
            className="slide-kicker text-primary-foreground"
            singleLine
          />
        </div>

        {SLIDE_12.rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid items-center px-12 py-6 ${
              rowIndex % 2 === 1 ? "bg-lilac/45" : "bg-card"
            }`}
            style={{ gridTemplateColumns: "1fr 0.65fr 0.45fr" }}
          >
            <EditableText
              id={`kpi-indicator-${index}-${rowIndex}`}
              value={row.indicator}
              className="slide-body text-plum-deep"
              singleLine
            />
            <EditableText
              id={`kpi-target-${index}-${rowIndex}`}
              value={row.target}
              className="slide-body font-bold text-crimson"
              singleLine
            />
            <EditableText
              id={`kpi-frequency-${index}-${rowIndex}`}
              value={row.frequency}
              className="slide-body text-slate-body"
              singleLine
            />
          </div>
        ))}
      </div>

      <EditableText
        id={`kpi-note-${index}`}
        as="p"
        value={SLIDE_12.note}
        className="slide-body-lg mt-9 block text-plum-soft"
      />
    </ContentFrame>
  );
}
