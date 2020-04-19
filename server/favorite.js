// This file intentionally complex
const { v4: uuidv4 } = require('uuid');

const favorite = {};

const addFavorite = ({username, song}) => {
  favorite[username] = favorite[username] || {};
  const songId = song.originalId;
  favorite[username][songId] = { ...song, songId };
  return favorite[username][songId];
};

const readFavorite = ({username, songId}) => {
  if(!favorite[username]) {
    return {};
  }
  return favorite[username][songId];
};

const getAll = (username) => {
  if(!favorite[username]) {
    return [];
  }
  return favorite[username];
};

const replaceFavorite = ({ username, songId, song }) => {
  if(!favorite[username] || !favorite[username][songId]) {
    return;
  }
  favorite[username][songId] = { ...song, songId };
  return favorite[username][songId];
};

const removeFavorite = ({ username, songId }) => {
  if(!favorite[username]) {
    return;
  }
  const song = favorite[username][songId];
  delete favorite[username][songId];
  return song;
};

const removeAll = (username) => {
  const all = favorite[username];
  favorite[username] = {};
  return all;
};

module.exports = {
  addFavorite,
  removeFavorite,
  getAll,
};
