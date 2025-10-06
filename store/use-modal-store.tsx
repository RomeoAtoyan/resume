import { create } from "zustand";

type ModalType = "add-cv";

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
