import { ObjectId, Document } from "mongoose";

export interface ITenant extends Document {
  tenantName: string;
  userName: string;
  password: string;
  host: string;
  port: string;
  limit: number;
}
