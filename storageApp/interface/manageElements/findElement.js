const messages = require("../../allMessages");
const { askQuestion } = require("../../utils/askQuestion");
const findByName = require("../../utils/findByName");

const findElement = async (Model, item) => {
  const name = await askQuestion(messages.input.field(item, "name"));
  const element = await findByName(Model, name);

  if (!element) {
    throw new Error(messages.error.searchFail(item, name));
  }

  return element;
};

module.exports = findElement;
