import { create } from "zustand";

export type ModalType = "add-cv" | "remove-resume" | "regenerate-letter";

interface ModalStore {
  isOpen: boolean;
  id: ModalType | null;
  title: string;
  openModal: (id: ModalType, title?: string) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  id: null,
  title: "",
  openModal: (id, title = "") => set({ isOpen: true, id, title }),
  close: () => set({ isOpen: false, id: null, title: "" }),
}));
