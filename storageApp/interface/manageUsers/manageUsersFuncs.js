const User = require("../../models/User");

const messages = require("../../allMessages");
const findElement = require("../manageElements/findElement");

const createElement = require("../manageElements/createElement");
const deleteElement = require("../manageElements/deleteElement");
const showElement = require("../manageElements/showElement");


const buildSomethingToolMenu = require("./buildSomething/buildSomethingToolMenu");
const buildSomethingMaterialMenu = require("./buildSomething/buildSomethingMaterialMenu");

const createUser = async () => {
  await createElement(User, ["name", "age"], 'User');
};

const deleteUser = async () => {
  await deleteElement(User, 'User');
}

const showUser = async () => {
  await showElement(User, 'User');
}


const buildSomething = async () => {
  try {
    console.log(messages.title.build);

    const user = await findElement(User, 'User');

    // Loop for Tools
    const tools = await buildSomethingToolMenu();
    

    // Loop for Materials
    const materials = await buildSomethingMaterialMenu();

    await user.buildSomething(tools, materials);
    console.log(messages.success.buildSomething);
  } catch (err) {
    console.error(messages.error.buildFail(err));
  }
};

module.exports = { createUser, deleteUser, showUser, buildSomething };
