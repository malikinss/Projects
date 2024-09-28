class TextFormatter {
  constructor() {
    this.colors = {
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      red: "\x1b[31m",
      reset: "\x1b[0m",
    };
  }

  formatTextWithColor(text, color) {
    const colorCode = this.colors[color] || this.colors.reset;
    return `${colorCode}${text}${this.colors.reset}`;
  }
}

module.exports = TextFormatter;
