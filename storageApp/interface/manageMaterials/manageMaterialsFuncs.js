const Material = require("../../models/material");

const { askQuestion } = require("../../utils/askQuestion");
const messages = require('../../allMessages');
const creatingQuestions = require("../manageDocs/creatingQuestions");
const findElement = require("../manageDocs/findElement");

const createMaterial = async () => {
  try {
    console.log(messages.title.create);

    const answers = await creatingQuestions(['name', 'amount', 'cost', 'supplier', 'quality'], 'Material');
    const newMaterial = new Material(answers);
    await newMaterial.save();

    console.log(messages.success.create("Material", newMaterial.name));
  } catch (err) {
    console.error(messages.error.createFail(err.message));
  }
};

const deleteMaterial = async () => {
  try {
    console.log(messages.title.delete);
    const material = await findElement(Material, 'Material');
    await Material.findByIdAndDelete(material._id);
    console.log(messages.success.delete('Material' ,material.name));
  } catch (err) {
    console.error(messages.error.deleteFail(err.message));
  }
};

const showMaterial = async () => {
  try {
    console.log(messages.title.info);
    const material = await findElement(Material, 'Material');
    
    const info = {
      name: material.name,
      amount: material.amount,
      cost: material.cost,
      quality: material.quality,
      supplier: material.supplier,
    }

    console.log(messages.success.info('Material', material.name));
    console.log(info);
  } catch (err) {
    console.error(messages.error.showFail(err.message));
  }
};

const addMaterialQuantity = async () => {
  try {
    console.log(messages.title.addQuantity);
    const material = await findElement(Material, 'Material');
    const quantity = await askQuestion(messages.input.field('Material', "quantity"));

    await material.newArrival(quantity, 'Material');
  } catch (err) {
    console.error(messages.error.addFail(err.message));
  }
};

module.exports = {
  createMaterial,
  deleteMaterial,
  showMaterial,
  addMaterialQuantity,
};
