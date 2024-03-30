import Calculator as calc
from CaloriesCalculator import CaloriesCalculator


kcals_calculator = CaloriesCalculator(1000)

kcals_calculator.add_record(calc.Record(amount=145, comment='coffe'))

kcals_calculator.add_record(calc.Record(amount=300, comment='lunch'))

kcals_calculator.add_record(calc.Record(amount=3000,
                                        comment='bar',
                                        date='08.11.2019'))

print(kcals_calculator.get_today_calories_remained())

kcals_calculator.add_record(calc.Record(amount=3000, comment='bar'))

print(kcals_calculator.get_today_calories_remained())
