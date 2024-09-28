const mongoose = require("mongoose");
const Tool = require("./Tool");
const Material = require("./Material");

const messages = require("../allMessages");
const findByName = require("../utils/findByName");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

// Method to use an item
userSchema.methods.useTool = async function (toolName) {
  const tool = await findByName(Tool, toolName);

  if (!tool) {
    throw new Error(messages.error.searchFail('Tool', toolName));
  }

  try {
    await tool.useTool(this.name);

    if (!tool.borrowedBy.includes(this._id)) {
      tool.borrowedBy.push(this._id);
    }

    await tool.save();
  } catch (err) {
    throw new Error(messages.error.usageFail(toolName, err));
  }
};

// Return the list of all tools used by that user
userSchema.methods.usedTools = async function () {
  return await Tool.find({ borrowedBy: this._id }).populate("borrowedBy");
};


// Specify amount and type of material, what tools you used
userSchema.methods.buildSomething = async function (tools, materials) {
  for (let toolName of tools) {
    await this.useTool(toolName);
  }

  for (let {name, quantity} of materials) {
    const material = await findByName(Material, name);

    if (!material) {
      throw new Error(messages.error.searchFail('Material', material.name));
    }

    await material.use(quantity, this.name);
    await material.save();
  }
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
