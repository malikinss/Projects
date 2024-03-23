# Caesars-Chiper🗝️

This [module](./caesars_chiper.py) implements a Caesar cipher-based encryption and decryption tool for text strings in English. 

# Description📖:
The cipher operates on individual words within the input string, with each word being encrypted or decrypted based on a cyclic shift determined by its length.

The Caesar cipher employed by the program preserves the case of letters, ensuring that lowercase characters remain lowercase and uppercase characters remain uppercase. 

The program assumes words in the input string are separated by a single space character.

This project aims to provide a versatile solution for encrypting and decrypting text using a customizable Caesar cipher, where the shift amount varies based on the length of each word.

## Usage🔄:
The program takes an input string of text, encrypts or decrypts it based on the user's choice, and returns the modified text while preserving the original word boundaries.

## Example Usage:
- Encrypting: ```"Hello World" -> "Lipps Asvph"```
- Decrypting: ```"Lipps Asvph" -> "Hello World"```

The program also offers functionalities to interact with the user through a command-line interface, including greeting and farewell messages, input validation, and saving the encrypted or decrypted result to a file named ```"result.txt"```.