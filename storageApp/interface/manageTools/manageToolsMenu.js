const Tool = require("../../models/tool");

const clear = require("clear");
const { askQuestion } = require("../../utils/askQuestion");
const pause = require("../../utils/pause");
const messages = require("../../allMessages");

const createElement = require("../manageElements/createElement");
const deleteElement = require("../manageElements/deleteElement");
const showElement = require("../manageElements/showElement");
const fixTool = require("./fixTool");

const manageToolsMenu = async () => {
  while (true) {
    await pause(1500);
    clear();
    console.log(messages.menu.manageToolsMenu);

    const choice = await askQuestion(messages.input.optionChoice);

    switch (choice) {
      case "1":
        await createElement(Tool, ["name", "cost", "usage", "condition"], 'Tool');
        await pause(1300);
        break;
      case "2":
        await deleteElement(Tool, 'Tool');
        await pause(1300);
        break;
      case "3":
        await showElement(Tool, 'Tool');
        await pause(3000);
        break;
      case "4":
        await fixTool();
        await pause(1300);
        break;
      case "5":
        return;
      default:
        console.log(messages.error.invalidInput);
        await pause(1300);
        break;
    }
  }
};

module.exports = manageToolsMenu;
