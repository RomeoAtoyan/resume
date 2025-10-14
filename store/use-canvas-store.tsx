import { error } from "console";
import { create } from "zustand";

export type CanvasStore = "motivation-letter";

interface CanvasStoreProps {
  isOpen: boolean;
  motivationLetterText: { analysis: string };
  id: CanvasStore | null;
  title: string;
  error: string;

  setError: (any: any) => void;
  setMotivationLetterText: (text: { analysis: string }) => void;
  openCanvas: (id: CanvasStore, title?: string) => void;
  close: () => void;
}

export const useCanvasStore = create<CanvasStoreProps>((set) => ({
  motivationLetterText: { analysis: "" },
  isOpen: false,
  id: null,
  title: "",
  error: "",

  setError: (any: any) => set({ error: any }),
  setMotivationLetterText: (text) => set({ motivationLetterText: text }),
  openCanvas: (id, title = "") => set({ isOpen: true, id, title }),
  close: () => set({ isOpen: false, id: null, title: "" }),
}));

