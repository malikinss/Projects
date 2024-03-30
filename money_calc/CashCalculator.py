import Calculator as calc


class CashCalculator(calc.Calculator):
    # Constants for currency rates
    RUB_RATE = 1.0
    USD_RATE = 60.0
    EUR_RATE = 70.0

    # Dictionary to map currency codes to rates
    CURRENCY_RATES = {
        'RUB': RUB_RATE,
        'USD': USD_RATE,
        'EUR': EUR_RATE
    }

    def get_today_cash_remained(self, currency: str) -> str:
        '''
        Gets the balance for today in the specified currency.

        Args:
            currency (str): Currency in which use to receive the balance.

        Returns:
            str: A string indicating the balance for today.
        '''

        # Checking the presence of a currency in the CURRENCIES dictionary
        rate = self.CURRENCY_RATES.get(currency.upper())
        if rate is None:
            raise ValueError('Invalid currency')

        balance = self.get_todays_remained()

        if balance == 0:
            return 'You spent all money'

        # Calculate the balance in the specified currency
        balance_currency = abs(balance / rate)
        data = f'{balance_currency:.2f} {currency}'

        # Form a line depending on the remainder
        if balance > 0:
            return f'{data} left for today'
        else:
            return f'Currently, your debt is {data}'
