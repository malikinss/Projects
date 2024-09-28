empty_cell = ' '
x_cell = 'X'
o_cell = 'O'

game_rules = {
    1: 'Select Game Mode:'
}


def create_empty_board():
    board = []

    position = 0

    for i in range(3):
        row = []
        for j in range(3):
            row.append(position)
            position += 1

        board.append(row)

    return board

'''
def create_empty_board():
    board = []

    for i in range(3):
        row = []
        for j in range(3):
            row.append(empty_cell)

        board.append(row)

    return board
'''


def display_board(board):
    def display_line():
        print('-' * 11)

    print()

    for i in range(len(board)):
        row = board[i]
        print(f' {row[0]} | {row[1]} | {row[2]} ')

        if i < 2:
            display_line()


def invalid_input():
    print('Invalid input, please try again!')


def get_user_choice(prompt):
    flag = True
    
    while flag:
        data = input(f"Please insert your choise {prompt} and press 'Enter'...")

        if data:
            flag = False
        else:
            invalid_input()
    
    return data


def hello():
    print('Welcome To TicTacToe!')


def choose_game_mode():
    correct = True

    while (correct):
        print('Select Game Mode:\n1. Multiplayer\n2. Singleplayer')

        user_choice = get_user_choice('[1 / 2]', )

        if user_choice.isdigit():
            correct = False
        else:
            invalid_input()

    return int(user_choice)


def singleplayer_mode():
    print('Welcome to singleplayer game mode!')



def multiplayer_mode():
    print('Welcome to multiplayer game mode!')
    print("Let's get to know each other a little!")




def is_winner(board):
    
    horizontals = [board[0][0] == board[0][1] == board[0][2],
                   board[1][0] == board[1][1] == board[1][2],
                   board[2][0] == board[2][1] == board[2][2]]

    verticals = [board[0][0] == board[1][0] == board[2][0],
                 board[0][1] == board[1][1] == board[2][1],
                 board[0][2] == board[1][2] == board[2][2]]

    diagonals = [
        board[0][0] == board[1][1] == board[2][2],
        board[0][2] == board[1][1] == board[2][0]
    ]

    combinations = [horizontals, verticals, diagonals]

    for combination in combinations:
        if any(combination):
            return True

    return False


def game():
    def is_draw():
        pass
    
    def is_winner():
        horizontals = [board[0][0] == board[0][1] == board[0][2],
                    board[1][0] == board[1][1] == board[1][2],
                    board[2][0] == board[2][1] == board[2][2]]

        verticals = [board[0][0] == board[1][0] == board[2][0],
                    board[0][1] == board[1][1] == board[2][1],
                    board[0][2] == board[1][2] == board[2][2]]

        diagonals = [
            board[0][0] == board[1][1] == board[2][2],
            board[0][2] == board[1][1] == board[2][0]
        ]

        combinations = [horizontals, verticals, diagonals]

        for combination in combinations:
            if any(combination):
                return True

        return False

    hello()

    game_modes = {1: multiplayer_mode, 2: singleplayer_mode}
    game_modes[choose_game_mode()]()

    board = create_empty_board()
    display_board(board)
    is_winner()



    

game()