// Import the mongoose module
import mongoose from "mongoose";

// Define a new Mongoose schema for an organization
const organizationSchema = new mongoose.Schema({
    organizationName: { type: String, required: true },
    organizationType: { type: String, required: true },
    organizationEmail: { type: String, required: true, unique: true },
    organizationAddress: { type: String, required: true },
    organizationWebsite: { type: String, required: true },
    organizationPhone: { type: Number, required: true },
    affiliations: { type: String },
    organizationRegistrationInfo: { type: String, required: true },
    organizationVision: { type: String },
    socialMediaProfiles: [{ type: String }],
    organizationLogo: { type: String },
    isVerified : {type:Boolean},
    isActive: {type: Boolean},
    isDeleted:{type: Boolean},
    status: {type: String}
});

// Create a Mongoose model from the schema
const organization = mongoose.model("organization", organizationSchema);

// Export the model for use in other modules
export default organization;