# Fitness-Tracker

Software module for processing data from the "runaway" fitness tracker from Unicorn.


## Module task:
- receive and check incoming data packets of the form package = (time, steps);
- save and process this data in the module;
- display in the terminal a summary for the period from the beginning of the day to the time transmitted in the data packet;
- return saved data for processing in other applications.
        
## Summary format:
```bash
Time: `time from received data packet`.
Number of steps for today: 'sum of steps taken since the beginning of the current day'.
The distance was 'sum of km since the beginning of the current day' km.
You have burned 'spent kilocalories since the beginning of day' kcal.
Motivational message based on results.
```

## List of motivating messages depending on the distance traveled by the user:
```bash
- From 6.5 km and more: 
    'Excellent result! Goal achieved.'
- From 3.9 km and more: 
    'Not bad! It was a productive day.'
- From 2 km or more: 
    'It's not enough, but we'll catch up tomorrow!'
- Less than 2 km: 
    'Lying down is also useful. The main thing is participation, not victory!'
```
## Incoming data
The module receives data packets in the form of tuples from the controller chip.
Packets are transmitted to the program at the time the tracker is accessed (when the button is pressed).
Order of values in the data packet: (<time>, <steps>)
```bash
<time>: time of creation of the package; str; format: 'HH:MM:SS'.
<steps>: the number of steps taken by the user since the last contact; int.
```
When transmitting packets, failures may occur; this must be taken into account in the program.
When a package arrives, you need to check it. 
The package can be submitted for processing only after verification.
        
## Possible errors when receiving packages:
- Package of shorter or longer length.
- One or more parameters in the package have a null value.
- The time value in the transmitted packet is less than the  previous recorded value (time is counted within one day).

## Result of program execution
The received packets must be stored in the storage_data dictionary.
The keys for it will be the time values, and the values will be the number of steps.
A message should be displayed in the terminal, for example, this:
```bash
Time: 09:36:02.
Number of steps today: 15302.
The distance was 9.95 km.
You burned 1512.00 kcal.
Excellent result! The goal has been achieved.
```
The program must return the storage_data dictionary so that other programs can continue processing the data.