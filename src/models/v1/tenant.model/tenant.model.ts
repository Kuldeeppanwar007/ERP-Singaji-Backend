// Import the mongoose module
import mongoose from "mongoose";

// Schema for tenant details in master database
const tenantSchema = new mongoose.Schema({
  host: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    hash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  limit: {
    type: Number,
    required: true,
    default: 1,
  },
  port: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Tenant = mongoose.model("tenant", tenantSchema);

export default Tenant;
