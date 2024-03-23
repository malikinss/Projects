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
