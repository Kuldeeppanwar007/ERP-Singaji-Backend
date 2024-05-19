import { Document } from "mongoose";

export interface ICountry extends Document {
  countryName: string;
}
