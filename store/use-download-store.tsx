import { create } from "zustand";

export type LoadingState = "motivation-letter" | "resume";

interface DownloadStore {
  downloading: { [key in LoadingState]?: boolean };
  setDownloading: (id: LoadingState, val: boolean) => void;
}

export const useDownloadStore = create<DownloadStore>((set) => ({
  downloading: {},
  setDownloading: (id, val) =>
    set((state) => ({
      downloading: { ...state.downloading, [id]: val },
    })),
}));
