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

interface CourseCertificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  certificateUrl?: string;
  order?: number;
}

interface Reference {
  id: string;
  fullName: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  order?: number;
}

interface MoreDetails {
  id: string;
  achievements: string;
  hobbies: string;
  personalStatement: string;
  misc: string;
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
  courses: CourseCertificate[];
  references: Reference[];
  moreDetails: MoreDetails[];

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
  setCourseField: (
    id: string,
    field: keyof CourseCertificate,
    value: string
  ) => void;
  setReferenceField: (
    id: string,
    field: keyof Reference,
    value: string
  ) => void;
  setMoreDetailsField: (
    id: string,
    field: keyof MoreDetails,
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

  courses: [
    {
      id: "1",
      title: "",
      issuer: "",
      date: "",
      description: "",
      certificateUrl: "",
      order: 0,
    },
  ],

  references: [
    {
      id: "1",
      fullName: "",
      position: "",
      company: "",
      email: "",
      phone: "",
      order: 0,
    },
  ],

  moreDetails: [
    {
      id: "1",
      achievements: "",
      hobbies: "",
      personalStatement: "",
      misc: "",
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

  setCourseField: (id, field, value) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      ),
    })),

  setReferenceField: (id, field, value) =>
    set((state) => ({
      references: state.references.map((ref) =>
        ref.id === id ? { ...ref, [field]: value } : ref
      ),
    })),

  setMoreDetailsField: (id, field, value) =>
    set((state) => ({
      moreDetails: state.moreDetails.map((detail) =>
        detail.id === id ? { ...detail, [field]: value } : detail
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
      courses: [
        {
          id: "1",
          title: "",
          issuer: "",
          date: "",
          description: "",
          certificateUrl: "",
          order: 0,
        },
      ],
      references: [
        {
          id: "1",
          fullName: "",
          position: "",
          company: "",
          email: "",
          phone: "",
          order: 0,
        },
      ],

      moreDetails: [
        {
          id: "1",
          achievements: "",
          hobbies: "",
          personalStatement: "",
          misc: "",
        },
      ],
    }),
}));
