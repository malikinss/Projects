const mongoose = require("mongoose");
const Item = require("./Item");

const messages = require("../allMessages");

const materialSchema = new mongoose.Schema({
  supplier: { type: String, required: true },
  quality: { type: String, required: true },
});

// Method to use the material
materialSchema.methods.use = async  function (quantity, userName) {
  if (quantity <= this.amount) {
    this.amount -= quantity;

    console.log(messages.success.itemUsage("Material", this.name, userName));
    console.log(messages.success.amountRemain("Material", this.name, this.amount));

    await this.save();
  } else {
    throw new Error(messages.error.amountFail(this.name));
  }
};

const Material = mongoose.models.Material || Item.discriminator("Material", materialSchema);
module.exports = Material;
