import mongoose, { Types } from "mongoose";
import { jobModel, jobCategory } from "../types/jobTypes";

const jobSchema = new mongoose.Schema<jobModel>(
  {
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
    description: { type: String, required: false },
    hasProbationPeriod: { type: Boolean, required: false, default: false },
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
    requirdSkills: {
      type: [String],
      default: [],
      required: false,
    },
    salary: {
      minSalary: {
        type: Number,
        required: true,
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
        required: true,
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

jobSchema.set("toObject", { virtuals: true });
jobSchema.set("toJSON", { virtuals: true });

export default mongoose.model<jobModel>("Job", jobSchema);
