import CashCalculator as cash_calc
import Calculator as calc

cash_calculator = cash_calc.CashCalculator(1000)

cash_calculator.add_record(calc.Record(amount=145, comment='coffe'))

cash_calculator.add_record(calc.Record(amount=300, comment='lunch'))

cash_calculator.add_record(calc.Record(amount=3000,
                                       comment='bar',
                                       date='08.11.2019'))

print(cash_calculator.get_today_cash_remained('usd'))
print(cash_calculator.get_today_cash_remained('rub'))
print(cash_calculator.get_today_cash_remained('eur'))

cash_calculator.add_record(calc.Record(amount=3000, comment='bar'))

print(cash_calculator.get_today_cash_remained('usd'))
print(cash_calculator.get_today_cash_remained('rub'))
print(cash_calculator.get_today_cash_remained('eur'))
