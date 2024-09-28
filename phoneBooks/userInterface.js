const coloredString = require("./coloredString");
const clear = require("clear");
const readline = require("readline");
const {
  validateEmail,
  validatePhone,
  validateDate,
  validateName
} = require("./validation");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const colors = {
  error: "red",
  success: "green",
  info: "yellow",
  input: "blue",
  data: "cyan"
};

const messages = {
  getQuery: (attribute) => `Please enter contact ${attribute}: `,
  chooseOption: 'Please choose an option: ',
  showingContactsErr: "Couldn't show contacts: the phonebook is empty!",
  showingContactErr: "Couldn't show contact: invalid full name!",
  optionErr: "Please enter a valid option",
  updateErr: (attribute) => `Couldn't update contact's ${attribute}: invalid full name`,
  deleteErr: "Couldn't delete contact: invalid full name",
  saving: "Contact saved successfully!",
  updating: (attribute) => `Contact's ${attribute} updated successfully!`,
  deleting: "Contact deleted successfully!",
  showingContacts: "Here's the list of your contacts!",
  showingContact: "Here's your contact info:",
  showData: (data) => `${data}`,
  options: `Options:
    1: Create new contact
    2: Show all contacts
    3: Find contact
    4: Change phone number
    5: Change email
    6: Delete a contact
    0: Quit
    `,
  emailError: "Invalid email address. Please try again.",
  phoneError: "Invalid phone number. Please enter 10 to 15 digits, without plus sign.",
  dateError: "Invalid date format. Please use DD/MM/YYYY.",
  nameError: "Invalid name. Only letters and spaces are allowed."
};

// Function to retrieve a colored message based on type
const getMessage = (msg, attribute = "") => {
  const messageObj = {
    deleteErr: { text: messages.deleteErr, color: colors.error },
    updateErr: { text: messages.updateErr(attribute), color: colors.error },
    optionErr: { text: messages.optionErr, color: colors.error },
    showingContactsErr: { text: messages.showingContactsErr, color: colors.error },
    showingContactErr: { text: messages.showingContactErr, color: colors.error },
    saving: { text: messages.saving, color: colors.success },
    updating: { text: messages.updating(attribute), color: colors.success },
    deleting: { text: messages.deleting, color: colors.success },
    showingContacts: { text: messages.showingContacts, color: colors.success },
    showingContact: { text: messages.showingContact, color: colors.success },
    options: { text: messages.options, color: colors.info },
    chooseOption: { text: messages.chooseOption, color: colors.input },
    getQuery: { text: messages.getQuery(attribute), color: colors.input },
    showData: { text: messages.showData(attribute), color: colors.data },
    emailError: { text: messages.emailError, color: colors.error },
    phoneError: { text: messages.phoneError, color: colors.error },
    dateError: { text: messages.dateError, color: colors.error },
    nameError: { text: messages.nameError, color: colors.error }
  };

  const selectedMessage = messageObj[msg];

  // Clear the terminal for specific messages
  if (["deleteErr", "updateErr", "optionErr", "showingContactsErr", "showingContactErr", "saving", "updating", "deleting", "showingContacts", "showingContact"].includes(msg)) {
    clear();
  }

  return coloredString(selectedMessage.text, selectedMessage.color);
};

// Function to prompt the user for input
const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const contactFields = [
  "first name",
  "last name",
  "email",
  "phone",
  "birthday",
];

// Function to ask questions and validate responses
const askQuestions = async () => {
  const responses = {};

  for (const field of contactFields) {
    let response;
    let isValid = false;

    do {
      response = (await askQuestion(getMessage('getQuery', field))).trim();

      switch (field) {
        case "email":
          isValid = validateEmail(response);
          if (!isValid) console.log(getMessage("emailError"));
          break;
        case "phone":
          isValid = validatePhone(response);
          if (!isValid) console.log(getMessage("phoneError"));
          break;
        case "birthday":
          isValid = validateDate(response);
          if (!isValid) {
            console.log(getMessage("dateError"));
          } else {
            // Convert the valid date string to a Date object
            const [day, month, year] = response.split('/');
            responses[field] = new Date(year, month - 1, day); // month - 1 because Date months are 0-based
          }
          break;
        case "first name":
        case "last name":
          isValid = validateName(response);
          if (!isValid) console.log(getMessage("nameError"));
          break;
        default:
          isValid = true;
          break;
      }

      if (isValid && field !== "birthday") {
        responses[field] = response;
      }
    } while (!isValid);
  }

  return responses;
};

module.exports = { rl, getMessage, askQuestion, askQuestions };
