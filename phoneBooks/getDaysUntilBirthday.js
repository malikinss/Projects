function getDaysUntilBirthday(birthDate) {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    function setYearForDate(dateObj, year) {
        const newDate = new Date(dateObj);
        newDate.setFullYear(year);
        return newDate;
    }

    function millisecondsToDays(milliseconds) {
        return Math.round(milliseconds / MS_PER_DAY);
    }

    const today = new Date();
    const curYear = today.getFullYear();
    const curYearBirthday = setYearForDate(birthDate, curYear);

    let differenceInMilliseconds = curYearBirthday - today;

    // If the birthday has passed this year, calculate for the next year
    if (differenceInMilliseconds < 0) {
        const nextYearBirthday = setYearForDate(birthDate, curYear + 1);
        differenceInMilliseconds = nextYearBirthday - today;
    }

    const differenceInDays = millisecondsToDays(differenceInMilliseconds) + 1;

    return differenceInDays;
}

module.exports = {getDaysUntilBirthday};