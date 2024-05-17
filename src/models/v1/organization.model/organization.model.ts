// Import the mongoose module
import mongoose, { Schema } from "mongoose";

// Define a new Mongoose schema for an organization
const organizationSchema = new mongoose.Schema(
  {
    organizationName: { type: String, required: true },
    adminName: { type: String, required: true },
    organizationType: { type: String, required: true },
    organizationEmail: { type: String, required: true, unique: true },
    organizationAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    organizationWebsite: { type: String },
    organizationPhone: { type: String, required: true },
    affiliations: { type: String },
    organizationRegistrationInfo: { type: String, required: true },
    organizationVision: { type: String, required: true },
    socialMediaProfiles: [{ type: String }],
    organizationLogo: { type: String, required: true },
    alternateNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    planType: {
      type: String,
      enum: ["BASIC", "ADVANCED", "ENTERPRISE"],
    },
    tanentId: {
      type: Schema.Types.ObjectId,
      ref: "tenant",
    },
  },
  { timestamps: true }
);

// Create a Mongoose model from the schema
export const Organization = mongoose.model("organization", organizationSchema);

