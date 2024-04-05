import mongoose from "mongoose";
import { VALID_EMAIL } from "../helpers/utils";
import { UserProps, userTypes } from "../types/userTypes";

const userSchema = new mongoose.Schema<UserProps>({
  active: { type: Boolean, default: false },
  avatar: { type: String, required: false, trim: true },
  dateOfBirth: { type: Date, required: false },
  email: { type: String, required: true, index: true, unique: true, lowercase: true, trim: true, match: VALID_EMAIL },
  gender: { type: String, required: false, default: "unknown" },
  name: { type: String, required: true, lowercase: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, required: false },
  role: { type: String, required: true, enum: userTypes, default: "jobSeeker" },
  surname: { type: String, required: true, lowercase: true },
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export default mongoose.model<UserProps>("User", userSchema);
