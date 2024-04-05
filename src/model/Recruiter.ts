import mongoose, { Types } from "mongoose";
import { RecruiterModel } from "../types/recruiterTypes";
import { VALID_EMAIL } from "../helpers/utils";
import { userTypes } from "../types/userTypes";

const recruiterSchema = new mongoose.Schema<RecruiterModel>(
  {
    about: { type: String, maxlength: 1000, required: false },
    address: {
      addressLine1: { type: String, maxlength: 100, required: false },
      addressLine2: { type: String, maxlength: 100, required: false },
      city: { type: String, maxlength: 100, required: true },
      province: { type: String, maxlength: 100, required: false },
      country: { type: String, default: "Guinea Ecutorial", maxlength: 100, required: false },
      pincode: { type: String, maxlength: 10 },
    },
    companyEmail: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: VALID_EMAIL,
    },
    companyName: { type: String, maxlength: 100, required: true },
    designation: { type: String, maxlength: 100, required: false },
    industryType: { type: String, maxlength: 100, required: false },
    logoUrl: { type: String, maxlength: 200, required: false },
    jobPostsCount: {
      type: Number,
      default: 0,
      min: 0,
      validate: [
        {
          validator: Number.isInteger,
          message: "Should be an integer",
        },
      ],
      required: false,
    },
    password: { type: String, required: true, select: false },
    recruiterId: { type: Types.ObjectId, required: false },
    role: { type: String, required: true, enum: userTypes, default: "recruiter" },
    totalEmployees: { type: Number, required: false },
    website: { type: String, required: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

recruiterSchema.set("toObject", { virtuals: true });
recruiterSchema.set("toJSON", { virtuals: true });

export default mongoose.model<RecruiterModel>("Recruiter", recruiterSchema);
