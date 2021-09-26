const mongoose = require("mongoose");
//MAKING A CNNECTION TO DB

const connectToDB = () => {
  //const URL = 'mongodb://{username}:{password}@{server-address}:{port}/{db}';
  const URL = "mongodb://localhost:27017/eduonix-library-management-system";

  mongoose.connect(URL);

  const db = mongoose.connection;

  db.on("connected", function () {
    console.log("Hi, I am connected to MONGO DB", URL);
  });
  db.on("error", function () {
    console.error("Could not connect to MongoDB", error.message);
  });
};
module.exports = connectToDB;
