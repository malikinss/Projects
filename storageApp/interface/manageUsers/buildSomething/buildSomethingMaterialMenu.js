const { askQuestion } = require("../../../utils/askQuestion");
const messages = require("../../../allMessages");
const creatingQuestions = require("../../manageDocs/creatingQuestions");

const buildSomethingMaterialMenu = async () => {
  const materials = [];

  while (true) {
    console.log(messages.menu.buildSomethingMenu('Material'));

    const choice = await askQuestion(messages.input.optionChoice);

    switch (choice) {
      case "1":
        const material = await creatingQuestions(['name', 'quantity'], 'Material');
        materials.push(material);
        break;
      case "2":
        return materials;
      default:
        console.log(messages.error.invalidInput);
        break;
    }
  }
};

module.exports = buildSomethingMaterialMenu;
