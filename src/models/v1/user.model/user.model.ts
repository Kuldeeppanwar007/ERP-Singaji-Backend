import mongoose, { Schema } from "mongoose";

// Create a user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: { type: Boolean, default: false },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "tenant",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
    timestamps: true,
  }
);

// Create a user model
export const User = mongoose.model("user", userSchema);
