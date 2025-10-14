import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Section {
  id: string;
  title: string;
}

interface SectionStore {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export const useSectionStore = create<SectionStore>()(
  persist(
    (set) => ({
      activeSection: {
        id: "personal-info",
        title: "Personal Info",
      },
      setActiveSection: (section) => set({ activeSection: section }),
    }),
    {
      name: "section-storage",
      partialize: (state) => ({ activeSection: state.activeSection }),
    }
  )
);
