'''
TODO:
        Software module for processing data from the "runaway" fitness tracker from Unicorn.

        Module task:
            - receive and check incoming data packets of the form package = (<time>, <steps>) - for example, package = ('9:36:02', 15000);
            - save and process this data in the module;
            - display in the terminal a summary for the period from the beginning of the day to the time transmitted in the data packet;
            -return saved data for processing in other applications.
        
        Summary format:
            Time: `<time from received data packet>`.
            Number of steps for today: <sum of steps taken since the beginning of the current day>.
            The distance was <sum of steps since the beginning of the current day, converted to km> km.
            You have burned <number of kilocalories expended since the beginning of the current day> kcal.
            <Motivational message based on results>

        List of motivating messages depending on the distance traveled by the user:
            - From 6.5 km and more: 
                'Excellent result! Goal achieved.'
            - From 3.9 km and more: 
                'Not bad! It was a productive day.'
            - From 2 km or more: 
                'It's not enough, but we'll catch up tomorrow!'
            - Less than 2 km: 
                'Lying down is also useful. The main thing is participation, not victory!'

        Incoming data
            The module receives data packets in the form of tuples from the controller chip.
            Packets are transmitted to the program at the time the tracker is accessed (when the button is pressed).
            Order of values in the data packet: (<time>, <steps>)
                <time>: time of creation of the package; value of type str; format: 'hours:minutes:seconds'.
                <steps>: the number of steps taken by the user since the last contact; value of type int.
            When transmitting packets, failures may occur; this must be taken into account in the program.
            When a package arrives, you need to check it. 
            The package can be submitted for processing only after verification.
        
        Possible errors when receiving packages:
            - Package of shorter or longer length.
            - One or more parameters in the package have a null value.
            - The time value in the transmitted packet is less than the  previous recorded value (time is counted within one day).

        Result of program execution
            The received packets must be stored in the storage_data dictionary.
            The keys for it will be the time values, and the values will be the number of steps.
            A message should be displayed in the terminal, for example, this:
                Time: 09:36:02.
                Number of steps today: 15302.
                The distance was 9.95 km.
                You burned 1512.00 kcal.
                Excellent result! The goal has been achieved.
            The program must return the storage_data dictionary so that other programs can continue processing the data.
'''

import datetime as dt

TIME_FORMAT = '%H:%M:%S'
MEAN_STEP_M = 0.74
WEIGHT = 75
HEIGHT = 175  
K_1 = 0.035  
K_2 = 0.029

storage_data = {}
last_time = None

def parse_time(time_str):
    return dt.datetime.strptime(time_str, TIME_FORMAT).time()

def check_correct_time(time): 
    global last_time
    global storage_data

    try:
        if last_time is not None:
            if last_time >= time:
                storage_data = {}

        last_time = time

        return True
    except:
        return False

def check_correct_data(data):
    return all([len(data) == 2, None not in data])

def get_step_day(steps):
    return sum(storage_data.values(), steps)

def get_distance(steps):
    return steps * MEAN_STEP_M / 1000

def get_spent_calories(dist, current_time):
    minutes = current_time.hour * 60 + current_time.minute
    hours = minutes / 60

    mean_speed = dist / hours

    return (K_1 * WEIGHT + (mean_speed ** 2 / HEIGHT) * K_2 * WEIGHT) * minutes

def get_achievement(dist):
    achievements = {
        (6.5, float('inf')): 'Отличный результат! Цель достигнута',
        (3.9, 6.5): 'Неплохо! День был продуктивным.',
        (2, 3.9): 'Маловато, но завтра наверстаем!',
        (0, 2): 'Лежать тоже полезно. Главное — участие, а не победа!'
    }

    for dist_range, message in achievements.items():
        if dist >= dist_range[0] and dist < dist_range[1]:
            return message

def show_message(call_time, steps, distance, calories, achievement):
    messages = [f'Время: {call_time}.',
                f'Количество шагов за сегодня: {steps}.',
                f'Дистанция составила {distance:.2f} км.',
                f'Вы сожгли {calories:.2f} ккал.',
                achievement, '\n']
    print(*messages, sep='\n')

def accept_package(data_package):
    if not check_correct_data(data_package):
        return 'Incorrect package'
    
    time_str, steps = data_package
    time_dt = parse_time(time_str)

    if not check_correct_time(time_dt):
        return 'Incorrect time value'

    day_steps = get_step_day(steps)
    dist = get_distance(day_steps)
    spent_calories = get_spent_calories(dist, time_dt) / 3
    achievement = get_achievement(dist)

    show_message(time_dt, day_steps, dist, spent_calories, achievement)

    storage_data.update({time_dt: steps})

    return storage_data

package_0 = ('2:00:01', 505)
package_1 = (None, 3211)
package_2 = ('9:36:02', 15000)
package_3 = ('9:36:02', 9000)
package_4 = ('8:01:02', 7600)
package_5 = ('0:01:02', 600)

accept_package(package_0)
accept_package(package_1)
accept_package(package_2)
accept_package(package_3)
accept_package(package_4)
accept_package(package_5)
