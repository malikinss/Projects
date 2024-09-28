const clear = require("clear");
const { askQuestion } = require("../../utils/askQuestion");
const pause = require("../../utils/pause");
const messages = require("../../allMessages");

const {
  createTool,
  deleteTool,
  showTool,
  fixTool,
} = require("./manageToolsFuncs");

const manageToolsMenu = async () => {
  while (true) {
    await pause(1500);
    clear();
    console.log(messages.menu.manageToolsMenu);

    const choice = await askQuestion(messages.input.optionChoice);

    switch (choice) {
      case "1":
        await createTool();
        await pause(1300);
        break;
      case "2":
        await deleteTool();
        await pause(1300);
        break;
      case "3":
        await showTool();
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
