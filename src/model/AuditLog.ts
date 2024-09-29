import mongoose, { Schema } from "mongoose";
import { AuditLogsTypes } from "../types/auditLogTypes";

const auditLogSchema = new Schema<AuditLogsTypes>({
  action: { type: String, required: true },
  details: { type: String, required: false },
  jobApplicationId: { type: Schema.Types.ObjectId, ref: "JobApplication", required: true },
  timestamp: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

auditLogSchema.set("toObject", { virtuals: true });
auditLogSchema.set("toJSON", { virtuals: true });

export default mongoose.model<AuditLogsTypes>("AuditLog", auditLogSchema);
