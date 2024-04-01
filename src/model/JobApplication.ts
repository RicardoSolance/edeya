import mongoose, { Types } from "mongoose";
import { JobApplicationModel, JobStatus } from "../types/jobApplicationTypes";

const JobAppLicationSchema = new mongoose.Schema<JobApplicationModel>(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },

    recruiterId: {
      type: Types.ObjectId,
      required: true,
    },

    jobId: {
      type: Types.ObjectId,
      required: true,
    },

    status: {
      type: String,
      enum: JobStatus,
      default: JobStatus.Applied,
      required: true,
    },

    dateOfJoining: {
      type: Date,
    },

    observation: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

JobAppLicationSchema.set("toObject", { virtuals: true });
JobAppLicationSchema.set("toJSON", { virtuals: true });

export default mongoose.model<JobApplicationModel>("JobAppLication", JobAppLicationSchema);
