import { useEffect, useRef, useState, type ElementType } from "react";
import { Minus, Plus } from "lucide-react";
import { useDeckStore } from "./store";

interface EditableTextProps {
  id: string;
  value: string;
  as?: ElementType;
  className?: string;
  singleLine?: boolean;
}

export function EditableText({ id, value, as, className, singleLine = false }: EditableTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const {
    editMode,
    getText,
    setText,
    getFontSize,
    setFontSize,
    selectText,
    selectedTextId,
    resetKey,
  } = useDeckStore();

  const ref = useRef<HTMLElement | null>(null);
  const [toolbarTop, setToolbarTop] = useState(0);
  const [toolbarLeft, setToolbarLeft] = useState(0);
  const current = getText(id, value);
  const storedFontSize = getFontSize(id);
  const fontSize = storedFontSize ?? 20;
  const selected = editMode && selectedTextId === id;

  const updateToolbarPosition = () => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setToolbarTop(Math.max(8, rect.top - 58));
    setToolbarLeft(Math.min(Math.max(8, rect.left), Math.max(8, window.innerWidth - 280)));
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Only synchronize from the store when the rendered value actually changed.
    // This prevents React from replacing the user's cursor/selection while typing.
    if (node.textContent !== current) node.textContent = current;
  }, [current, resetKey]);

  useEffect(() => {
    if (!selected) return;
    updateToolbarPosition();
    const onMove = () => updateToolbarPosition();
    window.addEventListener("resize", onMove);
    window.addEventListener("scroll", onMove, true);
    return () => {
      window.removeEventListener("resize", onMove);
      window.removeEventListener("scroll", onMove, true);
    };
  }, [selected]);

  const select = () => {
    if (!editMode) return;
    selectText(id);
    requestAnimationFrame(updateToolbarPosition);
  };

  const changeFont = (next: number) => {
    if (!editMode) return;
    if (!Number.isFinite(next)) return;
    setFontSize(id, Math.max(10, Math.min(96, Math.round(next))));
  };

  const commitText = (node: HTMLElement) => {
    setText(id, node.textContent ?? "");
  };

  return (
    <>
      <Tag
        ref={ref}
        data-editable="true"
        data-text-id={id}
        contentEditable={editMode}
        suppressContentEditableWarning
        spellCheck={false}
        role={editMode ? "textbox" : undefined}
        tabIndex={editMode ? 0 : undefined}
        className={`${className ?? ""} ${
          editMode ? "pointer-events-auto cursor-text select-text" : ""
        } ${selected ? "ring-2 ring-crimson ring-offset-2 ring-offset-ink rounded-sm" : ""}`}
        style={storedFontSize ? { fontSize: `${storedFontSize}px` } : undefined}
        onPointerDown={select}
        onFocus={select}
        onClick={select}
        onInput={(event: React.FormEvent<HTMLElement>) => commitText(event.currentTarget)}
        onBlur={(event: React.FocusEvent<HTMLElement>) => commitText(event.currentTarget)}
        onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
          event.stopPropagation();
          if (singleLine && event.key === "Enter") {
            event.preventDefault();
            event.currentTarget.blur();
          }
          if (event.key === "Escape") {
            event.preventDefault();
            event.currentTarget.blur();
          }
        }}
        onPaste={(event: React.ClipboardEvent<HTMLElement>) => {
          event.preventDefault();
          const text = event.clipboardData.getData("text/plain");
          document.execCommand("insertText", false, text);
        }}
      >
        {current}
      </Tag>

      {selected ? (
        <div
          className="fixed z-[100] flex items-center gap-1.5 rounded-xl border border-white/15 bg-ink px-2 py-1.5 shadow-2xl"
          style={{ top: toolbarTop, left: toolbarLeft }}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <span className="px-1 text-[11px] font-semibold text-white/65">Tamanho</span>
          <button
            type="button"
            onClick={() => changeFont(fontSize - 1)}
            disabled={fontSize <= 10}
            className="rounded-md bg-white/10 p-1.5 text-white hover:bg-white/20 disabled:opacity-30"
            aria-label="Diminuir tamanho da fonte"
          >
            <Minus className="size-3.5" />
          </button>
          <input
            type="number"
            min={10}
            max={96}
            value={fontSize}
            onChange={(event) => changeFont(Number(event.target.value))}
            className="w-14 rounded-md border border-white/15 bg-white/10 px-1.5 py-1 text-center text-xs font-semibold text-white outline-none focus:border-crimson"
            aria-label="Tamanho da fonte em pixels"
          />
          <span className="text-[10px] text-white/45">px</span>
          <button
            type="button"
            onClick={() => changeFont(fontSize + 1)}
            disabled={fontSize >= 96}
            className="rounded-md bg-white/10 p-1.5 text-white hover:bg-white/20 disabled:opacity-30"
            aria-label="Aumentar tamanho da fonte"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      ) : null}
    </>
  );
}
