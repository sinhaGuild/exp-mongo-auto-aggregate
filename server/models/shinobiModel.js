const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const clanSchema = new Schema({
  name: {
    type: String,
    required: [true, "Which clan?"],
  },
  population: Number,
});

const villageSchema = new Schema({
  name: {
    type: String,
    required: [true, "Which Village?"],
  },
  country: String,
});

const jutsuSchema = new Schema({
  name: {
    type: String,
    required: [true, "Jutsu Name?"],
  },
  description: String,
  rank: Number,
});

const shinobiSchema = new Schema({
  shinobi_name: String,
  designation: String,
  clan: clanSchema,
  village: villageSchema,
  jutsu: [jutsuSchema],
});

const mShinobi = model("Shinobi", shinobiSchema);
const mClan = model("Clan", clanSchema);
const mVillage = model("Village", villageSchema);
const mJutsu = model("Jutsu", jutsuSchema);

module.exports = {
  mShinobi,
  mClan,
  mVillage,
  mJutsu,
};
