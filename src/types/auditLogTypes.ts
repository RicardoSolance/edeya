import { ObjectId, Document } from "mongoose";

export interface AuditLogsTypes extends Document {
  action: string;
  userId: ObjectId;
  jobApplicationId: ObjectId;
  timestamp: Date;
  details: string;
}
