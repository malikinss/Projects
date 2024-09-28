const Contact = require("./Contact");
const { getMessage, askQuestion, askQuestions } = require("./userInterface");
const { validateEmail, validatePhone } = require("./validation");

const contacts = [];

// Check if the contact list is empty
const isContactListEmpty = () => contacts.length === 0;

// Gather data for a new contact
const collectContactData = async () => {
  const responses = await askQuestions();
  return {
    first: responses["first name"],
    last: responses["last name"],
    email: responses["email"],
    phone: responses["phone"],
    birth: responses["birthday"],
  };
};

// Add a new contact
const addNewContact = async () => {
  const newContact = new Contact(await collectContactData());
  contacts.push(newContact);
  console.log(getMessage("saving"));
};

// Get the index of a contact by full name
const getContactIndexByFullName = async () => {
  if (isContactListEmpty()) {
    console.log(getMessage("showingContactsErr"));
    return -2;
  }

  const givenLastName = (await askQuestion(getMessage("getQuery", "last name")))
    .trim()
    .toLowerCase();
  const givenFirstName = (
    await askQuestion(getMessage("getQuery", "first name"))
  )
    .trim()
    .toLowerCase();

  return contacts.findIndex(
    (person) =>
      person.lastName.trim().toLowerCase() === givenLastName &&
      person.firstName.trim().toLowerCase() === givenFirstName
  );
};

// Update contact attribute (phone or email)
const updateContactAttribute = async (attribute) => {
  const contactIndex = await getContactIndexByFullName();

  if (contactIndex === -1) {
    console.log(getMessage("updateErr", attribute));
    return;
  }

  if (contactIndex === -2) return;

  const validators = {
    phone: validatePhone,
    email: validateEmail,
  };

  let isValid = false;
  let answer;

  do {
    answer = await askQuestion(getMessage("getQuery", attribute));
    isValid = validators[attribute](answer);
    if (!isValid) {
      console.log(getMessage(`${attribute}Error`));
    }
  } while (!isValid);

  contacts[contactIndex][
    `update${attribute.charAt(0).toUpperCase() + attribute.slice(1)}`
  ](answer);
  console.log(getMessage("updating", attribute));
};

// Remove a contact
const removeContact = async () => {
  const contactIndexToDelete = await getContactIndexByFullName();

  if (contactIndexToDelete === -1) {
    console.log(getMessage("deleteErr"));
    return;
  }

  if (contactIndexToDelete === -2) return;

  contacts.splice(contactIndexToDelete, 1);
  console.log(getMessage("deleting"));
};

// Show contact information
const showContactInfo = async () => {
  const contactIndexToShow = await getContactIndexByFullName();

  if (contactIndexToShow === -1) {
    console.log(getMessage("showingContactErr"));
    return;
  }

  if (contactIndexToShow === -2) return;

  console.log(getMessage("showingContact"));
  console.log(getMessage("showData", contacts[contactIndexToShow].getInfo()));
};

// Show all contacts
const showContacts = async () => {
  if (isContactListEmpty()) {
    console.log(getMessage("showingContactsErr"));
    return;
  }

  const sortedContacts = contacts.sort((a, b) => {
    const lastNameComparison = a.lastName.localeCompare(b.lastName);
    return lastNameComparison !== 0
      ? lastNameComparison
      : a.firstName.localeCompare(b.firstName);
  });

  console.log(getMessage("showingContacts"));
  sortedContacts.forEach((contact) => {
    console.log(
      getMessage("showData", `${contact.lastName} ${contact.firstName}`)
    );
  });
  console.log();
};

module.exports = {
  addNewContact,
  updateContactAttribute,
  removeContact,
  showContacts,
  showContactInfo,
};
