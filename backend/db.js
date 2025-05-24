const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://chavdaurvi463:ltI72WasTSyYOjwg@cluster0.jvyg3pl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectMongo = async () => {
  try {

    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB!");

  } catch (error) {
    console.error("Error connecting to MongoDB: ", error.message);
  }

};

module.exports = connectMongo;