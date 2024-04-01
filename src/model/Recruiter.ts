import mongoose, { Types } from "mongoose";
import { userTypes } from "../types/userTypes";
import { RecruiterProps } from "../types/recruiterTypes";
import { VALID_EMAIL } from "../helpers/utils";

const recruiterSchema = new mongoose.Schema<RecruiterProps>({
  active: { type: Boolean, default: true },
  avatar: { type: String, required: false, trim: true },
  company: { type: Types.ObjectId, ref: "Company" },
  email: { type: String, required: true, index: true, unique: true, lowercase: true, trim: true, match: VALID_EMAIL },
  name: { type: String, required: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: { type: String, required: true, enum: userTypes, default: "recruiter" },
});

recruiterSchema.set("toObject", { virtuals: true });
recruiterSchema.set("toJSON", { virtuals: true });

export default mongoose.model<RecruiterProps>("Recruiter", recruiterSchema);
