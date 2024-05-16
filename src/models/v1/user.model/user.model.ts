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
    password: { salt: String, hash: String },
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "SUPERADMIN", "ADMIN"],
      required: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "organization",
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
const user = mongoose.model("user", userSchema);

export default user;
