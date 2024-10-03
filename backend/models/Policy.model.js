import mongoose from "mongoose";

const PolicyReadSchema = new mongoose.Schema({
  user: { type: String, required: true },  // Referencing User model
  policyId: { type: Number, required: true },
  policyName: { type: String, required: true },
  readAt: { type: Date, default: Date.now },
});

export const PolicyRead = mongoose.model('PolicyRead', PolicyReadSchema);