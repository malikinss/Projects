'''Any description'''
import datetime as dt

FORMAT = '%d.%m.%Y'


def get_todays_date() -> dt.date:
    '''Get today's date.'''
    return dt.date.today()


class Calculator:
    '''Calculates financial statistics.'''

    def __init__(self, limit: int):
        self.limit = limit
        self.records = []

    def filter_records_by_date(self, date: dt.date) -> list:
        '''Filter records by a specific date.'''
        return [record for record in self.records if record.date == date]

    def get_records_in_date_range(self, start: dt.date, end: dt.date) -> list:
        '''Get records within a range of dates.'''
        return [rec for rec in self.records if start <= rec.date <= end]

    def add_record(self, record):
        '''Adds a record to the records list'''
        self.records.append(record)

    def get_today_stats(self):
        '''Get statistics for today.'''
        today = get_todays_date()
        todays_records = self.filter_records_by_date(today)

        return sum(record.amount for record in todays_records)

    def get_week_stats(self):
        '''Any description'''
        today = get_todays_date()
        end_week = today - dt.timedelta(days=7)

        week_records = self.get_records_in_date_range(end_week, today)

        week_stats = sum(record.amount for record in week_records)

        return week_stats

    def get_todays_remained(self) -> int:
        '''Returns remaining limit for today'''
        return self.limit - self.get_today_stats()


class Record:
    '''Any description'''
    def __init__(self, amount: int, comment: str, date: str = None):
        self.amount = amount
        self.comment = comment

        if date is None:
            self.date = get_todays_date()
        else:
            self.date = dt.datetime.strptime(date, FORMAT).date()
