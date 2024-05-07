// Import the mongoose module
import mongoose from "mongoose";

// Define a new Mongoose schema for an organization
const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    website: { type: String, required: true },
    affiliations: { type: String },
    registrationInfo: { type: String, required: true },
    vision: { type: String },
    socialMediaProfiles: [{ type: String }],
    logo: { type: String },
    dbURL: { type: String, required: true },
});

// Create a Mongoose model from the schema
const OrganizationModel = mongoose.model("organization", organizationSchema);

// Export the model for use in other modules
export default OrganizationModel;