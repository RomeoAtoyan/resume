import { create } from "zustand";

interface Section {
  id: string;
  title: string;
}

interface SectionStore {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export const useSectionStore = create<SectionStore>((set) => ({
  activeSection: {
    id: "ai-motivation",
    title: "AI Motivation Letter",
  },
  setActiveSection: (section) => set({ activeSection: section }),
}));
