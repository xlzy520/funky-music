import React, { createContext, useReducer } from "react";

export const StoreContext = createContext({});

let playingList = localStorage.getItem('playingList');
const initialList = (playingList && JSON.parse(playingList)) || [];


let playIndex = localStorage.getItem('playIndex') || 0;
let history = localStorage.getItem('searchHistory');
if (history && !history.includes('[') && !history.includes(']')) {
  history = false; // 清理旧格式的 searchHistory
}
const initialHistory= (history && JSON.parse(history)) || [];
const limit = 6;

const reducer = (state, action) => {
  console.log(state, action);
  switch(action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        username: action.data
      };
    case 'UPDATE_FAVORITE':
      return {
        ...state,
        favorite: action.data
      }
    case 'UPDATE_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          [action.provider]: action.data
        }
      }
    case 'UPDATE_SEARCH_STATUS':
      return {
        ...state,
        searchStatus: action.data
      };
    case 'ADD_TO_PLAYING_LIST':
      let { data } = action;
      const links = state.playingList.map(song => song.link);
      if (Array.isArray(data)) {
        data = data.filter((song) => {
          return !links.includes(song.link);
        });
        playingList = state.concat(data);
      } else if (typeof data === 'object') {
        if (links.includes(data.link)) {
          playingList = state.playingList;
        } else {
          playingList = [...state.playingList, data];
        }
      }
      localStorage.setItem('playingList', JSON.stringify(playingList));
      return {
        ...state,
        playingList
      };
    case 'NEW_PLAYING_LIST': // There's NEW_PLAYLIST (新建歌单)
      playingList = action.data;
      localStorage.setItem('playingList', JSON.stringify(playingList));
      return {
        ...state,
        playingList
      };
    case 'DELETE_SONG_IN_PLAYING_LIST':
      playingList = Array.from(state);
      playingList.splice(action.data, 1);
      localStorage.setItem('playingList', JSON.stringify(playingList));
      return {
        ...state,
        playingList
      };
    case 'CLEAR_PLAYING_LIST':
      localStorage.setItem('playingList', '');
      return {
        ...state,
        playingList: []
      };
    case 'UPDATE_PLAY_INDEX':
      playIndex = action.data;
      localStorage.setItem('playIndex', playIndex);
      return {
        ...state,
        playIndex
      };
    case 'CLEAR_PLAY_INDEX':
      localStorage.setItem('playIndex', '');
      return {
        ...state,
        playIndex: 0
      };
    case 'UPDATE_SEARCH_HISTORY':
      const keyword = action.data;
      history = [...state.history];
      if (history.includes(keyword)) {
        history.splice(history.indexOf(keyword), 1);
      }
      history = [keyword, ...history];
      if (history.length > limit) {
        history = history.splice(0, limit);
      }
      localStorage.setItem('searchHistory', JSON.stringify(history));
      return {
        ...state,
        history
      };
    case 'CLEAR_SEARCH_HISTORY':
      localStorage.setItem('searchHistory', '');
      return {
        ...state,
        history: []
      };
    default:
      return state
  }
}

export const Providers = props => {
  const [store, dispatch] = useReducer(reducer, {
    playingList: initialList, playIndex, history: initialHistory, searchStatus: '', searchResults: {},
    username: '', favorite: []
  })
  return (
    <StoreContext.Provider value={[store, dispatch]}>
      {props.children}
    </StoreContext.Provider>
  );
};
