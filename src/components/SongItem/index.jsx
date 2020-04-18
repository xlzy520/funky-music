import React, { useContext} from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import neteaseMusicLogo from './images/netease_16.ico';
import qqMusicLogo from './images/qq_16.ico';
import xiamiMusicLogo from './images/xiami_16.ico';
import ArtistLinks from '../ArtistLinks';
import MVIcon from '../MVIcon';
import AddTo from '../AddTo';
import './index.css';
import {StoreContext} from "../../lib/store";

const SongItem = (props) => {
  
  const [store, dispatch] = useContext(StoreContext)
  const currentSong = store.playingList[store.playIndex]
  const playingList = store.playingList
  const logos = {
    qq: qqMusicLogo,
    netease: neteaseMusicLogo,
    xiami: xiamiMusicLogo
  };
  
  const addToPlayingList = (song) => {
      dispatch({ type: 'ADD_TO_PLAYING_LIST', data: song });
    }
  const updatePlayIndex = (index) => {
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: index });
    }
    
  let { song } = props;
  let anchorClass = song.hasCopyright ? '' : 'no-copyright';
  const changeCurrentSong = () => {
    const index = playingList.findIndex(song =>
      song.link === props.song.link);
    if (index === -1) {
      addToPlayingList(props.song);
      updatePlayIndex(store.playingList.length);
    } else {
      updatePlayIndex(index);
    }
  }
  
  return (
    <div className="table-row template-field-5-cols">
      <div className="nowrap">
        <a href={song.link}
           title={`${song.name}${song.alias ? ` - ${song.alias}` : ''}\n` +
           `${song.hasCopyright ? '' : '（此歌曲在该平台可能存在版权问题。）'}`}
           target="_blank"
           className={anchorClass}
        >
          <span>{song.name}</span>
          <span className="song-alias">
                {song.alias && ` - ${song.alias}`}
              </span>
        </a>
      </div>
      <div>
        {song.mvLink && <MVIcon link={song.mvLink} />}
      </div>
      <div className="nowrap">
        <ArtistLinks artists={song.artists} />
      </div>
      <div className="nowrap">
        <a href={song.album.link} target="_blank" title={song.album.name}>
          {song.album.name}
        </a>
      </div>
      <div>
        {
          props.showPlatform &&
          <img
            src={logos[song.platform]}
            alt={song.platform}
            style={{ display: 'block' }}
          />
        }
      </div>
      <div>
        <a onClick={changeCurrentSong}
           className={
             currentSong && currentSong.link === song.link ?
               'play-btn playing' : 'play-btn'
           }
        >
          <PlayCircleOutlined
            style={{
              fontSize: 20,
              display: 'block',
            }}
          />
        </a>
      </div>
      <div>
        <AddTo data={song} />
      </div>
    </div>
  )
  
}

export default SongItem;
