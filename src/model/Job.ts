import mongoose, { Types } from "mongoose";
import { JobModel, jobCategory } from "../types/jobTypes";

const jobSchema = new mongoose.Schema<JobModel>(
  {
    active: { type: Boolean, required: false, default: true },
    applicants: {
      type: Number,
      default: 0,
      min: 0,
    },
    benefits: { type: String, required: false },
    category: {
      type: String,
      required: false,
      enum: jobCategory,
    },
    companyId: { type: mongoose.SchemaTypes.ObjectId, ref: "Company", required: true },
    description: { type: String, required: false },
    hasProbationPeriod: { type: Boolean, required: false, default: false },
    jobId: { type: String, required: true },
    location: {
      city: {
        type: String,
        maxlength: 50,
        required: true,
      },
      province: {
        type: String,
        maxlength: 50,
        required: true,
      },
      country: {
        type: String,
        maxlength: 100,
        required: false,
      },
    },
    optionalSkills: {
      type: [String],
      default: [],
      required: false,
    },
    probationDuration: {
      type: Number,
      required: false,
    },
    recruiterId: {
      type: Types.ObjectId,
      required: false,
    },
    requiredSkills: {
      type: [String],
      default: [],
      required: false,
    },
    salary: {
      minSalary: {
        type: Number,
        required: false,
        min: 0,
        validate: [
          {
            validator: Number.isInteger,
            msg: "salary should be an integer",
          },
        ],
      },
      maxSalary: {
        type: Number,
        required: false,
        min: 0,
        validate: [
          {
            validator: Number.isInteger,
            msg: "salary should be an integer",
          },
        ],
      },
    },

    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    workExperience: {
      minExperience: {
        type: Number,
        required: false,
      },
      maxExperience: {
        type: Number,
        required: false,
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

jobSchema.virtual("Company", {
  ref: "Company",
  foreignField: "_id",
  localField: "companyId",
});

jobSchema.virtual("Recruiter", {
  ref: "Recruiter",
  foreignField: "_id",
  localField: "recruiterId",
});

jobSchema.set("toObject", { virtuals: true });
jobSchema.set("toJSON", { virtuals: true });

export default mongoose.model<JobModel>("Job", jobSchema);
