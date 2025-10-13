import { create } from "zustand";
import { persist } from "zustand/middleware";

type SaveStatus = "idle" | "saving" | "saved" | "error";

// ---------- TYPES ----------
export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  summary: string;
  location?: string;
  order?: number;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
  summary: string;
  order?: number;
}

export interface Language {
  id: string;
  language: string;
  level?: number;
  order?: number;
}

export interface CourseCertificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  certificateUrl?: string;
  order?: number;
}

export interface Reference {
  id: string;
  fullName: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  order?: number;
}

export interface MoreDetails {
  id: string;
  achievements: string;
  hobbies: string;
  personalStatement: string;
  misc: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
  level?: string;
  proficiency?: number;
  keywords?: string[];
  description?: string;
  order?: number;
}

type CvCollections = {
  workExperience: WorkExperience[];
  education: Education[];
  languages: Language[];
  courses: CourseCertificate[];
  references: Reference[];
  moreDetails: MoreDetails[];
  skills: Skill[];
};

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

// ---------- GENERIC STORE ----------
interface CvStore extends CvCollections {
  title: string;
  resumeId?: string;
  saveStatus: SaveStatus;
  lastSaved?: Date | null;

  fullName: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  address: string;
  summary: string;
  profileImage?: string;
  setProfileImage: (url: string) => void;

  setField: (field: keyof CvStore, value: any) => void;

  setItemField: <
    K extends keyof CvCollections,
    T extends CvCollections[K][number]
  >(
    section: K,
    id: string,
    field: keyof T,
    value: any
  ) => void;

  addItem: <K extends keyof CvCollections>(section: K) => void;
  removeItem: <K extends keyof CvCollections>(section: K, id: string) => void;

  setResumeId: (id: string) => void;
  setSaveStatus: (status: SaveStatus) => void;
  setLastSaved: (date: Date) => void;

  reset: () => void;
}

// ---------- IMPLEMENTATION ----------
export const useCvDataStore = create<CvStore>((set, get) => ({
  // --- base fields ---
  title: "Untitled Resume",
  resumeId: undefined,
  saveStatus: "idle",
  lastSaved: null,

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
