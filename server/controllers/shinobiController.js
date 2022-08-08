const { mShinobi, shinobiSchema } = require("../models/shinobiModel");
const aggregateShinobis = require("../db/pipeline/aggShinobis");

const createShinobi = async (req, res) => {
  const shinobi = await req.body;

  try {
    const results = await mShinobi.insertMany(shinobi);
    await aggregateShinobis();
    res.status(200).json({
      msg: `Success`,
      data: results,
    });
  } catch (error) {
    res.status(400).json({
      msg: `Create Shinobi failed with err ${error}`,
    });
  }
};

const getAllShinobi = async (req, res) => {
  try {
    const allShinobi = await mShinobi.find({});
    res.status(200).json({
      msg: "Success",
      data: allShinobi,
    });
  } catch (error) {
    res.status(400).json({
      msg: `GET Shinobi failed with ${error}`,
    });
  }
};

module.exports = {
  createShinobi,
  getAllShinobi,
};
