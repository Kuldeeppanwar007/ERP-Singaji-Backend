import { ObjectId } from "mongoose";

export interface address {
  
  street: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  country: string;
}
