import mongoose from "mongoose";
import { VALID_EMAIL } from "../helpers/utils";

const userTypes = ["jobSeeker", "recruiter", "business"] as const;
export type UserType = (typeof userTypes)[number];

export interface User {
  email: string;
  password: string;
  role: UserType;
  active: boolean;
  name: string;
  surname: string;
  profilePhoto: string | null;
  phone: number | null;
  userType: UserType;
}

const userSchema = new mongoose.Schema<User>({
  email: { type: String, required: true, index: true, unique: true, lowercase: true, trim: true, match: VALID_EMAIL },
  password: { type: String, required: true, select: false },
  role: { type: String, required: true, enum: userTypes, default: "jobSeeker" },
  active: { type: Boolean, default: false },
  name: { type: String, required: true, lowercase: true },
  surname: { type: String, required: true, lowercase: true },
  profilePhoto: { type: String, required: false, trim: true },
  phone: { type: String, required: false },
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export default mongoose.model<User>("User", userSchema);
