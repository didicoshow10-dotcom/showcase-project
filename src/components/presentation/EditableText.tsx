import { useEffect, useRef, type ElementType } from "react";
import { useDeckStore } from "./store";

interface EditableTextProps {
  /** Stable id used to persist the edited value. */
  id: string;
  /** Default copy shown until the user edits it. */
  value: string;
  as?: ElementType;
  className?: string;
  /** Renders the text on a single line and blocks Enter. */
  singleLine?: boolean;
}

/**
 * Inline-editable text node. Renders as plain text while presenting and
 * becomes a contentEditable region once the deck is in edit mode.
 */
export function EditableText({
  id,
  value,
  as,
  className,
  singleLine = false,
}: EditableTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const { editMode, getText, setText, resetKey } = useDeckStore();
  const ref = useRef<HTMLElement | null>(null);

  const current = getText(id, value);

  // Keep the DOM in sync when the value changes from outside the element
  // (initial hydration of stored content, or "Restaurar").
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (node.textContent !== current) {
      node.textContent = current;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, resetKey]);

  return (
    <Tag
      ref={ref}
      data-editable="true"
      contentEditable={editMode}
      suppressContentEditableWarning
      spellCheck={false}
      role={editMode ? "textbox" : undefined}
      tabIndex={editMode ? 0 : undefined}
      className={className}
      onBlur={(event: React.FocusEvent<HTMLElement>) => {
        setText(id, event.currentTarget.textContent ?? "");
      }}
      onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
        // Keep slide navigation shortcuts from firing while typing.
        event.stopPropagation();
        if (singleLine && event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.blur();
        }
        if (event.key === "Escape") {
          event.currentTarget.blur();
        }
      }}
      onPaste={(event: React.ClipboardEvent<HTMLElement>) => {
        // Paste as plain text so slide typography stays intact.
        event.preventDefault();
        const text = event.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
      }}
    >
      {current}
    </Tag>
  );
}
