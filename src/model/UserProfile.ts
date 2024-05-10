import mongoose from "mongoose";
import { UserProfileModel, languageTypes, statusTypes } from "../types/userProfileTypes";
import { EducationLevelType } from "../types/userProfileTypes";

const UserProfileSchema = new mongoose.Schema<UserProfileModel>({
  about: { type: String, required: false },
  education: [
    {
      educationLevel: { type: String, enum: Object.values(EducationLevelType), required: false },
      endDate: { type: Date, required: false },
      school: { type: String, required: false },
      skills: [{ type: String }],
      startDate: { type: Date, required: false },
    },
  ],
  experience: [
    {
      description: { type: String, required: false },
      endDate: { type: Date, required: false },
      jobTitle: { type: String, required: false },
      skills: [{ type: String }],
      startDate: { type: Date, required: false },
    },
  ],
  language: {
    type: [
      {
        type: String,
        enum: Object.values(languageTypes),
        required: false,
      },
    ],
    default: [languageTypes.Spanish],
  },
  linkedIn: { type: String, required: false },
  skills: [{ type: String, required: false }],
  hobbies: [{ type: String, required: false }],
  status: {
    type: String,
    enum: Object.values(statusTypes),
    required: false,
    default: statusTypes.Available,
  },
  userId: { type: mongoose.SchemaTypes.ObjectId, required: false },
});

UserProfileSchema.set("toObject", { virtuals: true });
UserProfileSchema.set("toJSON", { virtuals: true });

export default mongoose.model<UserProfileModel>("UserProfile", UserProfileSchema);
