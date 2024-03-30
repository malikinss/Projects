import Calculator as calc


class CaloriesCalculator(calc.Calculator):
    '''Subclass of Calculator for calculating calorie intake.'''
    def get_today_calories_remained(self) -> str:
        '''
        Get today's remaining calorie allowance.

        Returns:
            str: A message indicating the remaining calorie
            allowance for today.
        '''
        remaining_calories: int = self.get_todays_remained()

        return ('Stop eating!' if remaining_calories <= 0 else
                f'Today you can eat something else, but with a total'
                f'calorie content of no more than {remaining_calories} kcal')
