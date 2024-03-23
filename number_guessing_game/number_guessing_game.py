from random import randint
import os
import time


def clear_screen(seconds):
    time.sleep(seconds)
    os.system('cls')

def input_err():
    print('Incorrect input, please try again!')
    clear_screen(1)

def intro():
    clear_screen(1)
    print('Hello, mu name is Numges! And what is your name?')
    
    name = input('Please enter your name: ')
    clear_screen(1)
    return name

def outro(name):
    print("Goodbye", name)
    clear_screen(3)  

def cgn_rules():
    print('Think of a number from 1 to 100 inclusive...')

    clear_screen(5)

def ugn_rules():
    print('The computer thinks a number from 1 to 100 inclusive...')

    clear_screen(5)

def is_play_again():
    clear_screen(1)
    want_to_play = ' '
    
    while want_to_play != 'y' or want_to_play != "n":
        print("Do you want to play one more time?")
        print("if yes enter 'y'")
        print("if no enter 'n': ")

        want_to_play = input()

        if want_to_play == 'n':
            return False

        elif want_to_play == 'y':
            return True
        
        else:
            input_err()


    clear_screen(1)


def check_and_print_ugn(users_guess_number, random_number):
    if users_guess_number == random_number:
        print("You guessed! Congratulations!\n")
        return True

    elif users_guess_number < random_number:
        print("Too low, try again!\n")

    elif users_guess_number > random_number:
        print("Too high, try again!\n")
    
    return False    


def trying_to_guess_the_number(random_number):
    guess_flag = False

    while guess_flag == False:
        users_guess_number = int(input('Enter your guess please: '))

        guess_flag = check_and_print_ugn(users_guess_number, random_number)

        clear_screen(2)

def get_guess_number():
    return randint(1, 100)        

def user_answer_choose_game():
    clear_screen(0.5)

    print('\nThere are two games to choose from, enter the number of the game you have chosen.')
    print('\n1. The computer guesses a number from 1 to 100 inclusive, your task is to guess it.')
    print('2. You guess a number from 1 to 100 inclusive, the computer must guess it.')
    print('3. If you want to quit the game')

    choice = input()
    clear_screen(3)

    return choice

def user_answer_vars():
    print("\n1. Yes, that's my number.")
    print('2. No, my number is higher')
    print('3. No, my number is lower')
    print("4. I don't want to play anymore")

def get_computer_guesses(left, right):
        guess = int((right + left) / 2)
        print("\nI think your number is: ", guess)
        return guess

def print_one_more_time():
    print('\nI will try to guess one more time!')
    clear_screen(1)

def if_computer_won():
    print("Great! I won!")
    return True

def get_user_cgn_answer():
    user_answer_vars()
        
    answer = input()
    clear_screen(2)

    return answer

def if_user_num_higher_get_new_left(guess):
    print_one_more_time()
    return (guess + 1)

def if_user_num_lower_get_new_right(guess):
    print_one_more_time()
    return (guess - 1)

def ugn_game_process():
    random_number = get_guess_number()
    trying_to_guess_the_number(random_number)


def cgn_game_process():
    left = 1
    right = 100
    guess = 0

    computer_won = False
    
    while computer_won == False:

        guess = get_computer_guesses(left, right)
        
        user_answer = get_user_cgn_answer()
        
        if user_answer == '1':
            computer_won = if_computer_won()
        
        elif user_answer == '2':     
            left = if_user_num_higher_get_new_left(guess)

        elif user_answer == '3':
            right = if_user_num_lower_get_new_right(guess)
        
        elif user_answer == '4':
            return False

        else:
            input_err()

    return True    

def user_guesses_number():
    ugn_rules()

    play_flag = True
    
    while play_flag:
        ugn_game_process()
        play_flag = is_play_again()
        clear_screen(1)

def computer_guesses_number():
    cgn_rules()

    play_flag = True

    while play_flag:
        play_flag = cgn_game_process()
        
        if play_flag:
            play_flag = is_play_again()
            clear_screen(1)

def chosen_game(user_answer):
    if user_answer == '1':
        user_guesses_number()
    
    elif user_answer == '2':
        computer_guesses_number()
    
    elif user_answer == '3':
        return False    
    
    else:
        input_err()
    
    return True    

def number_guessing_game():
    name = intro()
    play_flag = True

    while play_flag:
        user_answer = user_answer_choose_game()
        play_flag = chosen_game(user_answer)

    outro(name)    

number_guessing_game()