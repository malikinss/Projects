const User = require("../../../models/User");

const messages = require("../../../allMessages");
const findElement = require("../../manageElements/findElement");

const buildSomethingToolMenu = require("./buildSomethingToolMenu");
const buildSomethingMaterialMenu = require("./buildSomethingMaterialMenu");

const buildSomething = async () => {
  try {
    console.log(messages.title.build);

    const user = await findElement(User, "User");
    const tools = await buildSomethingToolMenu();
    const materials = await buildSomethingMaterialMenu();
    await user.buildSomething(tools, materials);

    console.log(messages.success.buildSomething);
  } catch (err) {
    console.error(messages.error.buildFail(err));
  }
};

module.exports = buildSomething;