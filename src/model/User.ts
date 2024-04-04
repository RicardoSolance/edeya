import mongoose from "mongoose";
import { VALID_EMAIL } from "../helpers/utils";
import { UserProps, userTypes } from "../types/userTypes";

const userSchema = new mongoose.Schema<UserProps>({
  email: { type: String, required: true, index: true, unique: true, lowercase: true, trim: true, match: VALID_EMAIL },
  password: { type: String, required: true, select: false },
  role: { type: String, required: true, enum: userTypes, default: "jobSeeker" },
  active: { type: Boolean, default: false },
  name: { type: String, required: true, lowercase: true },
  surname: { type: String, required: true, lowercase: true },
  profilePhoto: { type: String, required: false, trim: true },
  phone: { type: String, required: false },
  gender: { type: String, required: false, default: "unknown" },
  dateOfBirth: { type: Date, required: false },
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export default mongoose.model<UserProps>("User", userSchema);
