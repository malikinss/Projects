# Cash calculator💰
This project is a calculator for counting money. 
It is designed for users who want to control their expenses and income. 
Below you will find information on how to use and what features are available.

## Project description
Money calculator is a program for accounting and analyzing financial transactions. It allows you to save records of expenses, calculate the amount of money spent over a certain period of time, and also determine the remaining balance for the current day.

## Functionality
The cash calculator provides the following features:

1. Saving a new expense entry: User can add expense entries with amount and comment.
2. Getting statistics for today: The calculator calculates the amount of money spent for the current day.
3. Determining available money: The calculator determines how much more money can be spent today according to the user's daily limit.
4. Getting statistics for the last 7 days: The calculator calculates the total amount of money spent over the last 7 days.

## Usage
[Calculator.py](./Calculator.py) - contains the main class ```Calculator``` and the class ```Record``` for storing food intake records.

### Methods of the Calculator class:
- ```__init__(limit: int)```: Initializes the calculator with the given daily calorie limit.
- ```add_record(record)```: Adds a meal record to the list of records.
- ```get_today_stats()```: Returns the number of calories consumed for the current day.
- ```get_week_stats()```: Returns the total calories consumed over the last 7 days.
- ```get_todays_remained()```: Returns the remaining calorie limit for the current day.

[CashCalculator.py](CashCalculator.py) contains a subclass ```CashCalculator``` that inherits the functionality of the main class ```Calculator``` and adds additional methods.

### Additional methods of the CashCalculator class:
- ```get_today_cash_remained()```: Returns a message about how much more money can be spent today.

## Usage example:
An example of using the project is presented in the [test.py](./test.py) file.

## Important Notice:
For the calculator to work correctly, you must correctly pass arguments when calling methods and using classes.
Please make sure you have Python 3.11 installed for the project to run correctly.
Be careful when working with the calculator and keep track of your expenses!

## Author:
The project was developed by [Sam Malikin](https://www.linkedin.com/in/kelevv/).

## License:
This project is licensed under the terms of the [MIT] license.

Thank you for using the cash calculator! If you have questions or suggestions, don't hesitate to contact me. Happy using!