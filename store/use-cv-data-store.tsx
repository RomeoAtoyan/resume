import { create } from "zustand";

interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  summary: string;
  location?: string;
  order?: number;
}

interface CvStore {
  fullName: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  address: string;

  summary: string;
  workExperience: {
    id: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    company: string;
    summary: string;
    location?: string;
    order?: number;
  }[];

  setField: (field: keyof CvStore, value: string) => void;
  setWorkExperienceField: (
    id: string,
    field: keyof WorkExperience,
    value: string
  ) => void;
  reset: () => void;
}

export const useCvDataStore = create<CvStore>((set) => ({
  fullName: "",
  jobTitle: "",
  email: "",
  phoneNumber: "",
  address: "",
  summary: "",

  workExperience: [
    {
      id: "1",
      jobTitle: "",
      startDate: "",
      endDate: "",
      company: "",
      summary: "",
      location: "",
      order: 0,
    },
  ],

  setField: (field, value) => set(() => ({ [field]: value })),
  setWorkExperienceField: (id, field, value) =>
    set((state) => ({
      workExperience: state.workExperience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    })),
  reset: () =>
    set({
      fullName: "",
      jobTitle: "",
      email: "",
      phoneNumber: "",
      address: "",
      summary: "",
      workExperience: [
        {
          id: "",
          jobTitle: "",
          startDate: "",
          endDate: "",
          company: "",
          summary: "",
          order: 0,
        },
      ],
    }),
}));
