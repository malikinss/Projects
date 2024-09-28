const connectDB = require("./db/database");
const mainMenu = require("./interface/mainMenu/mainMenu");
// const messages = require("./allMessages");

const startApp = async () => {
  await connectDB(); // Connect to MongoDB
  await mainMenu();
};

startApp();
