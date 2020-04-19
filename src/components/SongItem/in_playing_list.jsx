import React, { useContext} from 'react';
import classNames from "../../lib/classnames";
import { DeleteOutlined } from '@ant-design/icons';

import neteaseMusicLogo from './images/netease_16.ico';
import qqMusicLogo from './images/qq_16.ico';
import xiamiMusicLogo from './images/xiami_16.ico';
import './in_playing_list.css';
import Artists from '../Artists';
import {StoreContext} from "../../lib/store";

const logos = {
  qq: qqMusicLogo,
  netease: neteaseMusicLogo,
  xiami: xiamiMusicLogo
};

const SongItem = (props) => {
  const [store, dispatch] = useContext(StoreContext)
  const currentSong = store.playingList[store.playIndex]
  const playingList = store.playingList
  const playIndex = store.playIndex
  
  let { song } = props;
  
  const addToPlaylist = (song) => {
    dispatch({ type: 'ADD_TO_PLAYING_LIST', data: song });
  }
  const updatePlayIndex=  (index) => {
    dispatch({ type: 'UPDATE_PLAY_INDEX', data: index });
  }
  const deleteSongInPlayingList=(indexToDelete, playIndex) => {
    dispatch({ type: 'DELETE_SONG_IN_PLAYING_LIST', data: indexToDelete });
    if (indexToDelete < playIndex) {
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: playIndex - 1 });
    }
  }
  
  const changeCurrentSong = () => {
    const index = playingList.findIndex(song =>
      song.link === props.song.link);
    if (index === -1) {
      addToPlaylist(props.song);
      updatePlayIndex(playingList.length);
    } else {
      updatePlayIndex(index);
    }
  }
  
  const deleteFromPlaylist = (e) => {
    e.stopPropagation();
    const index = playingList.findIndex(song =>
      song.link === props.song.link);
    if (index + 1 === playingList.length) {
      updatePlayIndex(0);
    }
    deleteSongInPlayingList(index, playIndex);
  }
  
  return (
    <div className={classNames('table-row', {
      'playing' : currentSong && currentSong.link === song.link
    })}
         onClick={changeCurrentSong}
         style={{ border: 'none', padding: '6px 10px' }}
         extra={
           <a onClick={deleteFromPlaylist} className="delete-btn">
             <DeleteOutlined
               style={{
                 fontSize: 18,
                 verticalAlign: 'middle'
               }}
             />
           </a>
         }>
      
      <div className="flex-between-center"  style={{ width: '100%', color: 'white', }}>
        <div className="col col-12 nowrap">{song.name}</div>
        <div className="col col-10 nowrap"> <Artists artists={song.artists} /></div>
        <div className="col col-2 nowrap">
          <img src={logos[song.platform]} alt={song.platform} />
        </div>
      </div>
    </div>
  );
}



function mapStateToProps(state) {
  return {
    currentSong: state.playingList[state.playIndex],
    playingList: state.playingList,
    playIndex: state.playIndex,
  };
}
function mapDispatchToProps(dispatch) {
  return {
  
  };
}

export default SongItem;
