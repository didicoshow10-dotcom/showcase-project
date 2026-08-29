import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface ImageState {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DeckState {
  texts: Record<string, string>;
  images: Record<string, ImageState>;
}

interface DeckStore extends DeckState {
  editMode: boolean;
  resetKey: number;
  hydrated: boolean;
  setEditMode: (value: boolean) => void;
  toggleEditMode: () => void;
  setText: (id: string, value: string) => void;
  getText: (id: string, fallback: string) => string;
  setImage: (id: string, value: Partial<ImageState>) => void;
  getImage: (id: string, fallback: ImageState) => ImageState;
  restore: () => void;
}

const STORAGE_KEY = "icev-deck-state-v1";

const DeckStoreContext = createContext<DeckStore | null>(null);

const emptyState: DeckState = { texts: {}, images: {} };

function readStoredState(): DeckState {
  if (typeof window === "undefined") return emptyState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw) as Partial<DeckState>;
    return {
      texts: parsed.texts ?? {},
      images: parsed.images ?? {},
    };
  } catch {
    return emptyState;
  }
}

export function DeckStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DeckState>(emptyState);
  const [editMode, setEditMode] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // Read persisted content after hydration so SSR and the first client render
  // agree on markup.
  useEffect(() => {
    const stored = readStoredState();
    setState(stored);
    setHydrated(true);
    setResetKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable — editing still works in-memory */
    }
  }, [state, hydrated]);

  const setText = useCallback((id: string, value: string) => {
    setState((prev) => {
      if (prev.texts[id] === value) return prev;
      return { ...prev, texts: { ...prev.texts, [id]: value } };
    });
  }, []);

  const getText = useCallback(
    (id: string, fallback: string) => state.texts[id] ?? fallback,
    [state.texts],
  );

  const setImage = useCallback((id: string, value: Partial<ImageState>) => {
    setState((prev) => {
      const existing = prev.images[id];
      const base: ImageState = existing ?? {
        src: value.src ?? "",
        x: value.x ?? 0,
        y: value.y ?? 0,
        width: value.width ?? 0,
        height: value.height ?? 0,
      };
      return { ...prev, images: { ...prev.images, [id]: { ...base, ...value } } };
    });
  }, []);

  const getImage = useCallback(
    (id: string, fallback: ImageState) => {
      const stored = state.images[id];
      return stored ? { ...fallback, ...stored } : fallback;
    },
    [state.images],
  );

  const restore = useCallback(() => {
    setState(emptyState);
    setResetKey((key) => key + 1);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<DeckStore>(
    () => ({
      ...state,
      editMode,
      resetKey,
      hydrated,
      setEditMode,
      toggleEditMode: () => setEditMode((current) => !current),
      setText,
      getText,
      setImage,
      getImage,
      restore,
    }),
    [state, editMode, resetKey, hydrated, setText, getText, setImage, getImage, restore],
  );

  return <DeckStoreContext.Provider value={value}>{children}</DeckStoreContext.Provider>;
}

export function useDeckStore(): DeckStore {
  const context = useContext(DeckStoreContext);
  if (!context) {
    throw new Error("useDeckStore must be used inside a DeckStoreProvider");
  }
  return context;
}
