const { mShinobi } = require("../../models/shinobiModel");

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
          // on: "_id",
          whenMatched: "merge",
          whenNotMatched: "insert",
        },
      },
    ]);
    console.log(`Aggregation Complete.`);
  } catch (error) {
    console.log(`Aggregation failed with error ${error}`);
  }
  // finally {
  //   return;
  // }
};

module.exports = aggregateShinobis;
