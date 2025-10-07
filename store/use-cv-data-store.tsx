import { create } from "zustand";

interface CvStore {
  fullName: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  address: string;

  setField: (field: keyof CvStore, value: string) => void;
  reset: () => void;
}

export const useCvDataStore = create<CvStore>((set) => ({
  fullName: "",
  jobTitle: "",
  email: "",
  phoneNumber: "",
  address: "",

  setField: (field, value) => set(() => ({ [field]: value })),
  reset: () =>
    set({
      fullName: "",
      jobTitle: "",
      email: "",
      phoneNumber: "",
      address: "",
    }),
}));
