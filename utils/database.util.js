require("dotenv").config();
const mongoose = require("mongoose");

function mongooseConnection() {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to Database");
    }).catch((err) => {
      console.log(err);
    });
}

module.exports = { mongooseConnection };
