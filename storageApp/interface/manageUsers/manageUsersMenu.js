const clear = require("clear");
const { askQuestion } = require("../../utils/askQuestion");
const messages = require("../../allMessages");
const pause = require("../../utils/pause");

const {
  createUser,
  deleteUser,
  showUser,
  buildSomething,
} = require("./manageUsersFuncs");

const manageUsersMenu = async () => {
  while (true) {
    clear();
    console.log(messages.menu.manageUsersMenu);

    const choice = await askQuestion(messages.input.optionChoice);

    switch (choice) {
      case "1":
        await createUser();
        await pause(1300);
        break;
      case "2":
        await deleteUser();
        await pause(1300);
        break;
      case "3":
        await showUser();
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
