// This file intentionally complex
const users = {};

const DEFAULT_PROFILE = {
  theme: 'funky',
};

const getInfo = (username) => {
  if(!users[username]) {
    users[username] = { ...DEFAULT_PROFILE, username };
  }
  return users[username];
};

module.exports = {
  getInfo,
};

