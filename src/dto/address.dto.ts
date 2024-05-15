import { ObjectId } from "mongoose";

export interface address {
  _id: ObjectId;
  street: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  country: string;
}
