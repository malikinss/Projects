const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const closeInterface = () => {
  rl.close();
};

module.exports = { askQuestion, closeInterface };
