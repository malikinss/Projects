const { msgSuccess, msgError, msgInput } = require("../utils/coloredString");

const messages = {
    success: {
        deleteSuccess: (item, name) => msgSuccess(`${item}: ${name} successfully deleted`),
        updateSuccess: (item, name) => msgSuccess(`${item}: ${name} successfully updated`),
        // usageSuccess: (item, name) => msgSuccess(`${item}: ${name} successfully used`),
        addSuccess: (item, name) => msgSuccess(`${item}: ${name} successfully added`),
        
        amountRemain: (item, name, amount) => msgSuccess(`${item}: ${name} remaining ${amount}`),
        itemUsage: (item, itemName, userName) => msgSuccess(`${item}: ${itemName} successfully used by ${userName}`),
        toolFix: (name, condition) => msgSuccess(`Tool: ${name} successfully fixed, current condition is: ${condition}`),
    },

    error: {
        usageFail: (item, error) => msgError(`Fail while using ${item}: ${error.message}`),
        updateFail: (item) => msgError(`Error updating ${item}:`),
        amountFail: (name) => msgError(`Not enough ${name}:`),
        conditionFail: (toolName) => msgError(`${toolName}'s condition too low to usage`),
    },

    menu: {
        manageOptions: (item) => ` 1. Add ${item}\n 2. View ${item}s\n 3. Update ${item}\n 4. Delete ${item}\n 5. Back to Main Menu\n`,
    },

    input: {
        introduction: msgInput("Welcome to the Storage Application!\n"),

        mngDelete: (item) => msgInput(`Enter ${item} name to delete and press Enter: `),
        mngUpdate: (item) => msgInput(`Enter ${item} name to update and press Enter: `),

        userName: msgInput('Enter user name: '),
        userAge: msgInput('Enter user age: '),

        toolName: msgInput('Enter tool name: '),
        toolAmount: msgInput('Enter tool amount: '),
        toolCost: msgInput('Enter tool cost: '),
        toolUsage: msgInput('Enter tool usage: '),
        toolCondition: msgInput('Enter tool condition (1-100): '),

        materialName: msgInput('Enter material name: '),
        materialAmount: msgInput('Enter material amount: '),
        materialCost: msgInput('Enter material cost: '),
        materialSupplier: msgInput('Enter supplier name: '),
        materialQuality: msgInput('Enter quality rating: '),
    }
};

module.exports = messages;
