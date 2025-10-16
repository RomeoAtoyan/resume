import { create } from "zustand";

export type LoadingState = "download-motivation-letter" | "download-resume";

interface DownloadStore {
  id: LoadingState | undefined;
  downloading: boolean;
  setDownloading: (id: LoadingState, val: boolean) => void;
}

export const useDownloadStore = create<DownloadStore>((set) => ({
  id: undefined,
  downloading: false,
  setDownloading: (id, val) => set({ id: id, downloading: val }),
}));
