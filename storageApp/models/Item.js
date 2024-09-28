const mongoose = require("mongoose");
const messages = require("../allMessages");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true, default: 0 },
  cost: { type: Number, required: true, default: 0 },
});

// Method to calculate worth of the item
itemSchema.methods.worth = function () {
  return this.amount * this.cost;
};

// Method to add new arrival
itemSchema.methods.newArrival = async function (amount, item) {
  this.amount += parseFloat(amount);
  console.log(messages.success.amountRemain(item, this.name, this.amount));
  await this.save();
};

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);
module.exports = Item;
