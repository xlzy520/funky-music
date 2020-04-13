// This file intentionally complex
const users = require('./users');

const getTheme = (username) => {
  return users.getInfo(username).theme;
};

const setTheme = ({ username, theme }) => {
  users.getInfo(username).theme = theme;
};


module.exports = {
  getTheme,
  setTheme,
};

