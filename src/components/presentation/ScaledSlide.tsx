import { useEffect, useRef, useState, type ReactNode } from "react";

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;

interface ScaledSlideProps {
  children: (scale: number) => ReactNode;
  /** Fills its parent and centers the scaled 1920x1080 canvas. */
  className?: string;
}

/**
 * Measures the available box and scales the fixed 1920x1080 slide canvas to
 * fit inside it, keeping the slide centered.
 */
export function ScaledSlide({ children, className }: ScaledSlideProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const update = () => {
      const { width, height } = node.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      setScale(Math.min(width / SLIDE_WIDTH, height / SLIDE_HEIGHT));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          width: SLIDE_WIDTH,
          height: SLIDE_HEIGHT,
          left: "50%",
          top: "50%",
          marginLeft: -SLIDE_WIDTH / 2,
          marginTop: -SLIDE_HEIGHT / 2,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children(scale)}
      </div>
    </div>
  );
}
