const {
  addNewContact,
  updateContactAttribute,
  removeContact,
  showContacts,
  showContactInfo,
} = require("./optionsFuncs");

const { rl, getMessage, askQuestion } = require("./userInterface");
const clear = require("clear");

const displayMenu = async () => {
  console.log(getMessage("options"));

  const message = getMessage("chooseOption");
  const option = await askQuestion(message);

  switch (option) {
    case "1":
      await addNewContact();
      break;
    case "2":
      await showContacts();
      break;
    case "3":
      await showContactInfo();
      break;
    case "4":
    case "5":
      // Dynamically passing attribute to update
      const attribute = option === "4" ? "phone" : "email";
      await updateContactAttribute(attribute);
      break;
    case "6":
      await removeContact();
      break;
    case "0":
      clear();
      rl.close();
      return;
    default:
      console.log(getMessage("optionErr"));
      break;
  }

  await displayMenu();
};

clear();
displayMenu();
