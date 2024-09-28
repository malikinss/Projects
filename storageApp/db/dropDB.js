const Item = require("../models/Item");
const Tool = require("../models/Tool");
const Material = require("../models/Material");
const User = require("../models/User");

const dropDB = async () => {
  //console.log("Drop DB...");
  try {
    await Item.collection.drop();
    await Tool.collection.drop();
    await Material.collection.drop();
    await User.collection.drop();
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = dropDB;