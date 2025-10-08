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

interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
  summary: string;
  grade: string;
  order?: number;
}

interface Language {
  id: string;
  language: string;
  level?: number;
  order?: number;
}

interface CvStore {
  fullName: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  address: string;
  summary: string;

  workExperience: WorkExperience[];
  education: Education[];
  languages: Language[];

  setField: (field: keyof CvStore, value: string) => void;
  setWorkExperienceField: (
    id: string,
    field: keyof WorkExperience,
    value: string
  ) => void;
  setEducationField: (
    id: string,
    field: keyof Education,
    value: string
  ) => void;
  setLanguageField: (
    id: string,
    field: keyof Language,
    value: string | number
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

  education: [
    {
      id: "1",
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      location: "",
      summary: "",
      grade: "",
      order: 0,
    },
  ],

  languages: [
    {
      id: "1",
      language: "",
      level: 0,
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

  setEducationField: (id, field, value) =>
    set((state) => ({
      education: state.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    })),

  setLanguageField: (id, field, value) =>
    set((state) => ({
      languages: state.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
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
      education: [
        {
          id: "1",
          school: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          location: "",
          summary: "",
          grade: "",
          order: 0,
        },
      ],
      languages: [
        {
          id: "1",
          language: "",
          level: 0,
          order: 0,
        },
      ],
    }),
}));
