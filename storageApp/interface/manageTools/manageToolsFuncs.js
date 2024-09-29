const Tool = require("../../models/tool");

const messages = require("../../allMessages");
const creatingQuestions = require("../manageDocs/creatingQuestions");
const findElement = require("../manageDocs/findElement");

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
    const tool = await findElement(Tool, 'Tool');
    await Tool.findByIdAndDelete(tool._id);
    console.log(messages.success.delete('Tool', tool.name));
  } catch (err) {
    console.error(messages.error.deleteFail(err));
  }
};


const getBorrowersNames = async (tool) => {
  const populatedTool = await Tool.findById(tool._id).populate("borrowedBy", "name");
  return populatedTool.borrowedBy.map(user => user.name);
};

const showTool = async () => {
  try {
    console.log(messages.title.info);
    const tool = await findElement(Tool, 'Tool');
    
    const info = {
      name: tool.name,
      usage: tool.usage,
      cost: tool.cost,
      condition: tool.condition,
      usedBy: await getBorrowersNames(tool),
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
    const tool = await findElement(Tool, 'Tool');
    await tool.fixTool();
    console.log(messages.success.fix('Tool', tool.name));
  } catch (err) {
    console.error(messages.error.fixFail(err));
  }
};

module.exports = { createTool, deleteTool, fixTool, showTool };
