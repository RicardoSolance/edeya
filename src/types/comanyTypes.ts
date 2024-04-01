import { ObjectId, Document } from "mongoose";
import { UserType } from "./userTypes";

export interface CompanyProps {
  about?: string;
  address?: Address;
  companyName: string;
  companyEmail: string;
  companyType?: string;
  designation: string;
  industryType?: string;
  logoUrl?: string;
  totalEmployees?: number;
  companyId?: ObjectId;
  website?: string;
  password: string;
  recruiters: ObjectId[];
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

export interface CompanyModel extends CompanyProps, Document {
  jobPostsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}
