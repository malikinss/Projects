const messages = require("../../allMessages");
const findElement = require("../manageElements/findElement");

const Tool = require("../../models/tool");

const getBorrowersNames = async (tool) => {
    const populatedTool = await Tool.findById(tool._id).populate("borrowedBy", "name");
    return populatedTool.borrowedBy.map(user => user.name);
};

const getInfo = async (element, modelName) => {
    const info = {};

    info.name = element.name;

    switch (modelName) {
        case "Tool":
            info.usage = element.usage;
            info.cost = element.cost;
            info.condition = element.condition;
            info.usedBy = await getBorrowersNames(element);
            break;
        case "Material":
            info.amount = element.amount;
            info.cost = element.cost;
            info.quality = element.quality;
            info.supplier = element.supplier;
            break;
        case "User":
            info.age = element.age;
            info.usedTools = await element.usedTools();
            break;
        default:
            break;
    }

    return info;
}

const showElement = async (Model, modelName) => {
  try {
    console.log(messages.title.info);
    const element = await findElement(Model, modelName);
    const info = await getInfo(element, modelName)

    console.log(messages.success.info(modelName, element.name));
    console.log(info);
  } catch (err) {
    console.error(messages.error.showFail(err.message));
  }
};

module.exports = showElement;