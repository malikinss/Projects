const Tool = require("../../models/tool");

const messages = require("../../allMessages");
const findElement = require("../manageElements/findElement");

const createElement = require("../manageElements/createElement");
const deleteElement = require("../manageElements/deleteElement");
const showElement = require("../manageElements/showElement");

const createTool = async () => {
  await createElement(Tool, ["name", "cost", "usage", "condition"], 'Tool');
};

const deleteTool = async () => {
  await deleteElement(Tool, 'Tool');
}

const showTool = async () => {
  await showElement(Tool, 'Tool');
}

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
