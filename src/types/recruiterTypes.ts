import { ObjectId, Document } from "mongoose";
import { UserType } from "./userTypes";

export interface RecruiterProps {
  about?: string;
  address?: Address;
  companyName: string;
  companyEmail: string;
  companyType?: string;
  designation: string;
  industryType?: string;
  logoUrl?: string;
  totalEmployees?: number;
  recruiterId?: ObjectId;
  website?: string;
  password: string;
  role: UserType;
}

export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  country: string;
  pincode: string;
  province: string;
}

export interface RecruiterModel extends RecruiterProps, Document {
  jobPostsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}
