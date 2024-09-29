const Material = require("../../models/material");

const { askQuestion } = require("../../utils/askQuestion");
const messages = require('../../allMessages');
const findElement = require("../manageElements/findElement");

const createElement = require("../manageElements/createElement");
const deleteElement = require("../manageElements/deleteElement");
const showElement = require("../manageElements/showElement");

const createMaterial = async () => {
  await createElement(Material, ['name', 'amount', 'cost', 'supplier', 'quality'], 'Material');
};

const deleteMaterial = async () => {
  await deleteElement(Material, 'Material');
}

const showMaterial = async () => {
  await showElement(Material, 'Material');
}

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
