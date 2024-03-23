'''
Project Description:

This program is designed to generate a specified number of passwords with customizable settings. 
The program offers smart controls for determining the length of the password and allows users to 
define which characters to include and exclude from the generated passwords. 
It provides a flexible and secure way to create passwords tailored to specific requirements.

Project Features:
- Generate multiple passwords at once.
- Customize password length.
- Specify characters to include in generated passwords.
- Exclude specific characters from the generated passwords.
- Ensures password security and complexity according to user preferences.

This project aims to simplify the process of creating secure passwords with tailored settings, 
making it a valuable tool for enhancing online security.

'''

from random import randint
import os
import time


DIGITS = '0123456789'
LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'
UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
PUNCTUATION = '!#$%&*+-=?@^_'


def clear_screen(seconds):
    time.sleep(seconds)
    os.system('cls')


def hello_user(name):
    print('\n Hello ', name)
    clear_screen(2)


def outro(name):
    print("\n Goodbye", name)
    clear_screen(2)  


def post_intro():
    print("\n Now I'm going to ask you to answer a few questions.\n Well let's get started.\n")
    clear_screen(3.5)


def intro():
    clear_screen(1)
    print('\n Hello, I am a Secure Password Generator and I will help you generate a strong password.')
    print(' What is your name?\n')


def input_err():
    print('\n Incorrect input, please try again!')
    clear_screen(1)


def get_user_input():
    answer = input('\n Please enter your answer and press enter...\n')
    clear_screen(1)

    return answer


def is_input_empty(user_input):
    '''
    Checks if the user has submitted an empty value.

    Parameters:
        user_input (str): The user's input.

    Returns:
        bool: True if the input is empty, False otherwise.
        str: Corresponding message to be displayed on the screen.
    '''
    if user_input == '':
        print("\n You didn't enter anything")
        clear_screen(1)

        return True
    
    return False


def get_correct_user_input():
    '''
    Takes input from the user and checks if it's empty. 
    If it's empty, it asks for input again.
    If not, it returns the data received from the user.

    Returns:
        user_input (str): non-empty input provided by the user.
    '''
    flag = True

    while flag:
        user_input = get_user_input()
        flag = is_input_empty(user_input)

    return user_input  


def check_num_of_passwords(user_setting):
    '''
    This function checks whether the setting received from the user for the 
    number of generated passwords matches the number allowed by the program, 
    and returns True if they match and False otherwise.

    Parameters:
    - user_setting (int): The number of passwords requested by the user.

    Returns:
    - bool: True if user_setting matches program allowed number, False otherwise.
 
    '''

    
    if user_setting.isdigit():
        is_program_allowed_number = int(user_setting) > 0

        if is_program_allowed_number:
            return True
    
    input_err()

    return False


def get_number_of_passwords(question):
    '''
    Asks the user to set the number of generated passwords and returns the resulting value for further entry into the dictionary with the settings for generated passwords.

    Parameters:
        question (str): The question to be presented to the user.

    Returns:
        number_of_password (str): The user-defined number
    '''
    input_coorect_flag = False

    while input_coorect_flag == False:
        print(question)

        number_of_password = get_correct_user_input()
        input_coorect_flag = check_num_of_passwords(number_of_password)
            
    return int(number_of_password)


def check_len_of_password(length_setting_from_user):
    '''
    Checks whether the length setting for generated passwords received from the user matches the number allowed by the program and returns True or False depending on the result of the check.

    Parameters:
    - length_setting_from_user (str): The desired length setting for the generated password from the user.

    Returns:
    - bool: True if the user's length setting matches the program's allowed length, False otherwise.
    
    '''
    

    if length_setting_from_user.isdigit():
        length_setting_from_user = int(length_setting_from_user)
    
        is_more_than_min = length_setting_from_user >= 4
        is_less_than_max = length_setting_from_user <= 20
    
        is_program_allowed_length = is_more_than_min and is_less_than_max
        
        if is_program_allowed_length:
            return True
    
    input_err()
    
    return False


def get_len_of_password(question):
    '''
    Asks the user to set the length of the generated passwords and returns the resulting value. 
    The returned value can be used as an input parameter for a
    dictionary containing settings for generated passwords.

    Parameters:
        question (str): The question to be presented to the user.
    
    Returns:
        password_length (str): The user-defined length for generated passwords.
    
    '''
    input_coorect_flag = False

    while input_coorect_flag == False:
        print(question)

        password_length = get_correct_user_input()
        input_coorect_flag = check_len_of_password(password_length)
            
    return int(password_length)


