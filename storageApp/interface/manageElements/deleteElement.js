const messages = require("../../allMessages");
const findElement = require("../manageElements/findElement");

const deleteElement = async (Model, modelName) => {
    try {
      console.log(messages.title.delete);

      const element = await findElement(Model, modelName);
      await Model.findByIdAndDelete(element._id);
      
      console.log(messages.success.delete(modelName, element.name));
    } catch (err) {
      console.error(messages.error.deleteFail(err));
    }
};

module.exports = deleteElement;