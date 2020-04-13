// This file intentionally complex

const session = require('../session');
const theme = require('../theme');
const tasks = require('../tasks');

const web = (res) => {
  return ({ message, status, data }={}) => {
    if(!message && !data) {
      data = 'OK';
    }
    res.status(status || 200).json({ message, data });
  };
};

const routes = {
  session: { },
  theme: { },
  tasks: {
    one: {},
    all: {},
  },
};

// Session
routes.session.status = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }
  web(res)({ data: session.getSession(sid) } );
};

routes.session.create = ( req, res ) => {
  const username = req.body.username;
  const sessionInfo = session.attemptCreate(username);
  if(!sessionInfo) {
    web(res)({ status: 403, message: 'login denied' });
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
