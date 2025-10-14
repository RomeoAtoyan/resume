import { create } from "zustand";
import {
  CourseCertificate,
  CvStore,
  Education,
  Language,
  MoreDetails,
  Reference,
  Skill,
  WorkExperience
} from "./types/cv-data-types";

// ---------- DEFAULT ITEM FACTORY ----------
const factories = {
  workExperience: (): WorkExperience => ({
    id: crypto.randomUUID(),
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    summary: "",
    location: "",
    order: 0,
  }),
  education: (): Education => ({
    id: crypto.randomUUID(),
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    location: "",
    summary: "",
    order: 0,
  }),
  languages: (): Language => ({
    id: crypto.randomUUID(),
    language: "",
    level: 0,
    order: 0,
  }),
  courses: (): CourseCertificate => ({
    id: crypto.randomUUID(),
    title: "",
    issuer: "",
    date: "",
    description: "",
    certificateUrl: "",
    order: 0,
  }),
  references: (): Reference => ({
    id: crypto.randomUUID(),
    fullName: "",
    position: "",
    company: "",
    email: "",
    phone: "",
    order: 0,
  }),
  moreDetails: (): MoreDetails => ({
    id: crypto.randomUUID(),
    achievements: "",
    hobbies: "",
    personalStatement: "",
    misc: "",
  }),
  skills: (): Skill => ({
    id: crypto.randomUUID(),
    name: "",
    category: "",
    level: "",
    proficiency: 0,
    keywords: [],
    description: "",
    order: 0,
  }),
};

// ---------- IMPLEMENTATION ----------
export const useCvDataStore = create<CvStore>((set, get) => ({
  // --- base fields ---
  title: "Untitled Resume",
  resumeId: undefined,
  saveStatus: "idle",
  lastSaved: null,
  template: "default",
  motivationLetter: "",
  motivationLetterDate: null,

  profileImage: "",
  fullName: "",
  jobTitle: "",
  email: "",
  phoneNumber: "",
  address: "",
  summary: "",

  // --- collections ---
  workExperience: [factories.workExperience()],
  education: [factories.education()],
  languages: [factories.languages()],
  courses: [factories.courses()],
  references: [factories.references()],
  moreDetails: [factories.moreDetails()],
  skills: [factories.skills()],

  // --- setters ---
  setField: (field, value) => set(() => ({ [field]: value })),
  setProfileImage: (url) => set({ profileImage: url }),

  setItemField: (section, id, field, value) =>
    set((state) => ({
      [section]: state[section].map((item: any) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    })),

  addItem: (section) =>
    set((state) => ({
      [section]: [...state[section], factories[section]()],
    })),

  removeItem: (section, id) =>
    set((state) => ({
      [section]: state[section].filter((item: any) => item.id !== id),
    })),

  setResumeId: (id) => set({ resumeId: id }),
  setSaveStatus: (status) => set({ saveStatus: status }),
  setLastSaved: (date) => set({ lastSaved: date }),

  syncFromDB: (resumeData: any) => {
    if (!resumeData || typeof resumeData !== "object") return;

    const safe = (key: string) =>
      resumeData[key] ? resumeData[key] : undefined;

    set({
      title: safe("title") ?? "Untitled Resume",
      template: safe("template") ?? "default",
      motivationLetter: safe("motivationLetter") ?? "",
      fullName: safe("fullName") ?? "",
      jobTitle: safe("jobTitle") ?? "",
      email: safe("email") ?? "",
      phoneNumber: safe("phoneNumber") ?? "",
      address: safe("address") ?? "",
      summary: safe("summary") ?? "",
      profileImage: safe("profileImage") ?? "",
      workExperience: safe("workExperience") ?? [factories.workExperience()],
      education: safe("education") ?? [factories.education()],
      languages: safe("languages") ?? [factories.languages()],
      courses: safe("courses") ?? [factories.courses()],
      references: safe("references") ?? [factories.references()],
      moreDetails: safe("moreDetails") ?? [factories.moreDetails()],
      skills: safe("skills") ?? [factories.skills()],
    });
  },

  reset: () =>
    set({
      fullName: "",
      jobTitle: "",
      email: "",
      phoneNumber: "",
      address: "",
      summary: "",
      workExperience: [factories.workExperience()],
      education: [factories.education()],
      languages: [factories.languages()],
      courses: [factories.courses()],
      references: [factories.references()],
      moreDetails: [factories.moreDetails()],
      skills: [factories.skills()],
    }),
}));
