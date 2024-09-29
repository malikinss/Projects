const clear = require("clear");
const { askQuestion } = require("../../utils/askQuestion");
const messages = require("../../allMessages");
const pause = require("../../utils/pause");

const createElement = require("../manageElements/createElement");
const deleteElement = require("../manageElements/deleteElement");
const showElement = require("../manageElements/showElement");
const addMaterialQuantity = require("./addMaterialQuantity");


const {
  createMaterial,
  deleteMaterial,
  showMaterial,
} = require("./manageMaterialsFuncs");

const manageMaterialsMenu = async () => {
  while (true) {
    clear();
    console.log(messages.menu.manageMaterialsMenu);

    const choice = await askQuestion(messages.input.optionChoice);

    switch (choice) {
      case "1":
        await createMaterial();
        await pause(1300);
        break;
      case "2":
        await deleteMaterial();
        await pause(1300);
        break;
      case "3":
        await showMaterial();
        await pause(3000);
        break;
      case "4":
        await addMaterialQuantity();
        await pause(1500);
        break;
      case "5":
        return;
      default:
        console.log(messages.error.invalidInput);
        await pause(1250);
        break;
    }
  }
};

module.exports = manageMaterialsMenu;
