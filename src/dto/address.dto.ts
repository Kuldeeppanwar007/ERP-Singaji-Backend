import mongoose from "mongoose";
import { ICountry } from "./country.dto";

export interface IAddress extends Document {
  street: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  country: ICountry | mongoose.Types.ObjectId;
}
