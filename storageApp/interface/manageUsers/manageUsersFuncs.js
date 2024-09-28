const User = require("../../models/User");

const { askQuestion } = require("../../utils/askQuestion");
const findByName = require("../../utils/findByName");
const messages = require("../../allMessages");

const creatingQuestions = require("../manageDocs/creatingQuestions");


const buildSomethingToolMenu = require("./buildSomething/buildSomethingToolMenu");
const buildSomethingMaterialMenu = require("./buildSomething/buildSomethingMaterialMenu");

const findUser = async () => {
  const name = await askQuestion(messages.input.field('User', "name"));
  const user = await findByName(User, name);

  if (!user) {
    throw new Error(messages.error.searchFail('User', name));
  }

  return user;
};

const createUser = async () => {
  try {
    console.log(messages.title.create);

    const answers = await creatingQuestions(["name", "age"], 'User');
    const newUser = new User(answers);
    await newUser.save();

    console.log(messages.success.create('User', newUser.name));
  } catch (err) {
    console.error(messages.error.createFail(err));
  }
};


const deleteUser = async () => {
    try {
      console.log(messages.title.delete);
      const user = await findUser();
      await User.findByIdAndDelete(user._id);
      console.log(messages.success.delete('User', user.name));
    } catch (err) {
      console.error(messages.error.deleteFail(err));
    }
};


const showUser = async () => {
    try {
      console.log(messages.title.info);
      const user = await findUser();

      const info = {
        name: user.name,
        age: user.age,
        usedTools: user.usedTools(),
      }

      console.log(messages.success.info('User', user.name));
      console.log(info);
    } catch (err) {
      console.error(messages.error.showFail(err));
    }
};


const buildSomething = async () => {
  try {
    console.log(messages.title.build);

    const user = await findUser();

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
