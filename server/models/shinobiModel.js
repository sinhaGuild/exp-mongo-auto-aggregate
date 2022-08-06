const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    lowercase: true,
    required: [true, "Jutsu Name?"],
  },
  description: String,
  rank: Number,
});

const shinobiSchema = new Schema({
  shinobi_name: String,
  designation: String,
  clan: {
    type: clanSchema,
    default: {},
  },
  village: villageSchema,
  jutsu: [jutsuSchema],
});

const shinobiModel = mongoose.model("Shinobi", shinobiSchema);
const clanModel = mongoose.model("Clan", clanSchema);
const villageModel = mongoose.model("Village", villageSchema);
const jutsuModel = mongoose.model("Jutsu", jutsuSchema);

module.exports = {
  shinobiModel,
  clanModel,
  villageModel,
  jutsuModel,
};
