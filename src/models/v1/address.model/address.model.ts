import mongoose, { Schema } from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
