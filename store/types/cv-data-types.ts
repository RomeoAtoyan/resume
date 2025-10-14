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

export type CvCollections = {
  workExperience: WorkExperience[];
  education: Education[];
  languages: Language[];
  courses: CourseCertificate[];
  references: Reference[];
  moreDetails: MoreDetails[];
  skills: Skill[];
};

export type SaveStatus = "idle" | "saving" | "saved" | "error";

// ---------- GENERIC STORE ----------
export interface CvStore extends CvCollections {
  title: string;
  resumeId?: string;
  saveStatus: SaveStatus;
  lastSaved?: Date | null;
  template: "default" | "modern";

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

  syncFromDB: (resumeData: any) => void;

  reset: () => void;
}