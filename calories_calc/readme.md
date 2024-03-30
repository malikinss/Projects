# Calorie calculator 💪🥗🍎
This project is a calculator for counting calories. 
It is designed for users who want to control their diet and monitor their calorie intake.

## Functionality
The calorie calculator provides the following features:

1. Saving a new meal record: The user can add food records with the number of calories consumed and a comment.

2. Getting statistics for today: The calculator calculates the number of calories consumed for the current day.

3. Determining available calories: The calculator determines how many more calories you can/need to get today in accordance with the daily limit set by the user.

4. Get statistics for the last 7 days: The calculator calculates the total number of calories consumed over the last 7 days.

## Usage
[Calculator.py](./Calculator.py) - contains the main class ```Calculator``` and the class ```Record``` for storing food intake records.

### Methods of the Calculator class:
```__init__(limit: int)```: Initializes the calculator with the given daily calorie limit.
```add_record(record)```: Adds a meal record to the list of records.
```get_today_stats()```: Returns the number of calories consumed for the current day.
```get_week_stats()```: Returns the total calories consumed over the last 7 days.
```get_todays_remained()```: Returns the remaining calorie limit for the current day.

[CaloriesCalculator.py](CaloriesCalculator.py) contains a subclass ```CaloriesCalculator``` that inherits the functionality of the main class ```Calculator``` and adds additional methods.

### Additional methods of the CaloriesCalculator class:
```get_today_calories_remained()```: Returns a message about how many more calories can/should be obtained today.

## Usage example:
An example of use is given in the file [test.py](./test.py)

### Important Notice:
For the calculator to work correctly, you must pass the correct arguments when calling methods and using classes.

Be careful when working with the calculator and watch your diet!

## Author:
The project was developed by [Sam Malikin]([https://www.linkedin.com/in/kelevv/]).

## License:
This project is licensed under the terms of the [MIT] license.

