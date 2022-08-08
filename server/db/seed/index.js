const { clan, jutsu, village } = require("./seedStore");
const shinobi = require("./seedShinobi");
const {
  mClan,
  mJutsu,
  mVillage,
  mShinobi,
} = require("../../models/shinobiModel");
const MONGO_URI = process.env.MONGO_URI;

//Seed Function
const seedDB = async () => {
  //reset database
  await mShinobi.deleteMany({});
  await mVillage.deleteMany({});
  await mJutsu.deleteMany({});
  await mClan.deleteMany({});
  console.log(`Reset Complete.`);

  await mClan.insertMany(clan);
  console.log(`Clans inserted.`);

  await mJutsu.insertMany(jutsu);
  console.log(`Jutsus inserted.`);

  await mVillage.insertMany(village);
  console.log(`Villages inserted.`);

  await mShinobi.insertMany(shinobi);
  console.log(`Shinobis inserted.`);

  //aggregate Shinobi Collection
  await aggregateShinobis();

  console.log(`Seeding Complete. Exiting..`);
};

const aggregateShinobis = async () => {
  try {
    const aggCursor = await mShinobi.aggregate([
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
          // on: "name",
          whenMatched: "merge",
          whenNotMatched: "insert",
        },
      },
    ]);
    console.log(`Aggregation Complete.`);
  } catch (error) {
    console.log(`Aggregation failed with error ${error}`);
  } finally {
    return;
  }
};

module.exports = seedDB;
