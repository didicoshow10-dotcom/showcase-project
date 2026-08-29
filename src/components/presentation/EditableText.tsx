import { useEffect, useRef, type ElementType } from "react";
import { useDeckStore } from "./store";
interface EditableTextProps { id: string; value: string; as?: ElementType; className?: string; singleLine?: boolean; }
export function EditableText({ id, value, as, className, singleLine = false }: EditableTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const { editMode, getText, setText, getFontSize, selectText, selectedTextId, resetKey } = useDeckStore();
  const ref = useRef<HTMLElement | null>(null);
  const current = getText(id, value);
  const fontSize = getFontSize(id);
  useEffect(() => { const node = ref.current; if (!node) return; if (node.textContent !== current) node.textContent = current; }, [current, resetKey]);
  return <Tag ref={ref} data-editable="true" data-text-id={id} contentEditable={editMode} suppressContentEditableWarning spellCheck={false} role={editMode ? "textbox" : undefined} tabIndex={editMode ? 0 : undefined} className={`${className ?? ""} ${editMode && selectedTextId === id ? "ring-2 ring-crimson ring-offset-2 ring-offset-ink rounded-sm" : ""}`} style={fontSize ? { fontSize: `${fontSize}px` } : undefined} onFocus={() => editMode && selectText(id)} onClick={() => editMode && selectText(id)} onBlur={(event: React.FocusEvent<HTMLElement>) => setText(id, event.currentTarget.textContent ?? "")} onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => { event.stopPropagation(); if (singleLine && event.key === "Enter") { event.preventDefault(); event.currentTarget.blur(); } if (event.key === "Escape") event.currentTarget.blur(); }} onPaste={(event: React.ClipboardEvent<HTMLElement>) => { event.preventDefault(); const text = event.clipboardData.getData("text/plain"); document.execCommand("insertText", false, text); }}>{current}</Tag>;
}
