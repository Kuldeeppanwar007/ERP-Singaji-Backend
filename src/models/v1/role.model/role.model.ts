// src/models/tenant/Role.js
import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: [String],
    required: true,
  },
  description: String,
  // organizationId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Organization",
  //   required: true,
  // },
});

export const Role = mongoose.model("Role", roleSchema);
