const colors = {
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m',

    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    white: '\x1b[37m',
    black: '\x1b[30m',
    gray: '\x1b[90m',
    brightRed: '\x1b[91m',
    brightGreen: '\x1b[92m',
    brightYellow: '\x1b[93m',
    brightBlue: '\x1b[94m',
    brightMagenta: '\x1b[95m',
    brightCyan: '\x1b[96m',
    brightWhite: '\x1b[97m',

    reset: '\x1b[0m'
};


function coloredString(text, color) {
    // Get the color code from the colors object
    const colorCode = colors[color] || colors.reset;
    // Print the text with the specified color
    return (`${colorCode}${text}${colors.reset}`);
}

module.exports = coloredString;