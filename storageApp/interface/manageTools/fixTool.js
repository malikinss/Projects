const Tool = require("../../models/tool");

const messages = require("../../allMessages");
const findElement = require("../manageElements/findElement");

const fixTool = async () => {
  try {
    console.log(messages.title.fix);
    
    const tool = await findElement(Tool, "Tool");
    await tool.fixTool();

    console.log(messages.success.fix("Tool", tool.name));
  } catch (err) {
    console.error(messages.error.fixFail(err));
  }
};

module.exports = fixTool;