def print_yes_or_no():
    print("\n if yes enter 'y'")
    print(" if no enter 'n': \n")


def get_yes_or_no(question):
    """
    Presents the user with a question and expects a YES or NO answer.
    
    Parameters:
        question (str): The question to be presented to the user.
        
    Returns:
        bool:   True if the user answers YES, 
                False if the user answers NO.
    """
    user_answer = ' '
    
    while user_answer != "Y" or user_answer != "N":
        print(question)
        print_yes_or_no()

        user_answer = get_correct_user_input()
        user_answer = user_answer.upper()

        if user_answer == 'N':
            return False
        

        elif user_answer == 'Y':
            return True
                
        else:
            input_err()

        clear_screen(2)    


def get_answers_for_questions():
    """
    Creates a dictionary with password generation settings obtained from a user survey.
    
    Returns:
    - password_settings_dict (dict): A dictionary containing user-defined password generation settings.
    """
    dict_keys_names = ['number',
                       'length',
                       'digits',
                       'capitals',
                       'lowercase',
                       'punctuation',
                       'ambigious_chars']

    questions = ["\n How many passwords do you want to generate",
                 "\n What should be the length of the password?\n Minimum is 4, Maximum is 20",
                 "\n Should the password include digits?\n Example: 123",
                 "\n Should the password include capital letters?\n Example: XYZ",
                 "\n Should the password include lowercase letters?\n Example: abc",
                 "\n Should the password include special letter characters?\n Example: !#$%&*+-=?@^_",
                 "\n Should the password exclude ambiguous characters?\n Example: il1Lo0O"]
    
    password_settings_dict = {}

    for i in range(len(questions)):
        if i == 0:
            number_of_passwords = get_number_of_passwords(questions[i])
            password_settings_dict[dict_keys_names[i]] = number_of_passwords
        
        elif i == 1:
            password_length = get_len_of_password(questions[i])
            password_settings_dict[dict_keys_names[i]] = password_length

        else:
            other_answers = get_yes_or_no(questions[i])
            password_settings_dict[dict_keys_names[i]] = other_answers
    
    return password_settings_dict


def get_dict_of_settings():
    answers = get_answers_for_questions()

    condition1 = (answers['digits'] == True)
    condition2 = (answers['capitals'] == True)
    condition3 = (answers['lowercase'] == True)
    condition4 = (answers['punctuation'] == True)

    all_settings = condition1 or condition2 or condition3 or condition4
    
    while all_settings == False:
        print('It is impossible to create a password without symbols, please enter the settings again.')
        
        answers.clear()

        clear_screen(2)

        answers = get_answers_for_questions()

    return answers
        

def get_allowed_chars(dict_of_settings):
    chars = ''

    if dict_of_settings['digits']:
        chars += DIGITS

    if dict_of_settings['capitals']:
        chars += UPPERCASE_LETTERS

    if dict_of_settings['lowercase']:
        chars += LOWERCASE_LETTERS

    if dict_of_settings['punctuation']:
        chars += PUNCTUATION

    return chars


def get_any_char_from_allowed_chars(chars):
    number_allowed_chars = len(chars)
    char = chars[randint(0, number_allowed_chars - 1)]
    return char


def if_ambigious_char_take_another(dict_of_settings, char, chars):
    if dict_of_settings['ambigious_chars']:
                while char in "il1Lo0O":
                    char = get_any_char_from_allowed_chars(chars)

    return char                


def generate_passwords(dict_of_settings):
    '''
    Generates passwords based on user settings.

    Args:
        user_settings (dict): A dictionary containing user settings.

    Returns:
        list: A list of generated passwords based on the user's specifications.
    '''

    passwords = []

    chars = get_allowed_chars(dict_of_settings)
    

    for i in range(dict_of_settings['number']):
        current_password = ''
        
        for j in range(dict_of_settings['length']):
            rand_char = get_any_char_from_allowed_chars(chars)
            rand_char = if_ambigious_char_take_another(dict_of_settings, rand_char, chars)
            
            current_password += rand_char

        passwords.append(current_password)

    return passwords        

            
def password_generator():
    intro()
    name = get_correct_user_input()
    hello_user(name)
    post_intro()

    dict_of_settings = get_dict_of_settings()
    #print(dict_of_settings)

    generated_passwords = generate_passwords(dict_of_settings)
    print(*generated_passwords)

    clear_screen(10)

    outro(name)


password_generator()