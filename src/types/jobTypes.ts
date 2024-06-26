import { ObjectId, Document } from "mongoose";

export const JobType = ["remote", "in-office", "hybrid"] as const;
export type JobType = (typeof JobType)[number];

export interface jobLocation {
  city: string;
  country: string;
  state: string;
}

export interface salaryRangeType {
  minSalary: number;
  maxSalary: number;
}

export interface workExperience {
  minExperience: number;
  maxExperience: number;
}

export interface currency {
  symbol: string;
  code: string;
}

export enum jobCategory {
  Business = "business",
  Law = "law",
  Medical = "medical",
  Service = "service",
  Technology = "technology",
}

export interface JobProps {
  active?: string;
  benefits?: string[];
  category?: jobCategory;
  companyId?: ObjectId;
  description?: string;
  hasProbationPeriod?: boolean;
  jobId: String;
  location?: jobLocation;
  optionalSkills?: string[];
  probationDuration?: number;
  recruiterId?: ObjectId;
  requiredSkills?: string[];
  salary?: salaryRangeType;
  title: string;
  workExperience: workExperience;
}

export interface JobModel extends JobProps, Document {
  applicants: number;
  createdAt: Date;
  updatedAt: Date;
}

