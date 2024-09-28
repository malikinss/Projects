const { askQuestion } = require("./askQuestion");
const findByName = require("./findByName");
const messages = require("./inteface/allMessages");

const findModel = async (Model) => {
    const name = await askQuestion(messages.input.property("name"));
    const model = await findByName(Model, name);
  
    if (!model) {
      throw new Error(messages.error.searchFail(name));
    }
  
    return model;
};

module.exports = findModel;