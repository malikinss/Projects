const Calculator = require('./Calculator');
const CalculatorInterface = require('./CalculatorInterface');

const calculator = new Calculator();
const calculatorInterface = new CalculatorInterface(calculator);

calculatorInterface.start();
