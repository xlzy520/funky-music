// This file intentionally complex
const { v4: uuidv4 } = require('uuid');

const tasks = {};

const addTask = ({username, task}) => {
  tasks[username] = tasks[username] || {};
  const taskId = uuidv4();
  tasks[username][taskId] = { ...task, taskId };
  return tasks[username][taskId];
};

const readTask = ({username, taskId}) => {
  if(!tasks[username]) {
    return {};
  }
  return tasks[username][taskId];
};

const readAll = (username) => {
  if(!tasks[username]) {
    return {};
  }
  return tasks[username];
};

const replaceTask = ({ username, taskId, task }) => {
  if(!tasks[username] || !tasks[username][taskId]) {
    return;
  }
  tasks[username][taskId] = { ...task, taskId };
  return tasks[username][taskId];
};

const removeTask = ({ username, taskId }) => {
  if(!tasks[username]) {
    return;
  }
  const task = tasks[username][taskId];
  delete tasks[username][taskId];
  return task;
};

const removeAll = (username) => {
  const all = tasks[username];
  tasks[username] = {};
  return all;
};

module.exports = {
  addTask,
  readTask,
  replaceTask,
  removeTask,
  readAll,
  removeAll,
};
