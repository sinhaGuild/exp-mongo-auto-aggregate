const mongoose = require("mongoose");
const seedData = require("./seedDB");
const { shinobiModel } = require("../models/shinobiModel");
const MONGO_URI = process.env.MONGO_URI;

const seedDB = async () => {
  await shinobiModel.deleteMany({});
  await shinobiModel.insertMany(seedData);
  console.log(`Seeding Complete.`);
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB Connected Sucessfully. Host ${conn.connection.host} running on PORT:${conn.connection.port}...`
        .bgCyan.bold
    );

    console.log(`Processing to Seeding..`);
    seedDB().then(() => mongoose.connection.close());
  } catch (error) {
    console.log(`MongoDB connection failed with err ${error}`.bgRed.bold);
    console.log(`Retrying connection... on host ${MONGO_URI}`);
    //keep repeating connect until its sucessful
    setTimeout(connectDB(), 5000);
    // process.exit(1);
  }
};

module.exports = connectDB;
