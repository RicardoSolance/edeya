import { ObjectId } from "mongoose";

export interface UserProfileProps {
  about: string;
  education: EducationType[];
  experience: ExperienceType[];
  hobbies: string[];
  language: languageTypes[];
  linkedIn: string;
  skills: string[];
  status: statusTypes;
  userId: ObjectId;
}

export interface ExperienceType {
  description: string;
  endDate: Date;
  jobTitle: string;
  skills: string[];
  startDate: Date;
}

export enum statusTypes {
  Available = "Disponible",
  Working = "Trabajando",
}

export enum languageTypes {
  English = "Inglés",
  French = "Francés",
  Spanish = "Español",
  Arabic = "Árabe",
  Russian = "Ruso",
  German = "Alemán",
  Portuguese = "Portugués",
  Chinese = "Chino",
  Indian = "Indio",
  Turkish = "Turco",
  Dutch = "Holandés",
  Italian = "Italiano",
}

export interface EducationType {
  educationLevel: EducationLevelType;
  endDate: Date;
  school: string;
  skills: string[];
  startDate: Date;
}

export enum EducationLevelType {
  Doctorate = "Doctorado",
  Master = "Master",
  PostGraduate = "Postgrado",
  Engineer = "Ingeniería Superior",
  Bachelor = "Bachelor",
  DipHE = "Ingeniería Técnica", //Diploma of Higher Education (DipHE)
  Associates = "Ciclo Formativo  de Grado Superior-FPII)",
  Vet = "Ciclo Formativo  de Grado Medio-FPI", //Vocational Education and Training (VET)
  Gce = "Curso de Orientación Universitaria-Preuniversitarios", //	General Certificate of Education (GCE)
  Gcs = "Educación Secundaria Basica-ESBA", //General Certificate of Secondary
  Pe = "Primaria", //Primary Education
}

export interface UserProfileModel extends UserProfileProps, Document {
  createdAt: Date;
  updatedAt: Date;
}
