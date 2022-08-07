const mongoose = require("mongoose");
const { clan, jutsu, village } = require("./seedDB2");
const shinobi = require("./seedShinobi");
const {
  clanModel,
  jutsuModel,
  villageModel,
  shinobiModel,
  ninjaModel,
} = require("../models/shinobiModel");
const MONGO_URI = process.env.MONGO_URI;

const seedDB = async () => {
  await shinobiModel.deleteMany({});
  await villageModel.deleteMany({});
  await jutsuModel.deleteMany({});
  await clanModel.deleteMany({});
  await ninjaModel.deleteMany({});
  console.log(`Reset Complete.`);

  await clanModel.insertMany(clan);
  console.log(`Clans inserted.`);
  await jutsuModel.insertMany(jutsu);
  console.log(`Jutsus inserted.`);
  await villageModel.insertMany(village);
  console.log(`Villages inserted.`);
  await shinobiModel.insertMany(shinobi);
  console.log(`Shinobis inserted.`);
  await shinobiModel.aggregate([
    {
      $lookup: {
        from: "clans",
        localField: "clan.name",
        foreignField: "name",
        as: "clan",
      },
    },
    {
      $lookup: {
        from: "villages",
        localField: "village.name",
        foreignField: "name",
        as: "village",
      },
    },
    {
      $lookup: {
        from: "jutsus",
        localField: "jutsu.name",
        foreignField: "name",
        as: "jutsu",
      },
    },
    {
      $merge: {
        into: "shinobis",
        on: "_id",
        whenMatched: "replace",
        whenNotMatched: "insert",
      },
    },
  ]);
  console.log(`Aggregation Complete.`);

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
    seedDB();
  } catch (error) {
    console.log(`MongoDB connection failed with err ${error}`.bgRed.bold);
    console.log(`Retrying connection... on host ${MONGO_URI}`);
    //keep repeating connect until its sucessful
    setTimeout(connectDB(), 5000);
    // process.exit(1);
  }
};

module.exports = connectDB;
