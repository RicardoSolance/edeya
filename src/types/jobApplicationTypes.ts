import type { ObjectId, Document } from "mongoose";

export interface JobApplication {
  userId: ObjectId;
  recruiterId: ObjectId;
  jobId: ObjectId;
  status: string;
  dateOfJoining?: Date;
  observation?: string;
}

export enum JobStatus {
  Applied = "applied",
  Shortlisted = "shortlisted",
  Accepted = "accepted",
  Rejected = "rejected",
  Deleted = "deleted",
  Cancelled = "cancelled",
  Finished = "finished",
}

export interface JobApplicationModel extends JobApplication, Document {
  createdAt: Date;
  updatedAt: Date;
}
