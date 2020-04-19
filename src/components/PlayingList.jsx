import React, { useContext} from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import Button from "./Button";

import ItemInPlaylist from './SongItem/in_playing_list';
import {StoreContext} from "../lib/store";

const styles = {
  wrapper: {
    position: 'absolute',
    bottom: 64,
    color: 'white',
    right: (document.body.clientWidth - 1000) / 2,
    width: 600,
    height: 320,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    background: 'rgb(70,70,70)',
  },
  header: {
    padding: 10,
    background: '#222',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  list: {
    color: 'white',
    overflow: 'auto',
    height: 268,
    background: 'rgb(70,70,70)',
  },
};

const PlayingList = (props) =>{
  const [store, dispatch] = useContext(StoreContext)
  const clearPlaylist = () => {
    dispatch({ type: 'CLEAR_PLAYING_LIST' });
  }
  
  return (
    <div style={styles.wrapper}>
      <div className="flex-between-center" style={styles.header}>
        <div className="col col-20">
          播放列表
        </div>
        <div className="col col-4" style={{ textAlign: 'right' }}>
          <Button icon={<DeleteOutlined />} ghost
                  onClick={clearPlaylist}
          >
            清空
          </Button>
        </div>
      </div>
      <div className="ui-table" id="playingList" style={styles.list}>
        <div className="ui-table-body">
          <div className="table-body">
            {store.playingList.map(song=>(<ItemInPlaylist key={song.link} song={song}/>))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayingList;
