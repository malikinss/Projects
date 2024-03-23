from random import randint
import os
import time

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
    print("\n Hello my name is Caesar and I will help you encrypt or decrypt a message using my cipher.")
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

def print_main_menu():
    clear_screen(0.5)
    print("\n What do you want to do? \n Enter the number of one of the options below.")
    print(" 1. I want to encrypt a message")
    print(" 2. I want to decrypt the message")

def get_new_ascii_position(letter, shift, mode):
    """
    Calculates the new ASCII position of a letter after applying a Caesar cipher shift operation, either for encryption
    or decryption.

    Parameters:
        letter (str): The input letter to be shifted.
        shift (int): The number of positions to shift the letter in the Caesar cipher.
        mode (str): The mode indicating whether to 'encrypt' or 'decrypt' the letter.

    Returns:
        new_ascii_position (int): The new ASCII position of the letter after the shift operation.
    """

    if mode == 'encrypt':
        # Calculate the new ASCII position for encryption.
        new_ascii_position = ord(letter) + shift
        
        # Handle wraparound for uppercase letters.
        if new_ascii_position > 90 and new_ascii_position < 97:
            new_ascii_position = (new_ascii_position - 90) + 64
        
        # Handle wraparound for lowercase letters.
        elif new_ascii_position > 122:
            new_ascii_position = (new_ascii_position - 122) + 96

    elif mode == 'decrypt':
        # Calculate the new ASCII position for decryption.
        new_ascii_position = ord(letter) - shift

        # Handle wraparound for uppercase letters.            
        if new_ascii_position > 90 and new_ascii_position < 97:
            new_ascii_position = new_ascii_position + 26
        
        # Handle wraparound for lowercase letters.
        elif new_ascii_position < 65:
            new_ascii_position = new_ascii_position + 26

    return new_ascii_position    

def get_encrypted_or_decrypted_str(what_to_do, words):
    """
    Encrypts or decrypts a given list of words using a Caesar cipher with variable shift lengths determined by word length.
    
    Parameters:
        what_to_do (str): Specifies whether to 'encrypt' or 'decrypt' the words.
        words (list): A list of words to be processed.

    Returns:
        new_string (str): A string containing the words after applying the specified encryption or decryption.
    """

    new_string = ''

    # Iterate through each word in the list
    for word in words:
        len_of_word = len(word)
        new_word = ''

        # Check if the word consists of alphabetic characters
        if word.isalpha():
            # Iterate through each letter in the word
            for letter in word:
                # Calculate the new ASCII position of the letter based on word length and operation
                new_ascii_position = get_new_ascii_position(letter, len_of_word, what_to_do)

                # Convert the new ASCII position back to a character
                new_letter = chr(new_ascii_position)

                # Append the new letter to the new word
                new_word += new_letter
        else:
            # If the word contains non-alphabetic characters, leave it unchanged
            new_word = word

        # Append the new word to the result string, followed by a space
        new_string += new_word
        new_string += ' '
    
    # Remove the trailing space and return the resulting string
    return new_string.rstrip()

def get_words_list_from_user_input():
    string_from_user = get_correct_user_input()
    list_of_words_from_string = string_from_user.split()
    
    return list_of_words_from_string

def encrypt_caesar_cipher():
    """
    Encrypts a given input text using the Caesar cipher with word-length-based shifts.
    The function prompts the user to enter the text they want to encrypt, assuming that words are separated by a single space.
    It then processes the input text, encrypts each word using a Caesar cipher where the shift is based on the word length,
    and returns the encrypted text.

    Returns:
        new_string (str): The encrypted string.
    """

    # Prompt the user to enter the text they want to encrypt.
    print("\n Please enter the text you want to encrypt. \n Words in a line must be separated by one space!")
    
    # Get a list of words from the user input.
    words_to_encrypt = get_words_list_from_user_input()

    # Encrypt the input words using a Caesar cipher with word-length-based shifts.
    new_string = get_encrypted_or_decrypted_str('encrypt', words_to_encrypt)

    return new_string

def decrypt_caesar_cipher():
    """
    Decrypts a Caesar cipher encrypted text provided by the user.
    This function prompts the user to enter the text they want to decrypt. The text should consist of words separated
    by a single space. It then decrypts each word in the input text using a Caesar cipher decryption method, where
    the shift is determined by the length of each word. The decrypted words are then reassembled into a single string
    with spaces, and the decrypted text is returned.

    Returns:
        new_strng (str): The decrypted text.
    """

    # Prompt the user to enter the text to decrypt
    print("\n Please enter the text you want to decrypt. \n Words in a line must be separated by one space!")
    
    # Get a list of words from user input
    words_to_decrypt = get_words_list_from_user_input()

    # Decrypt the input words using a Caesar cipher with word-length-based shifts.
    new_string = get_encrypted_or_decrypted_str('decrypt', words_to_decrypt)

    return new_string

def save_to_the_result_file(string_to_save):
    """
    Saves the given string to a file named 'result.txt' in the current working directory.

    Parameters:
        string_to_save (str): The string to be saved to the file.

    Returns:
        None
    """

    # Get the current working directory
    current_directory = os.getcwd()

    # Define the name of the file to be created or overwritten
    file_name = "result.txt"

    # Create the full file path by joining the current directory and the file name
    file_path = os.path.join(current_directory, file_name)

    # Open the file for writing ('w' mode)
    with open(file_path, 'w') as result_file:
        # Write the provided string to the file, followed by a newline character
        result_file.write(string_to_save + '\n')
        
        #result_file.close()
        # Close the file (closing is automatically handled by 'with' statement)

    print('\nThe result is written to the file result.txt')

def select_and_execute_operating_mode():
    """
    This function allows the user to select an operating mode (encryption or decryption) for a Caesar cipher.
    It repeatedly prompts the user for input until a valid choice is made. Once a valid choice is made, it
    performs the selected operation and saves the result to a file.
    """
     
    flag = False

    # Start a loop until a valid choice is made
    while flag == False:
        # Prompt the user to select an operating mode and store the choice in selected_operating_mode
        selected_operating_mode = get_correct_user_input()

        # Check if the user selected encryption (Option 1)
        if selected_operating_mode == '1':
            # Perform encryption using Caesar cipher
            result_string = encrypt_caesar_cipher()
            # Set flag to True to exit the loop
            flag = True
        
        # Check if the user selected decryption (Option 2)
        elif selected_operating_mode == '2':
            # Perform decryption using Caesar cipher
            result_string = decrypt_caesar_cipher()
            # Set flag to True to exit the loop
            flag = True
        
        # Handle invalid input
        else:
            # Display an error message and continue the loop
            input_err()
            # Set flag to False to keep looping

    save_to_the_result_file(result_string)

def caesar_cipher():
    intro()

    username = get_correct_user_input()

    print_main_menu()
    select_and_execute_operating_mode()

    outro(username)

caesar_cipher()