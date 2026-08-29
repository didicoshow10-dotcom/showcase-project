import { useCallback, useRef, useState } from "react";
import { useDeckStore, type ImageState } from "./store";

interface EditableImageProps {
  id: string;
  src: string;
  alt: string;
  x: number;
  y: number;
  width: number;
  height: number;
  className?: string;
  scale: number;
  cover?: boolean;
}

type DragKind = "move" | "nw" | "ne" | "sw" | "se";

export function EditableImage({ id, src, alt, x, y, width, height, className, scale, cover = false }: EditableImageProps) {
  const { editMode, getImage, setImage } = useDeckStore();
  const fallback: ImageState = { src, x, y, width, height };
  const state = getImage(id, fallback);
  const [active, setActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const aspect = state.height === 0 ? 1 : state.width / state.height;

  const beginDrag = useCallback((event: React.PointerEvent, kind: DragKind) => {
    if (!editMode) return;
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startY = event.clientY;
    const origin = { ...state };
    const safeScale = scale || 1;
    const onMove = (moveEvent: PointerEvent) => {
      const dx = (moveEvent.clientX - startX) / safeScale;
      const dy = (moveEvent.clientY - startY) / safeScale;
      if (kind === "move") {
        setImage(id, { x: origin.x + dx, y: origin.y + dy });
        return;
      }
      const signX = kind === "ne" || kind === "se" ? 1 : -1;
      const signY = kind === "sw" || kind === "se" ? 1 : -1;
      const delta = (dx * signX + dy * signY) / 2;
      const nextWidth = Math.max(32, origin.width + delta * 2);
      const nextHeight = Math.max(32, nextWidth / aspect);
      const nextX = kind === "nw" || kind === "sw" ? origin.x + (origin.width - nextWidth) : origin.x;
      const nextY = kind === "nw" || kind === "ne" ? origin.y + (origin.height - nextHeight) : origin.y;
      setImage(id, { x: nextX, y: nextY, width: nextWidth, height: nextHeight });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, [editMode, id, scale, setImage, state, aspect]);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setImage(id, { src: reader.result });
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleSize = 26;
  const corners: Array<{ kind: DragKind; style: React.CSSProperties }> = [
    { kind: "nw", style: { left: -handleSize / 2, top: -handleSize / 2, cursor: "nwse-resize" } },
    { kind: "ne", style: { right: -handleSize / 2, top: -handleSize / 2, cursor: "nesw-resize" } },
    { kind: "sw", style: { left: -handleSize / 2, bottom: -handleSize / 2, cursor: "nesw-resize" } },
    { kind: "se", style: { right: -handleSize / 2, bottom: -handleSize / 2, cursor: "nwse-resize" } },
  ];

  return (
    <div
      data-editable-image="true"
      data-edit-mode={editMode}
      className="absolute"
      style={{
        left: state.x,
        top: state.y,
        width: state.width,
        height: state.height,
        cursor: editMode ? "move" : "default",
        touchAction: editMode ? "none" : undefined,
        zIndex: cover ? 0 : active ? 40 : undefined,
      }}
      onPointerDown={(event) => beginDrag(event, "move")}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <img src={state.src} alt={alt} draggable={false} className={className} style={{ width: "100%", height: "100%", objectFit: cover ? "cover" : "contain", pointerEvents: "none", userSelect: "none" }} />
      {editMode && active ? (
        <>
          {corners.map((corner) => (
            <span key={corner.kind} onPointerDown={(event) => beginDrag(event, corner.kind)} className="absolute rounded-full border-2 border-background bg-accent" style={{ width: handleSize, height: handleSize, ...corner.style }} />
          ))}
          <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); fileInputRef.current?.click(); }} className="absolute left-1/2 rounded-full bg-accent px-4 py-2 font-semibold text-accent-foreground shadow-lg" style={{ bottom: -46, transform: "translateX(-50%)", fontSize: 20, whiteSpace: "nowrap" }}>
            Substituir
          </button>
        </>
      ) : null}
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFile} />
    </div>
  );
}
