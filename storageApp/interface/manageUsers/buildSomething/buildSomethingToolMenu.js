const { askQuestion } = require("../../../utils/askQuestion");
const messages = require("../../../allMessages");

const buildSomethingToolMenu = async () => {
  const tools = [];

  while (true) {
    console.log(messages.menu.buildSomethingMenu('Tool'));

    const choice = await askQuestion(messages.input.optionChoice);

    switch (choice) {
      case "1":
        const name = await askQuestion(messages.input.field('Tool', "name"));
        tools.push(name);
        break;
      case "2":
        return tools;
      default:
        console.log(messages.error.invalidInput);
        break;
    }
  }
};

module.exports = buildSomethingToolMenu;
