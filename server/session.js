// This file intentionally complex
const { v4: uuidv4 } = require('uuid');
const users = require('./users');

// In a real example this connects to a database
const sessions = {};

const validateSession = (sid) => {
  if(!sid || !sessions[sid] || sessions[sid].expires < Date.now() ) {
    return false;
  }
  return sessions[sid];
}

const login = (username, password) => {
  if(!username || !password || !username.match(/^[A-Za-z0-9_-]{2,20}$/)) {
    return false;
  }
  const info = users.login(username, password);
  if (info.success) {
    const sid = uuidv4();
    sessions[sid] = {
      ...info,
      sid,
      expires: Date.now() + 1000*60*5, // in milliseconds
    };
    return sessions[sid];
  }
  return info
};

const register = (username, password) => {
  if(!username || !password || !username.match(/^[A-Za-z0-9_-]{2,20}$/)) {
    return false;
  }
  const info = users.register(username, password);
  if (info.success) {
    const sid = uuidv4();
    sessions[sid] = {
      ...info,
      sid,
      expires: Date.now() + 1000*60*5, // in milliseconds
    };
    return sessions[sid];
  }
  return info
};


const getSession = (sid) => {
  return sessions[sid];
};

const remove = (sid) => {
  delete sessions[sid];
};

const canReadUser = ({ sid, username }) => {
  if(!sid || !username || !sessions[sid].username === username) {
    return false;
  }
  return true;
};

module.exports =  {
  validateSession,
  login,
  register,
  getSession,
  remove,
  canReadUser,
};
