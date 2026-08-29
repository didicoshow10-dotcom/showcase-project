import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface ImageState { src: string; x: number; y: number; width: number; height: number; }
interface DeckState { texts: Record<string, string>; fontSizes: Record<string, number>; images: Record<string, ImageState>; }
interface DeckStore extends DeckState {
  editMode: boolean; resetKey: number; hydrated: boolean; selectedTextId: string | null;
  setEditMode: (value: boolean) => void; toggleEditMode: () => void;
  setText: (id: string, value: string) => void; getText: (id: string, fallback: string) => string;
  setFontSize: (id: string, value: number) => void; getFontSize: (id: string, fallback?: number) => number | undefined;
  selectText: (id: string | null) => void;
  setImage: (id: string, value: Partial<ImageState>) => void; getImage: (id: string, fallback: ImageState) => ImageState; restore: () => void;
}
const STORAGE_KEY = "icev-deck-state-v1";
const DeckStoreContext = createContext<DeckStore | null>(null);
const emptyState: DeckState = { texts: {}, fontSizes: {}, images: {} };
function readStoredState(): DeckState {
  if (typeof window === "undefined") return emptyState;
  try { const raw = window.localStorage.getItem(STORAGE_KEY); if (!raw) return emptyState; const parsed = JSON.parse(raw) as Partial<DeckState>; return { texts: parsed.texts ?? {}, fontSizes: parsed.fontSizes ?? {}, images: parsed.images ?? {} }; } catch { return emptyState; }
}
export function DeckStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DeckState>(emptyState); const [editMode, setEditMode] = useState(false); const [resetKey, setResetKey] = useState(0); const [hydrated, setHydrated] = useState(false); const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  useEffect(() => { const stored = readStoredState(); setState(stored); setHydrated(true); setResetKey((key) => key + 1); }, []);
  useEffect(() => { if (!hydrated) return; try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {} }, [state, hydrated]);
  const setText = useCallback((id: string, value: string) => setState((prev) => prev.texts[id] === value ? prev : { ...prev, texts: { ...prev.texts, [id]: value } }), []);
  const getText = useCallback((id: string, fallback: string) => state.texts[id] ?? fallback, [state.texts]);
  const setFontSize = useCallback((id: string, value: number) => { const safe = Math.max(10, Math.min(72, Math.round(value))); setState((prev) => prev.fontSizes[id] === safe ? prev : { ...prev, fontSizes: { ...prev.fontSizes, [id]: safe } }); }, []);
  const getFontSize = useCallback((id: string, fallback?: number) => state.fontSizes[id] ?? fallback, [state.fontSizes]);
  const selectText = useCallback((id: string | null) => setSelectedTextId(id), []);
  const setImage = useCallback((id: string, value: Partial<ImageState>) => setState((prev) => { const existing = prev.images[id]; const base: ImageState = existing ?? { src: value.src ?? "", x: value.x ?? 0, y: value.y ?? 0, width: value.width ?? 0, height: value.height ?? 0 }; return { ...prev, images: { ...prev.images, [id]: { ...base, ...value } } }; }), []);
  const getImage = useCallback((id: string, fallback: ImageState) => state.images[id] ? { ...fallback, ...state.images[id] } : fallback, [state.images]);
  const restore = useCallback(() => { setState(emptyState); setSelectedTextId(null); setResetKey((key) => key + 1); try { window.localStorage.removeItem(STORAGE_KEY); } catch {} }, []);
  const value = useMemo<DeckStore>(() => ({ ...state, editMode, resetKey, hydrated, selectedTextId, setEditMode, toggleEditMode: () => setEditMode((current) => !current), setText, getText, setFontSize, getFontSize, selectText, setImage, getImage, restore }), [state, editMode, resetKey, hydrated, selectedTextId, setText, getText, setFontSize, getFontSize, selectText, setImage, getImage, restore]);
  return <DeckStoreContext.Provider value={value}>{children}</DeckStoreContext.Provider>;
}
export function useDeckStore(): DeckStore { const context = useContext(DeckStoreContext); if (!context) throw new Error("useDeckStore must be used inside a DeckStoreProvider"); return context; }
