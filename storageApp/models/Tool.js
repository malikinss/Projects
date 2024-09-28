const mongoose = require("mongoose");
const Item = require("./Item");

const messages = require("../allMessages");

const toolSchema = new mongoose.Schema({
  usage: { type: String, required: true },
  borrowedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  condition: { type: Number, required: true, min: 1, max: 100 },
});

// Method to use the tool
toolSchema.methods.useTool = async function (userName) {
  if (this.condition > 15) {
    this.condition -= 10;
    console.log(messages.success.itemUsage("Tool", this.name,userName));

    await this.save();
  } else {
    throw new Error(messages.error.conditionFail(this.name));
  }
};

// Method to fix the tool
toolSchema.methods.fixTool = async function () {
  if (this.condition < 100) {
    this.condition = Math.min(this.condition + 20, 100);
    console.log(messages.success.conditionRemain('Tool', this.name, this.condition));
    await this.save();
  } else {
    throw new Error(messages.error.conditionFail(this.name));
  }
};

const Tool = mongoose.models.Tool || Item.discriminator("Tool", toolSchema);
module.exports = Tool;
