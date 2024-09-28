const Tool = require("../../models/tool");

const { askQuestion } = require("../../utils/askQuestion");
const findByName = require("../../utils/findByName");
const messages = require("../../allMessages");
const creatingQuestions = require("../manageDocs/creatingQuestions");

const createTool = async () => {
  try {
    console.log(messages.title.create);

    const answers = await creatingQuestions(
      ["name", "cost", "usage", "condition"],
      'Tool'
    );
    const newTool = new Tool(answers);
    await newTool.save();

    console.log(messages.success.create('Tool', newTool.name));
  } catch (err) {
    console.error(messages.error.createFail(err));
  }
};

const deleteTool = async () => {
  try {
    console.log(messages.title.delete);
    const tool = await findTool();
    await Tool.findByIdAndDelete(tool._id);
    console.log(messages.success.delete('Tool', tool.name));
  } catch (err) {
    console.error(messages.error.deleteFail(err));
  }
};

const showTool = async () => {
  try {
    console.log(messages.title.info);
    const tool = await findTool();
    
    const info = {
      name: tool.name,
      usage: tool.usage,
      cost: tool.cost,
      condition: tool.condition,
      usedBy: tool.borrowedBy,
    }

    console.log(messages.success.info('Tool', tool.name));
    console.log(info);
  } catch (err) {
    console.error(messages.error.showFail(err));
  }
};

const fixTool = async () => {
  try {
    console.log(messages.title.fix);
    const tool = await findTool();
    await tool.fixTool();
    console.log(messages.success.fix('Tool', tool.name));
  } catch (err) {
    console.error(messages.error.fixFail(err));
  }
};

const findTool = async () => {
  const name = await askQuestion(messages.input.field('Tool', "name"));
  const tool = await findByName(Tool, name);

  if (!tool) {
    throw new Error(messages.error.searchFail('Tool', name));
  }

  return tool;
};

module.exports = { createTool, deleteTool, fixTool, showTool };
