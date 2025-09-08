const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://scienctistshabir:shabir123@cluster0.ijikhut.mongodb.net/mernApp",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected!");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = ConnectDB;
