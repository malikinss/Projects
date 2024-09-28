class Calculator {
  performCalculation(a, b, action) {
    const actions = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
      "**": (a, b) => a ** b,
    };

    if (action in actions) {
      return actions[action](a, b);
    } else {
      throw new Error('Invalid action');
    }
  }
}

module.exports = Calculator;
