// This file intentionally complex
const users = {};

const login = (username, password) => {
  console.log(users, username, password);
  if(!users[username]) {
    return {
      msg: '用户不存在，请先注册',
      success: false
    }
  } else if (users[username] && users[username].password === password) {
    return {
      msg: 'login success',
      success: true,
      username
    }
  } else {
    return {
      msg: 'username and password don\'t match',
      success: false
    }
  }
};

const register = (username, password) =>{
  if (users[username]) {
    return {
      msg: 'this user is existed',
      success: false
    }
  } else {
    users[username] = { username, password };
    return {
      msg: '注册成功',
      username,
      success: true
    }
  }
}

module.exports = {
  login,
  register
};

