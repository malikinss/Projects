const User = require("../../models/User");

const clear = require("clear");
const { askQuestion } = require("../../utils/askQuestion");
const messages = require("../../allMessages");
const pause = require("../../utils/pause");

const createElement = require("../manageElements/createElement");
const deleteElement = require("../manageElements/deleteElement");
const showElement = require("../manageElements/showElement");
const buildSomething = require("./buildSomething/buildSomething");

const manageUsersMenu = async () => {
  while (true) {
    clear();
    console.log(messages.menu.manageUsersMenu);

    const choice = await askQuestion(messages.input.optionChoice);

    switch (choice) {
      case "1":
        await createElement(User, ["name", "age"], 'User');
        await pause(1300);
        break;
      case "2":
        await deleteElement(User, 'User');
        await pause(1300);
        break;
      case "3":
        await showElement(User, 'User');
        await pause(3000);
        break;
      case "4":
        await buildSomething();
        await pause(1300);
        break;
      case "5":
        return;
      default:
        console.log(messages.error.invalidInput);
        break;
    }
  }
};

module.exports = manageUsersMenu;
