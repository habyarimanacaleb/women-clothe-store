// models/Analytics.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnalytics extends Document {
  type: string; // e.g., 'visit', 'whatsapp', 'auth', 'product:create', 'product:update'
  userId?: string | null;
  ip?: string | null;
  meta?: Record<string, any>;
  createdAt?: Date;
}

const AnalyticsSchema = new Schema<IAnalytics>(
  {
    type: { type: String, required: true },
    userId: { type: String, default: null },
    ip: { type: String, default: null },
    meta: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Analytics: Model<IAnalytics> =
  (mongoose.models.Analytics as Model<IAnalytics>) || mongoose.model<IAnalytics>("UserAnalytics", AnalyticsSchema);

export default Analytics;
