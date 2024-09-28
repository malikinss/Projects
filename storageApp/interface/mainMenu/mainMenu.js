const { askQuestion } = require("../../utils/askQuestion");
const clear = require("clear");
const pause = require("../../utils/pause");
const messages = require('../../allMessages');

const manageToolsMenu = require("../manageTools/manageToolsMenu");
const manageMaterialsMenu = require("../manageMaterials/manageMaterialsMenu");
const manageUsersMenu = require("../manageUsers/manageUsersMenu");
const manageExit = require("../manageExit/manageExit");


const mainMenu = async () => {
  let counter = 1;
  while (true) {
    await pause(1000);
    clear();

    if (counter === 1) {
      console.log(messages.title.introduction);
      await pause(250);
    }

    ++ counter;

    console.log(messages.menu.mainMenu);

    const choice = await askQuestion(messages.input.optionChoice);

    switch (choice) {
      case "1":
        await manageToolsMenu();
        break;
      case "2":
        await manageMaterialsMenu();
        break;
      case "3":
        await manageUsersMenu();
        break;
      case "4":
        await manageExit();
        break;
      default:
        console.log(messages.error.invalidInput);
        break;
    }
  }
};

module.exports = mainMenu;
