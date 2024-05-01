import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

function mongooseConnection() {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to Database");
    }).catch((err) => {
      console.log(err);
    });
}

export { mongooseConnection };