'''
Description of the project: magic ball 8 (ball of fate) is a comic way to predict the future. The program should ask the user to ask a question in order to randomly answer it.

Project components:

Integers (type int);
Variables;
Data input/output (input() and print() functions);
Conditional statement (if/elif/else);
while loop;
Endless cycle;
Operators break, continue;
Working with the random module to generate random numbers.

Answer options
Traditionally, the ball has 20 answers, which can be divided into four groups.

Positive:
- Undoubtedly
- It's a foregone conclusion
- Without any doubts
- Definitely yes
- You can be sure of this

Hesitantly positive:
- I think so
- Most likely
- Good prospects
- Signs say yes
- Yes

Neutral:
- Not clear yet, try again
- Ask later
- It's better not to tell
- It’s impossible to predict now
- Concentrate and ask again

Negative:
- Do not even think
- My answer is no
- According to my data - no
- Prospects are not very good
- Very doubtful
'''

from random import randint
import os
import time


def clear_screen(seconds):
    time.sleep(seconds)
    os.system('cls')


def input_err():
    print('Incorrect input, please try again!')
    clear_screen(1)


def get_answer_from_user():
    answer = input('Please enter your answer and press enter...\n')
    clear_screen(1)

    return answer


def hello_user(name):
    print('Hello ', name)
    clear_screen(2)


def outro(name):
    print("Goodbye", name)
    clear_screen(3)  


def intro_general():
    clear_screen(1)
    print('Hello, I am a magic ball and I know the answer to any of your questions.')
    print('What is your name?\n')


def get_answer_from_ball():
    answers_list = [["Undoubtedly", "It's a foregone conclusion", "Without any doubts", "Definitely yes", "You can be sure of this"],
                    ["I think so", "Most likely", "Good prospects", "Signs say yes", "Yes"],
                    ["Not clear yet, try again", "Ask later", "It's better not to tell", "It’s impossible to predict now", "Concentrate and ask again"],
                    ["Do not even think", "My answer is no", "According to my data - no", "Prospects are not very good", "Very doubtful"]]

    first_number =  randint(0, 3)
    second_number =  randint(0, 4)

    return answers_list[first_number][second_number]


def get_and_print_answer_from_ball():
    answer_from_ball = get_answer_from_ball()
    print("My answer is: ", answer_from_ball)

    clear_screen(5)


def is_ask_again():
    want_to_play = ' '
    
    while want_to_play != "Y" or want_to_play != "N":
        print("Do you want to ask me one more time?")
        print("if yes enter 'y'")
        print("if no enter 'n': \n")

        want_to_play = get_answer_from_user()
        want_to_play = want_to_play.upper()

        if want_to_play == 'N':
            return False

        elif want_to_play == 'Y':
            return True
        
        else:
            input_err()

    clear_screen(1)


def is_input_empty(user_input):
    if user_input == '':
        print("You didn't enter anything")
        clear_screen(1)

        return True
    
    return False


def user_correct_input():
    flag = True

    while flag:
        user_input = get_answer_from_user()
        flag = is_input_empty(user_input)

    return user_input     


def get_question_from_user():
    print("Ask me a question about what worries you\n")

    question = user_correct_input()

    print("Shaking the ball\n")
    clear_screen(1)

    return question


def magic_ball():
    intro_general()

    name = user_correct_input()
    name = name.capitalize()
    hello_user(name)

    play_flag = True

    while play_flag:
        question = get_question_from_user()
        print('Your question is: ', question)

        get_and_print_answer_from_ball()
        play_flag = is_ask_again()

    outro(name)    

    
magic_ball()