// This file intentionally complex

const session = require('../session');
const theme = require('../theme');
const tasks = require('../tasks');
const favorite = require('../favorite');

const web = (res) => {
  return ({ msg, status, data, success = true }={}) => {
    res.status(status || 200).json({ msg, data, success });
  };
};

const routes = {
  session: { },
  theme: { },
  tasks: {
    one: {},
    all: {},
  },
  favorite: {
  
  }
};

// Session
// routes.session.login1 = ( req, res ) => {
//   const sid = req.cookies.sid;
//   const validSession = session.validateSession(sid);
//   if(!validSession) {
//     res.clearCookie('sid');
//     web(res)({status: 401, message: 'no valid session' });
//     return;
//   }
//   web(res)({ data: session.getSession(sid) } );
// };

routes.session.login = ( req, res ) => {
  const username = req.body.username;
  const password = req.body.password;
  const sessionInfo = session.login(username, password);
  console.log(sessionInfo);
  if(!sessionInfo || !sessionInfo.success) {
    web(res)({data: sessionInfo});
    return;
  }
  res.cookie('sid', sessionInfo.sid, { MaxAge: 1000*60 } );
  web(res)({data: sessionInfo});
};

routes.session.register = ( req, res ) => {
  const username = req.body.username;
  const password = req.body.password;
  const sessionInfo = session.register(username, password);
  console.log(sessionInfo);
  if(!sessionInfo|| !sessionInfo.success) {
    web(res)({data: sessionInfo});
    return;
  }
  res.cookie('sid', sessionInfo.sid, { MaxAge: 1000*60 } );
  web(res)({data: sessionInfo});
};

routes.session.remove = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }
  res.clearCookie('sid');
  session.remove(sid);
  web(res)();
};

routes.favorite.getAll = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({success: false, msg: 'no valid session' });
    return;
  }
  
  // const username = req.params.username;
  // const isAllowed = session.canReadUser({ sid, username });
  // if(!isAllowed) {
  //   web(res)({status: 403, message: 'action not permitted' });
  //   return;
  // }
  const songs = favorite.getAll(validSession);
  web(res)({ data: {songs} });
};

routes.favorite.add = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({success: false, msg: 'no valid session' });
    return;
  }
  
  // const username = req.params.username;
  // const isAllowed = session.canReadUser({ sid, username });
  // if(!isAllowed) {
  //   web(res)({status: 403, message: 'action not permitted' });
  //   return;
  // }
  //
  const song = req.body.song;
  console.log(song);
  
  web(res)({ data: favorite.addFavorite({ username: validSession, song })});
};

routes.favorite.remove = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({success: false, msg: 'no valid session' });
    return;
  }
  
  // const username = req.params.username;
  // const isAllowed = session.canReadUser({ sid, username });
  // if(!isAllowed) {
  //   web(res)({status: 403, message: 'action not permitted' });
  //   return;
  // }
  
  const songId = req.params.songId;
  const song = favorite.removeFavorite({ username: validSession, songId });
  if(!song) {
    web(res)({ success: false, msg: 'no such songId' });
    return;
  }
  web(res)({ data: song } );
};


// Theme
routes.theme.read = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }
  const foundTheme = theme.getTheme(username);
  web(res)({ data: foundTheme });
};

routes.theme.update = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const themeValue = req.body.theme;
  theme.setTheme({ username, theme: themeValue});
  web(res)();
};

// Tasks
routes.tasks.all.read = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  web(res)({ data: tasks.readAll(username) } );
};

routes.tasks.all.remove = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const all = tasks.removeAll(username);
  if(!all) {
    web(res)({ status: 404, message: 'no tasks for user' });
    return;
  }

  web(res)({ data: all } );
};

routes.tasks.one.add = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const task = req.body.task;

  web(res)({ data: tasks.addTask({ username, task })});
};

routes.tasks.one.read = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const taskId = req.params.taskId;
  const task = tasks.readTask({ username, taskId });
  if(!task) {
    web(res)({ status: 404, message: 'no such taskId' });
    return;
  }
  web(res)({ data: task } );
};

routes.tasks.one.update = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const taskId = req.params.taskId;
  const task = req.body.task;

  const newTask = tasks.replaceTask({ username, taskId, task });
  if(!newTask) {
    web(res)({ status: 400, message: 'failed to update' });
    return;
  }
  web(res)({ data: newTask } );
};

routes.tasks.one.remove = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const taskId = req.params.taskId;
  const task = tasks.removeTask({ username, taskId });
  if(!task) {
    web(res)({ status: 404, message: 'no such taskId' });
    return;
  }
  web(res)({ data: task } );
};

module.exports = routes;
