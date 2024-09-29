const { askQuestion } = require("../../utils/askQuestion");
const messages = require('../../allMessages');
const findElement = require("../manageElements/findElement");

const addMaterialQuantity = async () => {
  try {
    console.log(messages.title.addQuantity);
    
    const material = await findElement(Material, "Material");
    const quantity = await askQuestion(
      messages.input.field("Material", "quantity")
    );

    await material.newArrival(quantity, "Material");
  } catch (err) {
    console.error(messages.error.addFail(err.message));
  }
};

module.exports = addMaterialQuantity;