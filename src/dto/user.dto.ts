import mongoose from "mongoose";

export interface IUser {
  name: string;
  password: string;
  email: string;
  role: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  tenantId: mongoose.Types.ObjectId;
}
