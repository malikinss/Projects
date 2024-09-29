const connectDB = require("./db/database");
const mainMenu = require("./interface/mainMenu/mainMenu");
const messages = require("./allMessages");


const startApp = async () => {
  await connectDB(); // Connect to MongoDB
  console.log(messages.success.appStart);
  await mainMenu();
};

startApp();
