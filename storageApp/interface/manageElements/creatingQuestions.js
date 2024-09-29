const { askQuestion } = require("../../utils/askQuestion");
const messages = require("../../allMessages");

const creatingQuestions = async (fields, item) => {
    const answers = {};
  
    for (let field of fields) {
      if (item == 'Tool' && field == 'quantity') {
        answers[field] = 1;
      } else {
        answers[field] = await askQuestion(messages.input.field(item, field));
      }
    }
  
    return answers;
};


module.exports = creatingQuestions;