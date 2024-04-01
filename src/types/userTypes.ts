import { ObjectId } from "mongoose";

export const userTypes = ["jobSeeker", "recruiter", "business", "super-admin"] as const;
export type UserType = (typeof userTypes)[number];

export type genderType = "man" | "woman" | "unknown";
export interface UserProps {
  active: boolean;
  avatar: string | null;
  dateOfBirth: Date;
  email: string;
  gender: genderType;
  name: string;
  notifications: boolean;
  password: string;
  phone: number | null;
  role: UserType;
  surname: string;
  userType: UserType;
  userProfileId: ObjectId;
}
