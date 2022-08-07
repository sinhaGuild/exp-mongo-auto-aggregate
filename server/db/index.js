const mongoose = require("mongoose");
const seed = require("./seed");
const MONGO_URI = process.env.MONGO_URI;

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

    //Seed the database
    seed();
  } catch (error) {
    console.log(`MongoDB connection failed with err ${error}`.bgRed.bold);
    console.log(`Retrying connection... on host ${MONGO_URI}`);
    //keep repeating connect until its sucessful
    setTimeout(connectDB(), 5000);
    // process.exit(1);
  }
};

module.exports = connectDB;
