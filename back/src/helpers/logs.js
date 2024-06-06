const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  orange: "\x1b[33m",
};

const logInColor = (message, colorCode = "green") => {
  console.log(colors[colorCode], message, "\x1b[0m");
};

module.exports = {
  logInColor,
};
