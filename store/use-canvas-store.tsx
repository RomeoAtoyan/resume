import { create } from "zustand";

export type CanvasStore = "motivation-letter";

interface CanvasStoreProps {
  isOpen: boolean;
  id: CanvasStore | null;
  title: string;
  error: string;
  loading: boolean;
  disableClose: boolean;
  editMode: boolean;

  setEditMode: (val: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (any: any) => void;
  openCanvas: (id: CanvasStore, title?: string) => void;
  close: () => void;
}

export const useCanvasStore = create<CanvasStoreProps>((set) => ({
  isOpen: false,
  id: null,
  title: "",
  error: "",
  loading: false,
  disableClose: false,
  editMode: false,

  setEditMode: (val) => set({ editMode: val }),
  setLoading: (isLoading) =>
    set({ loading: isLoading, disableClose: isLoading ? true : false }),
  setError: (any: any) => set({ error: any }),
  openCanvas: (id, title = "") => set({ isOpen: true, id, title }),
  close: () => set({ isOpen: false, id: null, title: "" }),
}));
