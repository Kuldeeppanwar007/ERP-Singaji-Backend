// Import the mongoose module
import mongoose from "mongoose";

// Define a new Mongoose schema for an organization
const organizationSchema = new mongoose.Schema(
  {
    organizationName: { type: String, required: true },
    organizationType: { type: String, required: true },
    organizationEmail: { type: String, required: true, unique: true },
    organizationAddress: { type: String, required: true },
    organizationWebsite: { type: String, required: true },
    organizationPhone: { type: String, required: true },
    affiliations: { type: String, required: true },
    organizationRegistrationInfo: { type: String, required: true },
    organizationVision: { type: String, required: true },
    socialMediaProfiles: [{ type: String, required: true }],
    organizationLogo: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECT"],
      default: "PENDING",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    tanentId: {
      type: mongoose.Schema.ObjectId,
      ref: "tenant",
    },
  },
  { timestamps: true }
);

// Create a Mongoose model from the schema
const organization = mongoose.model("organization", organizationSchema);

// Export the model for use in other modules
export default organization;