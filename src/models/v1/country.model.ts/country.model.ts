import mongoose, { Schema, model } from "mongoose";


// Creating country Schema
const countrySchema =  new Schema({
    countryName: {
        type: String,
        require: true
    }
})

// Country model
const Country = mongoose.model("Country", countrySchema)

export default Country