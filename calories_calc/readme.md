# Калькулятор калорий
Этот проект представляет собой калькулятор для подсчёта калорий. Он разработан для пользователей, которые желают контролировать свой рацион питания и следить за употреблением калорий.

## Описание функциональности
Калькулятор калорий предоставляет следующие возможности:

1. Сохранение новой записи о приёме пищи: Пользователь может добавлять записи о приёме пищи с указанием количества потребленных калорий и комментарием.

2. Получение статистики за сегодня: Калькулятор вычисляет количество потребленных калорий за текущий день.

3. Определение доступных калорий: Калькулятор определяет, сколько ещё калорий можно/нужно получить сегодня в соответствии с установленным пользователем дневным лимитом.

4. Получение статистики за последние 7 дней: Калькулятор вычисляет общее количество потребленных калорий за последние 7 дней.

## Использование
[Calculator.py](./Calculator.py) - содержит основной класс ```Calculator``` и класс ```Record``` для хранения записей о приёме пищи.

### Методы класса Calculator:
```__init__(limit: int)```: Инициализирует калькулятор с заданным дневным лимитом калорий.
```add_record(record)```: Добавляет запись о приёме пищи в список записей.
```get_today_stats()```: Возвращает количество потребленных калорий за текущий день.
```get_week_stats()```: Возвращает общее количество потребленных калорий за последние 7 дней.
```get_todays_remained()```: Возвращает оставшийся лимит калорий на текущий день.

[CaloriesCalculator.py](CaloriesCalculator.py) содержит подкласс ```CaloriesCalculator```, который наследует функциональность основного класса ```Calculator``` и добавляет дополнительные методы.

### Дополнительные методы класса CaloriesCalculator:
```get_today_calories_remained()```: Возвращает сообщение о том, сколько ещё калорий можно/нужно получить сегодня.


## Пример использования:
```python
import Calculator as calc
from CaloriesCalculator import CaloriesCalculator

# Создание экземпляра калькулятора с установленным лимитом калорий
kcals_calculator = CaloriesCalculator(1000)

# Добавление записей о приёме пищи
kcals_calculator.add_record(calc.Record(amount=145, comment='coffe'))
kcals_calculator.add_record(calc.Record(amount=300, comment='lunch'))
kcals_calculator.add_record(calc.Record(amount=3000, comment='bar', date='08.11.2019'))

# Вывод сообщения о доступных калориях для приёма пищи сегодня
print(kcals_calculator.get_today_calories_remained())

# Добавление ещё одной записи о приёме пищи
kcals_calculator.add_record(calc.Record(amount=3000, comment='bar'))

# Вывод сообщения о доступных калориях для приёма пищи сегодня
print(kcals_calculator.get_today_calories_remained())
```

## Важное замечание
Для корректной работы калькулятора необходимо передавать правильные аргументы при вызове методов и использовании классов.

Будьте внимательны при работе с калькулятором и следите за своим рационом питания!

## Автор
Проект разработан [Sam Malikin]([https://www.linkedin.com/in/kelevv/]).

Лицензия
Этот проект лицензируется в соответствии с условиями лицензии [MIT].
