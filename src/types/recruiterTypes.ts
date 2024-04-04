import { ObjectId, Document } from "mongoose";

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
