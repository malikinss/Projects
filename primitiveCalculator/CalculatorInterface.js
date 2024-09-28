const readline = require("readline");
const txtFormatter = require("./textFormatter");

class CalculatorInterface {
  constructor(calculator) {
    this.calculator = calculator;
    this.txtFormatter = new txtFormatter();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  getQuestionForUser(id) {
    const quitMessage = "(or 'q' to quit)";
    const questions = [
      `\nPlease insert first operand ${quitMessage}: `,
      `Please insert second operand ${quitMessage}: `,
      `Please insert one of the actions (+, -, /, *, **) ${quitMessage}: `,
    ];
    return this.txtFormatter.formatTextWithColor(questions[id], "yellow");
  }

  inputError() {
    const errTxt = "Input Error, Please try again!";
    console.log(this.txtFormatter.formatTextWithColor(errTxt, "red"));
  }

  logResult(result) {
    console.log(this.txtFormatter.formatTextWithColor(`${result}`, "green"));
  }

  promptUserInput(questionMessage) {
    return new Promise((resolve) => {
      this.rl.question(questionMessage, (answer) => {
        resolve(answer);
      });
    });
  }

  async getValidInput(questionId, validationFn) {
    while (true) {
      const question = this.getQuestionForUser(questionId);
      const input = await this.promptUserInput(question);

      if (input.toLowerCase() === "q") {
        this.rl.close();
        return null;
      }

      const value = validationFn(input);
      if (value !== null) {
        return value;
      }

      this.inputError();
    }
  }

  async getNumberInput(questionId) {
    return await this.getValidInput(questionId, (input) => {
      const num = parseFloat(input);
      return !isNaN(num) ? num : null;
    });
  }

  async getActionInput() {
    const questionId = 2;

    return await this.getValidInput(questionId, (input) => {
      const validActions = ["+", "-", "*", "/", "**"];
      const res = input.trim();

      return validActions.includes(res) ? res : null;
    });
  }

  async start() {
    while (true) {
      try {
        const firstOperand = await this.getNumberInput(0);
        if (firstOperand === null) return;

        const secondOperand = await this.getNumberInput(1);
        if (secondOperand === null) return;

        const action = await this.getActionInput();
        if (action === null) return;

        const result = this.calculator.performCalculation(
          firstOperand,
          secondOperand,
          action
        );
        this.logResult(result);
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    }
  }
}

module.exports = CalculatorInterface;
