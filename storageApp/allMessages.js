const {
  msgSuccess,
  msgError,
  msgMenu,
  msgInput,
} = require("./utils/coloredString");

const messages = {
  success: {
    create: (item, name) => msgSuccess(`\nThe ${item} successfully created: ${name}\n`),
    delete: (item, name) => msgSuccess(`\nThe ${item} successfully deleted: ${name}\n`),
    info: (item, name) => msgSuccess(`\nInfo about the ${item}: ${name}\n`),
    fix: (item, name) => msgSuccess(`\nThe ${item} successfully fixed: ${name}\n`),
    addQuantity: (item, name) => msgSuccess(
        `\nThe ${item} quantity successfully added: ${name}\n`
    ),
    
    buildSomething: msgSuccess('Something builded successfully!\n'),
    buildSomethingData: (tools, materials) => msgSuccess(
      `You asked to use tools:${tools} and materials:${materials}\n`
    ),
    
    amountRemain: (item, name, amount) => msgSuccess(
      `${item} ${name} remain: ${amount}`
    ),
    conditionRemain: (item, name, condition) => msgSuccess(
      `${item} ${name} current condition: ${condition}`
    ),
    itemUsage: (item, name, userName) => msgSuccess(
      `${item} ${name} used by: ${userName}`
    ),

    exit: msgSuccess('Goodbye!\n'),
    appStart: msgSuccess("Application started...\n"),
    dbSuccess: msgSuccess('Connected to MongoDB successfully!\n'),
  },

  error: {
    invalidInput: msgError("Invalid choice. Please try again.\n"),

    createFail: (error) => msgError(`Creating error: ${error}\n`),
    deleteFail: (error) => msgError(`Deleting error: ${error}\n`),
    showFail: (error) => msgError(`Showing error: ${error}\n`),
    fixFail: (error) => msgError(`Fixing error: ${error}\n`),
    addFail: (error) => msgError(`Adding error: ${error}\n`),
    buildFail: (error) => msgError(`Building error: ${error}\n`),

    amountFail: (error) => msgError(`Amount error: ${error}\n`),
    conditionFail: (name) => msgError(`Condition error: Condition of the ${name} is 100%\n`),

    searchFail: (item, name) => msgError(`${item} with name ${name} not found\n`),

    dbFail: msgError('Error connecting to MongoDB:'),
  },

  menu: {
    mainMenu: msgMenu(
        ` 1. Manage Tools\n 2. Manage Materials\n 3. Manage Users\n 4. Exit\n`
    ),
    manageToolsMenu: msgMenu(
        "\nOptions:\n 1. Add Tool\n 2. Delete Tool\n 3. Get Tool info\n 4. Fix the Tool\n 5. Back"
    ),
    manageMaterialsMenu: msgMenu(
        "\nOptions:\n 1. Add Material\n 2. Delete Material\n 3. Get Material info\n 4. Add Material Quantity\n 5. Back"
    ),
    manageUsersMenu: msgMenu(
      "\nOptions:\n 1. Add User\n 2. Delete User\n 3. Get user info\n 4. Build Something\n 5. Back"
    ),
    buildSomethingToolMenu: msgMenu(
      "\nOptions:\n 1. Enter the Tool\n 2. Next to entering Materials\n"
    ),
    buildSomethingMaterialMenu: msgMenu(
      "\nOptions:\n 1. Enter the Material\n 2. Next to building\n"
    ),
    buildSomethingMenu: (item) => msgMenu(
        `\nOptions:\n 1. Enter the ${item}\n 2. Next step\n`
      ),
  },

  input: {
    optionChoice: msgInput("\nChoose an option: "),
    field: (item, field) => msgInput(
        `\n Enter the ${field}${field === "condition" ? "1-100" : ""} of the ${item}: `
    ),
  },

  title: {
    introduction: "Welcome to the Storage Application!\n",
    create: "Creating: \n",
    delete: "Deleting: \n",
    info: "Information: \n",
    fix: "Fixing: \n",
    addQuantity: "Adding Quantity: \n",
    build: "Building: \n",
  },
};

module.exports = messages;
