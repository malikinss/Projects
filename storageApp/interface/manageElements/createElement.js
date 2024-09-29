const messages = require('../../allMessages');
const creatingQuestions = require("./creatingQuestions");


const createElement = async (Model, fields, modelName) => {
  try {
    console.log(messages.title.create);

    const answers = await creatingQuestions(fields, modelName);
    const newElement = new Model(answers);
    await newElement.save();

    console.log(messages.success.create(modelName, newElement.name));
  } catch (err) {
    console.error(messages.error.createFail(err.message));
  }
};

module.exports = createElement;