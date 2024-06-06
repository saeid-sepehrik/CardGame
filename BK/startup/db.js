const mangoose = require("mongoose");
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:main");
const config = require("config");

module.exports = function () {
  // const uri =
  //   "mongodb+srv://saeidsepehrik:amVV9AfRfMC2my4u@giverole.gsgojrb.mongodb.net/?retryWrites=true&w=majority&appName=giveRole";
  // const client = new MongoClient(uri);
  // client.connect().then(() => {
  //   console.info("application connected to db");
  // });

  // const database = client.db("goveRole");
  // console.log(database);
  mangoose
    .connect(
      "mongodb+srv://saeidsepehrik:amVV9AfRfMC2my4u@giverole.gsgojrb.mongodb.net/?retryWrites=true&w=majority&appName=giveRole"
    )
    .then(() => console.info("application connected to db"))
    .catch((err) => console.log("could not connect to db", err));
};
