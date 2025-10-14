import { error } from "console";
import { create } from "zustand";

export type CanvasStore = "motivation-letter";

interface CanvasStoreProps {
  isOpen: boolean;
  motivationLetterText: string;
  id: CanvasStore | null;
  title: string;
  error: string;
  loading: boolean;
  disableClose: boolean;

  setLoading: (isLoading: boolean) => void;
  setError: (any: any) => void;
  setMotivationLetterText: (text: string) => void;
  openCanvas: (id: CanvasStore, title?: string) => void;
  close: () => void;
}

export const useCanvasStore = create<CanvasStoreProps>((set) => ({
  motivationLetterText: "",
  isOpen: false,
  id: null,
  title: "",
  error: "",
  loading: false,
  disableClose: false,

  setLoading: (isLoading) => set({ loading: isLoading, disableClose: isLoading ? true : false }),
  setError: (any: any) => set({ error: any }),
  setMotivationLetterText: (text) => set({ motivationLetterText: text }),
  openCanvas: (id, title = "") => set({ isOpen: true, id, title }),
  close: () => set({ isOpen: false, id: null, title: "" }),
}));
